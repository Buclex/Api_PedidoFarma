document.getElementById("register-form").addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if (!nombre || !email || !password) {
        showAlert('error', "Por favor, complete todos los campos.") 
        return;
    }

    try {
        const response = await axios.post('http://localhost:4000/auth/register', {
            nombre: nombre,
            email: email,
            password: password
        });


        showAlert('success', response.data.message)
        console.log(response.data);

        setTimeout(() => {
            window.location.href = "index.html";
        }, "1000")

    } catch (error) {
        if (error.response) {
            // El servidor respondió con un código de error
            showAlert('error', error.response.data.message);
            console.error(error.response.data);
        } else {
            // error de solicitud
            showAlert('error',"Error en la solicitud.");
            console.error(error);
        }
    }

})
function showAlert(type, message) {
    const alertDiv = document.getElementById("alert-container");

    // Limpiar cualquier alerta anterior
    alertDiv.classList.remove("hidden", "bg-green-500", "bg-red-500");
    alertDiv.classList.add("p-4", "rounded-md", "text-white", "mb-4");

    if (type === 'success') {
        alertDiv.classList.add("bg-green-500");  //  éxito 
    } else if (type === 'error') {
        alertDiv.classList.add("bg-red-500");    // error 
    }

    // mensaje 
    alertDiv.innerText = message;

    // Mostrar la alerta
    alertDiv.classList.remove("hidden");
}
