import * as express from 'express'
import { Server } from '../server';
import { Api } from './api';

export class User {
    constructor(private name: string) {}
}

export class Message {
    constructor(private from: User, private content: string) {}
}

export class Core {
    public static api;
    public static readonly port:number = 3000;
    private static basePath = 'build/public/';

    public static init(): void {
        Core.attachBaseServer();
        Core.attachApi();
    }

    private static attachBaseServer(): void {
        Server.app.engine('html', require('ejs').renderFile);

        Server.app.set('view engine', 'html');
        Server.app.set('views', Core.basePath);

        Server.app.use('/', express.static(Core.basePath, { index: false }));

        Server.app.get('/', (req, res) => {
            res.render('./index', { req, res });
        });
    }

    public static attachApi() {
        Core.api = new Api(Server);

        Core.api.getPLCData();
    }
}
