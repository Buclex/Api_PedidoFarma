const form = document.getElementById('uploadForm')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const fileInput = document.querySelector('#fileInput')
    const file = fileInput.files[0]
    if (!file) {
        alert('Por favor selecciona el archivo')
        return;
    }

    const formData = new FormData()
    formData.append("file", file)

    console.log(formData)
    // try {
        const response = await axios.post('http://localhost:4000/productos/upload', formData, {
            Headers: {
                "Conten-Type": "multipart/form-data"
            }
        });


        if(response){
            alert('archivo subido con exito')
        }
        if(!response){
            alert('error al subir el archivo')
        }
    // } catch (error) {
        // console.log(error)
        // alert('Error al subir el archivo')
    // }

})