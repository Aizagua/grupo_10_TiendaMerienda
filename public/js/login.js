window.onload = function() {
const form = document.querySelector('#formlogin');
console.log("errors")
form.addEventListener('submit', async (e) => {  
    
          
    e.preventDefault()
    const email= document.querySelector('.textodelogin1')
    const password= document.querySelector('.textodelogin2')

    const listaErrores = document.querySelector('#listaErrores');
    let errores=[];
    if (email.value == '') {
        errores.push('Escribí el nombre');
        email.classList.add('is-invalid');
        email.classList.remove('is-valid');
    } else {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email.value)) {
            errores.push('Ingresa un correo electrónico válido');
            email.classList.add('is-invalid');
            email.classList.remove('is-valid');
        } else {
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
        }
    }
    if (password.value == '') {
        errores.push('La contraseña es incorrecta')
        password.classList.add('is-invalid')
        password.classList.remove('is-valid')
    } else {
        password.classList.remove('is-invalid')
        password.classList.add('is-valid')
    }
    if (errores.length > 0) {
        listaErrores.innerHTML = ``
        for (let error of errores) {
            listaErrores.innerHTML += `<li>${error}</li>`}
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario incorrecto!',
              })
        
    } else {
        listaErrores.innerHTML = ``
        
            form.submit()
    }})

}
