import * as express from 'express'
import { Server } from '../server';
import { Api } from './api';
import { Plc } from '../modules/Plc';
import { settings } from '../config/connection';

export class Core {
    public static readonly port:number = 3000;
    private static basePath = 'build/public/';
    public static api: Api;
    public static plc: Plc;

    public static init(): void {
        Core.attachBaseServer();
        Core.attachApi();
        Core.attachPlc();
    }

    private static attachBaseServer(): void {
        Server.app.engine('html', require('ejs').renderFile);

        Server.app.set('view engine', 'html');
        Server.app.set('views', Core.basePath);

        Server.app.use('/', express.static(Core.basePath, { 
            index: false
        }));

        Server.app.get('/', (req, res) => {
            res.render('./index', { req, res });
        });
    }

    public static attachApi() {
        Core.api = new Api(Server);
    }

    public static attachPlc() {
        Core.plc = new Plc(settings);
        Core.plc.checkValues();
    }

    public static setSymbol(data: Symbol) {
        Core.plc.setValue(data.name, data.value);
    }

    public static updateSymbolAccessList(data: string[]) {
        console.log('updateSymbolAccessList:', data);
        Core.plc.getSymbolCollection(data);
    }

    public static cleanupSymbolAccessList() {
        console.log('cleanupSymbolAccessList:');
    }
}
