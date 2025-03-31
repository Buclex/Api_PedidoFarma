import { pool } from "../index.js";
import express from "express";

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        // Verificar si el usuario ya existe
        const [results] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (results.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        console.log('correo verificado')


        const result = await pool.query('INSERT INTO users (nombre,email,password) VALUES (?,?,?)',[
            nombre,
            email,
            password
        ])

        res.status(201).json({ message: 'Usuario registrado exitosamente' })

    } catch (error) {
        console.error(error)
    }
});

router.post('/login', async(req,res)=> {
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({ message: 'Faltan datos requeridos'})
        }

        const [results] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (results.length === 0) {
            return res.status(400).json({ message: 'El usuario no existe' });
        }


        const user = results[0]; 

        if (!password) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', userId: user.id, email: user.email });
        
    } catch (error) {
       console.log(error) 
    }
});

export default router;