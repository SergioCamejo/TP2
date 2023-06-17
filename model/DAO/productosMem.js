class ModelMem {

    constructor() {                
        this.productos = [
            {id: 1, nombre : 'TV', precio: 1234, stock: 45},
            {id: 2, nombre : 'Mouse', precio: 234, stock: 79},
            {id: 3, nombre : 'Teclado', precio: 345, stock: 88},
        ]
    }
    
    obtenerProductos = async id => {
        if(id) {
            const producto = await Promise.resolve(this.productos.find(producto => producto.id == id))
            return (producto || {})
        }
        else {
            return await Promise.resolve(this.productos)
        }
    }

    guardarProducto = async producto => {
        producto.id = (this.productos[this.productos.length - 1]?.id || 0) + 1
        this.productos.push(producto)
        return await Promise.resolve(producto)
    }

    actualizarProducto = async (id, producto) => {
        producto.id = id
        const indice = this.productos.findIndex(producto => producto.id == id)
        const productoAnterior = this.productos[indice]
        if (productoAnterior) {
            const productoNuevo = {...productoAnterior, ...producto}
            this.productos.splice(indice, 1, productoNuevo)
            return await Promise.resolve(productoNuevo)
        }
        else {
            this.productos.push(producto)
            return await Promise.resolve(producto)
        }
    }

    borrarProducto = async id => {
        const indice = this.productos.findIndex(producto => producto.id == id)
        const producto = this.productos.splice(indice, 1)[0]
        return await Promise.resolve(producto)
    }
    
}
export default ModelMem