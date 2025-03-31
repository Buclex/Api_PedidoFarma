import { pool } from '../index.js'

let productos = [
    { id: 1, nombre: 'Producto 1', precio: 100 }
]

export const crearProducto = async (req, res) => {
    try {
        const {
            ID_Producto,
            Codigo_de_Barras,
            Nombre,
            Descripción,
            Categoría,
            Precio
        } = req.body;

        const rest = await pool.query('INSERT INTO Producto (ID_Producto,Codigo_de_Barras,Nombre,Descripción,Categoría,Precio) VALUES (?,?,?,?,?,?)',
            [ID_Producto,
                Codigo_de_Barras,
                Nombre,
                Descripción,
                Categoría,
                Precio]
        );

        res.status(201).json({
            ID_Producto,
            Codigo_de_Barras,
            Nombre,
            Descripción,
            Categoría,
            Precio
        })
    } catch (error) {
        console.log('Error al crear un producto: ', error)
    }
}

export const obtenerProductos = async (req, res) => {

    try {
        
        const rest = await pool.query('SELECT * FROM Producto')

        res.status(200).json(rest[0])

    } catch (error) {
        console.log(error)
    }
}

export const obtenerProducto = (req, res) => {
    try {
        const { id } = req.params;
        const producto = productos.find(p => p.id === parseInt(id))

        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' })
        }

        res.json(producto);
    } catch (error) {
        console.log(error)
    }
}

export const actualizarProducto = (req, res) => {
    try {

    } catch (error) {
        console.log("error al actualizar Producto: ", error)
    }
}

export const eliminarProducto = (req, res) => {
    const id = req.params.id;

    try {
        const rest = pool.query('DELETE FROM Producto WHERE ID_Producto = ?', id)

        res.status(200).send("Producto eliminado")
    } catch (error) {
        console.log("error al eliminar producto: ", error)
    }
}
