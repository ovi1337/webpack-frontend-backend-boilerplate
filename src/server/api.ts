export class Api {
    constructor(Server) {
        Server.app.get('/api', (req, res) => {
            res.send({
                message: 'I am a server route and can also be hot reloaded!',
            });
        });
    }
}

