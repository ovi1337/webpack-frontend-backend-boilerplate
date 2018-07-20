import * as express from 'express'
import { Core } from './server/core';

export interface Module extends NodeModule {
    hot?: any;
}

export class Server {
    public static app: any = express();
    public static httpServer: any;
    public static module: Module = module;

    public readonly port: number = Server.app.get('port') || Number(process.env.PORT) || 3000;
    public readonly basePath = './server';

    constructor() {
        this.init(this.port);

        Core.init();
    }

    private init(port: number) {
        Server.httpServer = Server.app.listen(port);

        return new Promise((resolve, reject) => {
            Server.httpServer.once('error', (err: any) => {
                if (err.code === 'EADDRINUSE') {
                    reject(err);
                }
            });

            Server.httpServer.once('listening', () => resolve(Server.httpServer));
        }).then(httpServer => {
            const { port } = Server.httpServer.address();

            console.info(`==> 🌎 Listening on ${port}. Open up http://localhost:${port}/ in your browser.`);

            if (Server.module.hot) {
                let currentApp = Server.app;

                Server.module.hot.accept(this.basePath, () => {
                    Server.httpServer.removeListener('request', currentApp);

                    import(this.basePath)
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
        });
    }
}

let server = new Server();