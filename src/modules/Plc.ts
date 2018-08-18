import * as ads from 'twincat-ads';
import { Server } from '../server';

export class Plc {
    public client: any;
    public symbols: Symbol[];

    constructor(settings: ConnectionSettings) {
        this.connect(settings);

        this.client.on('notification', (data) => {
            if (Server.io) {
                Server.io.emit('Data', data);
            }
        });

        process.on('exit', () => {
            console.log("exit");
        });

        process.on('SIGINT', () => {
            this.client.end(() => {
                process.exit();
            });
        });

        this.client.on('error', (error) => {
            console.log('TwinCAT-ADS Error', error);
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

        this.client = ads.connect(settings, (client) => {
            this.connected(client);
        });
    }

    private connected(client: any) {
        console.log('connected...');

        const connection = this.client.getSymbols((error, symbols) => {
            if (error) {
                console.error('getSymbols Error', error);
            }

            this.symbols = symbols;
            //console.log(this.symbols);
            /*
                        this.setValue('MAIN.LAMPE', false);
            
                        const brightness = 0;
                        let _value = (32767 - ((100 - brightness) / 100 * 32767));
                        this.setValue('.DIMMER', _value);
            */

            //this.setValue('.PT_Temp_Sensor', 0);
            //this.setValue('.AI_Licht_Sensor', 0);

            //connection.end();
        });

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
/*
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
*/
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
    }

    private disconnect(): void {
        console.log('disconnecting...');

        this.client.end();
    }

    public setValue(name: string, value: any): void {
        const handle: Handle = this.getHandle(name, value);

        if(handle && !handle.name) {
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

            return {name: handle.name, byteLength: handle.byteLength};
        });

        this.client.multiRead(
            handles,
            function (err, data) {
                if (err) {
                    console.log('multiReadResult error', err);
                    return;
                }

                if (data && Server.io) {
                    data.forEach(symbol => {
                        Server.io.emit('Data', { 
                            name: symbol.name, 
                            value: symbol.value 
                        });
                    });
                }
            });
    }

    public checkValues(): void {
        console.log('check values...');

        this.client.notify({
            name: '.AI_LICHT_SENSOR',
            byteLength: ads.INT,
        });

        this.client.notify({
            name: '.PT_TEMP_SENSOR',
            byteLength: ads.INT,
        });

        this.client.notify({
            name: '.DIMMER',
            byteLength: ads.INT,
        });

        this.client.notify({
            name: 'MAIN.LAMPE',
            byteLength: ads.BOOL,
        });
    }

    private getSymbolByName(name: string): Symbol|undefined {
        if(!this.symbols || this.symbols.length === 0) {
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

        if(!symbol) {
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