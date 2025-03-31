import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import XlsxPopulate from "xlsx-populate";
import { pool } from "../index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({ dest: path.join(__dirname,"upload")})

export const uploadFuntion = upload.single("file")

export const handleUpload = async (req,res) => {
    try {
        
        const filePath = req.file.path;
        const workbook = await XlsxPopulate.fromFileAsync(filePath) 
        const sheet = workbook.sheet(0)
        const datos = sheet.range("A1:F29").value()

        const encabezados = datos[0]
        const json = datos.slice(1).map((fila) => 
            encabezados.reduce((acc,key,index) => {
                acc[key] = fila[index]
                return acc;
            }, {})
        );


        const query = 'INSERT INTO producto (ID_Producto,Codigo_de_Barras,Nombre,Descripción,Categoría,Precio) VALUES ?'

        const values = json.map(producto => [
            producto.ID_Producto,
            producto.Codigo_de_Barras,
            producto.Nombre,
            producto.Descripcion,
            producto.Categoria,
            producto.Precio
        ])

        pool.query(query, [values], (error,result) => {
            if(error){
                console.log('Error al añadir los productos')
            }
            res.status(201).send('Productos añadidos correctamente')
            res.status(201).json(json)
        })
    
    } catch (error) {
       console.log("Error al subir el archivo: ",error) 
    }
}
