import * as ads from 'twincat-ads';
import { Server } from '../server';

export class Plc {
    public client: any;
    public symbols: Symbol[];
    public isConnected: boolean = false;

    constructor(settings: ConnectionSettings) {
        this.connect(settings);

        this.client.on('notification', (data) => {
            //console.log(data);

            if (Server.io) {
                Server.io.emit('Symbol', data);
            }
        });

        process.on('exit', () => {
            console.log('exit');
        });

        process.on('SIGINT', () => {
            console.log('SIGINT');

            this.client.end(() => {
                process.exit();
            });
        });

        this.client.on('error', (error) => {
            console.log('TwinCAT-ADS Error: ', error);

            if (error) {
                setTimeout(() => {
                    console.log('reconnecting...');

                    try {
                        this.disconnect();
                    } catch (error) {
                        console.log('disconnecting error:', error);
                    }

                    try {
                        this.connect(settings);
                    } catch (error) {
                        console.log('reconnecting error:', error);
                    }
                }, 5000);
            }
        });

        if (Server.module.hot) {
            Server.module.hot.dispose(() => {
                console.log('Disposing entry module...');

                //this.disconnect();
            });
        }
    }

    private connect(settings: ConnectionSettings): void {
        console.log('connecting...');

        try {
            this.client = ads.connect(settings, (client) => {
                this.connected(client);
            });
        } catch (error) {
            console.log('conneciton error', error);
        }
    }

    private connected(client: any): void {
        console.log('connected!');

        this.client.readState(function (error, result) {
            if (error) {
                console.log(error);
            } else {
                switch (result.adsState) {
                    case ads.ADSSTATE.RUN:
                        console.log('The PLC is working well! :)');
                        break;
                    case ads.ADSSTATE.STOP:
                        console.log('The PLC is stopped, please run your application to make it work.');
                        break;
                    default:
                        console.log('The current state is ' + ads.ADSSTATE.fromId(result.adsState));
                }
            }
        });

        const connection = this.client.getSymbols((error, symbols) => {
            if (error) {
                console.error('getSymbols Error', error);
            }

            this.symbols = symbols;

            //console.log(this.symbols);

            console.log(this.symbols.filter((symbol) => {
                return symbol.indexGroup !== 16448 && symbol.indexGroup !== 16416;
            }));
            /*
                        this.setValue('MAIN.LAMPE', false);
            
                        const brightness = 0;
                        let _value = (32767 - ((100 - brightness) / 100 * 32767));
                        this.setValue('.DIMMER', _value);
            */

            //this.setValue('.PT_Temp_Sensor', 0);
            //this.setValue('.AI_Licht_Sensor', 0);

            //connection.end();

            this.attachNotifications();
        });


        /*
        this.client.multiRead(
            [{
                name: 'MAIN.LAMPE',
                byteLength: ads.BOOL,
            }, {
                name: '.AI_LICHT_SENSOR',
                byteLength: ads.INT,
            }, {
                name: '.PT_TEMP_SENSOR',
                byteLength: ads.INT,
            }, {
                name: '.DIMMER',
                byteLength: ads.INT,
            }],
            function (error, handles) {
                if (error) {
                    console.log('multiRead', error);
                } else {
                    handles.forEach(function (handle) {
                        if (handle.error) {
                            console.error('multiRead', handle.error);
                        } else {
                            console.log('multiRead', handle.name, handle.value);
                        }
                    });
                }
            });

        this.client.multiWrite(
            [{
                name: 'MAIN.LAMPE',
                byteLength: ads.BOOL,
                value: false,
            }, {
                name: '.DIMMER',
                byteLength: ads.INT,
                value: 0,
            }],
            function (error, handles) {
                if (error) {
                    console.log('multiWrite', error);
                } else {
                    handles.forEach(function (handle) {
                        if (handle.error) {
                            console.error('multiWrite', handle.error);
                        } else {
                            console.log('multiWrite', handle.name, handle.value);
                        }
                    });
                }
            });

        this.client.read({
            name: '.PT_TEMP_SENSOR',
            byteLength: ads.INT,
        }, function (error, handle) {
            if (error) {
                console.log(error)
            } else {
                console.log(handle);
            }
        });
        
        this.client.read({
            name: '.DIMMER',
            byteLength: ads.INT,
        }, function (error, handle) {
            if (error) {
                console.log(error)
            } else {
                console.log(handle);
            }
        });

        this.client.write({
            name: '.DIMMER',
            byteLength: ads.INT,
            value: 0,
        }, function (error, handle) {
            if (error) {
                console.log(error)
            } else {
                console.log(handle);
            }
        });
        */

        this.isConnected = true;
    }

