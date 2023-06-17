import fs from 'fs'

class ModelFile {

    constructor(){
        this.nombreArchivo = 'productos.json'
    }
    
    obtenerProductos = async id => {
        try{
            const productos = JSON.parse(await fs.promises.readFile(this.nombreArchivo, 'utf-8'))
            if(id) {
                const producto = productos.find(producto => producto.id == id)
                return (producto || {})
            }
            else {
                return (productos)
            }
        }
        catch{
            return id? {} : []
        }
    }
    
    guardarProducto = async producto => {
        let productos = []
        try {
            productos = JSON.parse(await fs.promises.readFile(this.nombreArchivo, 'utf-8'))
        }
        catch {}
        producto.id = (productos[productos.length - 1]?.id || 0) + 1    
        productos.push(producto)
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos, null, '\t'))
        return producto
    }
    
    actualizarProducto = async (id, producto) => {
        const productos = JSON.parse(await fs.promises.readFile(this.nombreArchivo, 'utf-8'))
        producto.id = id
        const indice = productos.findIndex(producto => producto.id == id)
        const productoAnterior = productos[indice]
        if (productoAnterior) {
            const productoNuevo = {...productoAnterior, ...producto}
            productos.splice(indice, 1, productoNuevo)
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos, null, '\t'))
            return productoNuevo
        }
        else {
            productos.push(producto)
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos, null, '\t'))
            return producto
        }
    }
    
    borrarProducto = async id => {
        const productos = JSON.parse(await fs.promises.readFile(this.nombreArchivo, 'utf-8'))
        const indice = productos.findIndex(producto => producto.id == id)
        const producto = productos.splice(indice, 1)[0]
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos, null, '\t'))
        return producto
    }    
}

export default ModelFile