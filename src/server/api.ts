import { Plc } from "../modules/Plc";

export class Api {
    constructor(Server) {
        Server.app.get('/api', (req, res) => {
            res.send({
                message: 'I am a server route and can also be hot reloaded!',
            });
        });
    }
    
    public getPLCData() {
        //const plc = new Plc('', '10.0.0.105.1.1');
        //plc.checkValues();
    }
}