    private disconnect(): void {
        console.log('disconnecting...');

        if (!this.isConnected) {
            return;
        }

        this.client.end();

        this.isConnected = false;
    }

    public setValue(name: string, value: any): void {
        if (!this.isConnected) {
            console.log('setValue: not connected!');
            return;
        }

        const handle: Handle = this.getHandle(name, value);

        if (handle && !handle.name) {
            console.log('Symbol not found, exiting!', name);
            return;
        }

        //console.log('write Symbol:', name, value);

        this.client.write(handle, function (error, result) {
            if (error) {
                console.error(error);
            }
            //console.log(handle, result);
        });
    }

    public getSymbolCollection(names: string[]): void {
        const handles = names.map((name) => {
            let handle = this.getHandle(name);
            if (!handle) {
                return;
            }

            return {
                name: handle.name,
                byteLength: handle.byteLength
            };
        }).filter((handle) => {
            return handle;
        });

        if (!this.isConnected) {
            console.log('getSymbolCollection: not connected!');
            return;
        }

        console.log(handles);

        this.client.multiRead(
            handles,
            function (error, data) {
                if (error) {
                    console.log('multiReadResult error', error);
                    return;
                }

                if (data && Server.io) {
                    data.forEach(symbol => {
                        Server.io.emit('Symbol', {
                            name: symbol.name,
                            value: symbol.value
                        });
                    });
                }
            });
    }

    public attachNotifications(): void {
        console.log('check values...');

        if (!this.isConnected) {
            console.log('attachNotifications: not connected!');
            return;
        }

        try {
            this.client.notify({
                name: '.AI_LICHT_SENSOR',
                cycleTime: 100,
                byteLength: ads.INT,
            });

            this.client.notify({
                name: '.PT_TEMP_SENSOR',
                cycleTime: 100,
                byteLength: ads.INT,
            });

            this.client.notify({
                name: '.DIMMER',
                cycleTime: 100,
                byteLength: ads.INT,
            });

            this.client.notify({
                name: 'MAIN.LAMPE',
                cycleTime: 100,
                byteLength: ads.BOOL,
            });

            this.client.notify({
                name: '.DI_TASTER',
                cycleTime: 100,
                byteLength: ads.BOOL,
            });

            this.client.notify({
                name: '.DI_SCHALTER',
                cycleTime: 100,
                byteLength: ads.BOOL,
            });

            this.client.notify({
                name: '.DO_LAMPE_1',
                cycleTime: 100,
                byteLength: ads.BOOL,
            });
        } catch (error) {
            console.log(error);
        }

        this.client.notify({
            indexGroup: ads.ADSIGRP.SYM_VERSION,
            indexOffset: 0,
            byteLength: ads.BYTE,
        });
    }

    public cleanupNotifications(): void {
        console.log('cleanup values...');

        if (!this.isConnected) {
            console.log('cleanupNotifications: not connected!');
            return;
        }

        try {
            /*
            this.client.releaseNotificationHandles(function(data){
                console.error(data);
            });
            */
            this.client.end();
        } catch (error) {
            console.log(error);
        }
    }

    private getSymbolByName(name: string): Symbol | undefined {
        if (!this.symbols || this.symbols.length === 0) {
            console.error(`Symbol Table is empty, can't resolve "` + name + `"`);
            return;
        }

        const symbol: Symbol = this.symbols.find((symbol) => {
            return symbol.name === name.toUpperCase();
        });

        if (!symbol) {
            console.error(`Symbol "` + name + `" not found!`);
            return;
        }

        return symbol;
    }

    private getHandle(name: string, value?: any): Handle {
        const symbol: Symbol = this.getSymbolByName(name);

        if (!symbol) {
            console.error(`Can't resolve "` + name + `", exiting.`);
            return;
        }

        let byteLength = ads.BOOL;

        switch (symbol.type) {
            case 'BOOL':
                byteLength = ads.BOOL;
                break;
            case 'INT16':
                byteLength = ads.INT;
                break;
        }

        if (value !== undefined) {
            return {
                name: name,
                byteLength: byteLength,
                propname: 'value',
                //indexGroup: symbol.indexGroup,
                //indexOffset: symbol.indexOffset,
                value: value,
            };
        }

        return {
            name: name,
            byteLength: byteLength,
            indexGroup: symbol.indexGroup,
            indexOffset: symbol.indexOffset,
        };
    }
}