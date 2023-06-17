import { Long, ObjectId } from "mongodb"
import CnxMongoDB from "../DBMongo.js"

class ModelMongoDB {

    constructor() {                
        
    }
    
    obtenerProductos = async id => {
        if(!CnxMongoDB.connectOk) return id? {} : []
        if(id) {
            const producto = await CnxMongoDB.db.collection('productos').findOne({_id: new ObjectId(id)})
            return producto
        }
        else {
            //return await Promise.resolve([])
            const productos = await CnxMongoDB.db.collection('productos').find({}).toArray()
            return productos
        }
    }

    guardarProducto = async producto => {
        if(!CnxMongoDB.connectOk) return {}
        await CnxMongoDB.db.collection('productos').insertOne(producto)
        return producto
    }

    actualizarProducto = async (id, producto) => {
        if(!CnxMongoDB.connectOk) return {}
        //console.log(id, producto);
        await CnxMongoDB.db.collection('productos').updateOne(
            {_id: new ObjectId(id)}, // campo de query para actualización
            {$set: producto}
        )
        const productoActualizado = await this.obtenerProductos(id)
        return productoActualizado
    }

    borrarProducto = async id => {      
        if(!CnxMongoDB.connectOk) return {}
        //console.log(id);
        const productoEliminado = await this.obtenerProductos(id)
        await CnxMongoDB.db.collection('productos').deleteOne({_id: new ObjectId(id)})
        return productoEliminado
    }

}

export default ModelMongoDB