import express from "express";
import cors from "cors";
import router from "./router/routers.js";
import auth from "./router/auth.js";
import {createPool} from "mysql2/promise";

const port = 4000;
const app = express()

app.use('/api',express.static('front'))

// pool
export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'buclex.net',
    database: 'pedidoFarmadb',
    port: 3306
})

app.use(express.json())
app.use(cors())

//test pool
app.get('/ping', async (req,res) => {
    const result = await pool.query("SELECT * FROM buclex.Producto")
    res.json(result[0])
})

//test products
app.use('/productos',router)
//test users
app.use('/auth',auth)

app.listen(port, () => {
    console.log(`servidor corriendo en http://localhost:${port}`)
})

