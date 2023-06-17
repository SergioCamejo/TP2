import dotenv from 'dotenv'

/* dotenv.config()
console.log('*****************************')
console.log(process.env.PORT)
console.log(process.env.MODO_PERSISTENCIA)
console.log(process.env.STRCNX)
console.log(process.env.BASE)
console.log('*****************************') */ 

const PORT = process.env.PORT || 8080
const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA || 'MEM'   // 'MEM' - 'FILE' - 'MONGODB'
const STRCNX = process.env.STRCNX || 'mongodb://127.0.0.1'
const BASE = process.env.BASE || 'test'

export default {
    PORT,  // es igual a -> PORT : PORT
    MODO_PERSISTENCIA,
    STRCNX,
    BASE
}