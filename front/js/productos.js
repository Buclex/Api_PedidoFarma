document.addEventListener('DOMContentLoaded', async () => {
    try {
       const response = await axios.get('http://localhost:4000/productos/catalogo')
       const productos = response.data;
       
       const contenedorProductos = document.getElementById('productos')

       productos.forEach(producto => {
        // objeto contenedor
        const productoDiv = document.createElement('tbody')
        // productoDiv.classList.add('producto')

        // creacion de elementos
        const btnDel = document.createElement('button')

        // añadir classes
        btnDel.classList.add(
            'w-10',
            'h-10',
            'bg-blue-500',
            'text-white',
            'flex',
            'items-center',
            'justify-center',
            'rounded-lg',
            'shadow-lg',
            'hover:bg-blue-600'
        )

        // añadir al DOM
        productoDiv.innerHTML = `
                <tr class="border-b hover:bg-gray-50">
                    <td class="px-6 py-4 text-gray-700">${producto.Nombre}</td>
                    <td class="px-6 py-4 text-gray-600">${producto.Descripción}</td>
                    <td class="px-6 py-4 text-gray-800 font-semibold">$${producto.Precio}</td>
                    <td class="px-1 py-1">
                        <button id=${producto.ID_Producto} onclick="editarProducto(1)" class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                            
                            <i class="fas fa-edit"></i>
                        </button>
                        <button id=${producto.ID_Producto} class="btn-DEL bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                            <i class="fas fa-trash"></i>
                            
                        </button>
                    </td>
                </tr>
        `;
            contenedorProductos.appendChild(productoDiv);
        });

        // btn eliminar producto
        const btnDel = document.querySelectorAll('.btn-DEL')
        console.log(btnDel)
        if(btnDel){
            btnDel.forEach(button => {
                button.addEventListener('click', async (event) =>{
                    if(event.target && event.target.matches('.btn-DEL'))
                    {
                        const idProducto = button.getAttribute('id')
                        console.log('id del producto: ',idProducto)
                
                        if(!idProducto){
                            console.error('El id del producto no esta definido')
                            return;
                        }

                        const responseDel = await axios.delete(`http://localhost:4000/productos/${idProducto}`)
                        .then(responseDel => {
                            console.log('Producto eliminado con exito')
                            //alert eliminar producto
                            const alertContainer = document.getElementById('alert-container')
                            const successAlert = document.createElement('div')
                            successAlert.classList.add('alert', 'alert-success', 'fade')
                            successAlert.innerHTML= 'Producto eliminado'
                            alertContainer.appendChild(successAlert)

                            setTimeout(() => {
                                location.reload();
                            }, 1000)
                         })
                        .catch(error => {
                            console.error('Hubo un problema al eliminar el producto', error)
                            alert('No se pudo eliminar el producto')
                        })
                    }
                })

            })
        }

    } catch (error) {
       console.log('Error al obtener los productos: ',error) 
    }
})