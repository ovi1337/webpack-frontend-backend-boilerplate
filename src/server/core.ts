import { Plc } from '../modules/Plc';
import { Server } from '../server';
import * as express from 'express'
import { Api } from './api';

export class Core {
    public static api;

    public static init() {
        Core.attachBaseServer();
        Core.attachApi();
    }

    private static attachBaseServer() {
        console.log('init server');

        Server.app.engine('html', require('ejs').renderFile);

        Server.app.set('view engine', 'html');
        Server.app.set('views', 'build/public/');

        Server.app.use('/', express.static('build/public/', { index: false }));

        Server.app.get('/', (req, res) => {
            res.render('./index', { req, res });
        });
    }

    public static attachApi() {
        Core.api = new Api(Server);
        Core.api.getPLCData();
    }
}

