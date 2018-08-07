import * as express from 'express'
import * as socketIo from 'socket.io';
import * as http from 'http';
import { Core } from './server/core';
import { AddressInfo } from 'net';
import { Plc } from './modules/Plc';

export interface Module extends NodeModule {
    hot?: any;
}

export class Server {
    public static app: express.Application = express();
    public static httpServer: http.Server;
    public static module: Module = module;
    public static io: SocketIO.Server;

    public readonly port: number = Server.app.get('port') || Number(process.env.PORT) || 3000;

    constructor() {
        this.init(this.port);

        Core.init();
    }

    private init(port: number): Promise<any> {
        Server.httpServer = Server.app.listen(port);

        return new Promise((resolve, reject) => {
            Server.httpServer.once('error', (err: any) => {
                if (err.code === 'EADDRINUSE') {
                    reject(err);
                }
            });

            Server.httpServer.once('listening', () => resolve(Server.httpServer));
        }).then(httpServer => {
            const { port } = Server.httpServer.address() as AddressInfo;
            this.attachWebsocket(port);

            console.info(`==> 🌎 Listening on ${port}. Open up http://localhost:${port}/ in your browser.`);
            
            if (Server.module.hot) {
                this.attachHMR();
            }
        });
    }

    private attachWebsocket(port) {
        Server.io = socketIo().listen(Server.httpServer);

        Server.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', port);
            socket.on('data', (data: Symbol) => {
                console.log('[server](data): %s', JSON.stringify(data));
                //Server.io.emit('data', data);
                Core.setSymbol(data);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    private attachHMR() {
        console.log('HMR enabled');

        let currentApp = Server.app;

        Server.module.hot.accept('./server', () => {
            Server.httpServer.removeListener('request', currentApp);

            import('./server')
                .then((newServer) => {
                    currentApp = newServer.Server.app;
                    Server.httpServer.on('request', currentApp);

                    console.log('HttpServer reloaded!');
                })
                .catch(err => console.error(err));
        });

        Server.module.hot.accept(err => console.error(err));
        Server.module.hot.dispose(() => {
            console.log('Disposing entry module...');

            Server.httpServer.close();
        });
    }
}

let server = new Server();
