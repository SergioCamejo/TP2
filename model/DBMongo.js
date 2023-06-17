import { MongoClient } from "mongodb";
import config from "../config.js";

class CnxMongoDB {
    
    static client = null
    static connectOk = false
    static db = null

    static conectar = async () => {
        try {
            console.log('Conectando a la base de datos...');
            CnxMongoDB.client = new MongoClient(config.STRCNX, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            await CnxMongoDB.client.connect()
            console.log("Base de datos conectada!");
            this.db = this.client.db(config.BASE)

            CnxMongoDB.connectOk = true
        } catch (error) {
            console.log(`Error en la conección de base de datos: ${error.message}`);
        }
    }

    static desconectar = () => {
        if (!CnxMongoDB.connectOk) return
        CnxMongoDB.client.close()
    }
}

export default CnxMongoDB