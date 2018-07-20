var ads = require('node-ads')

var options = {
    //The IP or hostname of the target machine
    host: "192.168.1.174",
    //The NetId of the target machine
    amsNetIdTarget: "10.0.0.105.1.1",
    //The NetId of the source machine.
    //You can choose anything in the form of x.x.x.x.x.x,
    //but on the target machine this must be added as a route.
    amsNetIdSource: "192.168.137.50.1.1",
    verbose: true,

    //OPTIONAL: (These are set by default)
    //The tcp destination port
    //port: 48898
    //The ams source port
    //amsPortSource: 32905
    //The ams target port
    //amsPortTarget: 801
}

export class Plc {
    public plc: WebServiceClientInstance;
    public client: any;

    constructor(serviceURL: string, amsNetId: string) {
        this.connect(serviceURL, amsNetId);

        this.client.on('notification', (handle) => {
            console.log('notification', handle)
        })

        process.on('exit', function () {
            console.log("exit")
        })

        process.on('SIGINT', () => {
            this.client.end(() => {
                process.exit()
            })
        })

        this.client.on('error', (error) => {
            console.log(error)
        })
    }

    private connect(serviceURL: string, amsNetId: string): void {
        console.log('connecting...');

        this.client = ads.connect(options, () => this.connected);
    }

    private connected() {
        console.log('check values...');
    }

    public checkValues(): void {
        console.log('check values...');

        this.client.read({
            symname: '.PT_Temp_Sensor',
            bytelength: ads.INT,
        }, function (err, handle) {
            if (err) console.log(err)
            console.log(handle.value)
        });

        this.client.read({
            symname: '.AI_Licht_Sensor',
            bytelength: ads.INT,
        }, function (err, handle) {
            if (err) console.log(err)
            console.log(handle.value)
        });

        /*
        this.notify({
            symname: '.AI_Licht_Sensor',
            bytelength: ads.INT,
        });

        this.notify({
            symname: '.PT_Temp_Sensor',
            bytelength: ads.INT,
        });
        */

        /*
        this.multiRead(
            [{
                symname: '.PT_Temp_Sensor',
                bytelength: ads.INT,
            }, {
                symname: '.DIM_aus_Strahler',
                bytelength: ads.INT,
            }],
            function (err, handle) {
                if (err) console.log(err)
                    console.log('multiReadResult', handle)
            });
        */
    }
}

/*
function () {
            this.connection = this;
            /*
            this.notify({
                symname: '.AI_Licht_Sensor',
                bytelength: ads.INT,

                //OPTIONAL: (These are set by default)       
                //transmissionMode: ads.NOTIFY.ONCHANGE, (other option is ads.NOTIFY.CYLCIC)
                //maxDelay: 0,  -> Latest time (in ms) after which the event has finished
                //cycleTime: 10 -> Time (in ms) after which the PLC server checks whether the variable has changed
            });

            this.notify({
                symname: '.PT_Temp_Sensor',
                bytelength: ads.INT,
            });

            this.notify({
                symname: '.DI_Taster',
                bytelength: ads.BOOL,
            });

            this.read({
                symname: '.AI_Licht_Sensor',
                bytelength: ads.INT,
            }, function (err, handle) {
                if (err) console.log(err)
                console.log(handle.value)
            });

            this.read({
                symname: '.PT_Temp_Sensor',
                bytelength: ads.INT,
            }, function (err, handle) {
                if (err) console.log(err)
                console.log(handle.value)
            });

            this.read({
                symname: '.DI_Taster',
                bytelength: ads.BOOL,
            }, function (err, handle) {
                if (err) console.log(err)
                console.log(handle.value)
            });
        */
            /*

            {
                    symname: '.DO_Lampe_1',
                    bytelength: ads.BOOL,

                    name: '.DO_Lampe_1',
                    readLength: ads.BOOL,
                }, {
                    symname: 'MAIN.test',
                    bytelength: ads.BOOL,

                    name: 'MAIN.test',
                    readLength: ads.BOOL,
                }, {
                    symname: '.DI_Taster',
                    bytelength: ads.BOOL,

                    name: '.DI_Taster',
                    readLength: ads.BOOL,
                }, {
                    symname: '.AI_Licht_Sensor',
                    bytelength: ads.INT,

                    name: '.AI_Licht_Sensor',
                    readLength: ads.INT,
                }, {
                    symname: '.PT_Temp_Sensor',
                    bytelength: ads.INT,

                    name: '.PT_Temp_Sensor',
                    readLength: ads.INT,
                }, {
                    symname: '.DIM_aus_Strahler',
                    bytelength: ads.INT,

                    name: '.DIM_aus_Strahler',
                    readLength: ads.INT,
                }, {
                    symname: '.dimmer',
                    bytelength: ads.INT,

                    name: '.dimmer',
                    readLength: ads.INT,
                }

        */
/*
            this.read({
                symname: '.PT_Temp_Sensor',
                bytelength: ads.INT,
            }, function (err, handle) {
                if (err) console.log(err)
                console.log(handle.value)
            });


            this.read({
                symname: '.AI_Licht_Sensor',
                bytelength: ads.INT,
            }, function (err, handle) {
                if (err) console.log(err)
                console.log(handle.value)
            });
            */
        /*
            this.notify({
                symname: '.AI_Licht_Sensor',
                bytelength: ads.INT,
            });

            this.notify({
                symname: '.PT_Temp_Sensor',
                bytelength: ads.INT,
            });
        */
        /*
            this.multiRead(
                [{
                    symname: '.PT_Temp_Sensor',
                    bytelength: ads.INT,
                }, {
                    symname: '.DIM_aus_Strahler',
                    bytelength: ads.INT,
                }],
                function (err, handle) {
                    if (err) console.log(err)
                        console.log('multiReadResult', handle)
                });
        */

            /*
            this.readDeviceInfo(function(err, result) {
                if (err) console.log(err)
                console.log(result)
                this.end()
            });
            */
        /*
            this.getSymbols(function(err, symbols) {
                if (err) console.log(err)
                console.log(symbols)
                //this.end()
            });
        }
        */