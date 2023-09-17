window.onload = function() {
    const form = document.querySelector('.formularios-login');



    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const nombre = document.querySelector('input[name="nombre"]');
        const precio = document.querySelector('input[name="precio"]');
        const cantidad = document.querySelector('input[name="cantidad"]');
        const codigo = document.querySelector('input[name="codigo"]');
        const descripcion = document.querySelector('input[name="descripcion"]');
        const id_productoCat = document.querySelector('#id_productoCat');
        const desc2 = document.querySelector('#desc2');
        const imagen = document.querySelector('#imagen');

        const listaErrores = document.querySelector('#listaErrores');

        let errores = [];

        if (nombre.value == '') {
            errores.push('Escribí el nombre')
            nombre.classList.add('is-invalid')
            nombre.classList.remove('is-valid')
        } else {
            nombre.classList.remove('is-invalid')
            nombre.classList.add('is-valid')
        }

        if (precio.value <= 0) {
            errores.push('Indicá el precio')
            precio.classList.add('is-invalid')
            precio.classList.remove('is-valid')
        } else {
            precio.classList.remove('is-invalid')
            precio.classList.add('is-valid')
        }

        if (cantidad.value <= 0  || cantidad.value > 100 || cantidad.value == '') {
            errores.push('Indicá la cantidad, no podes superar las 100 unidades')
            cantidad.classList.add('is-invalid')
            cantidad.classList.remove('is-valid')
        } else {
            cantidad.classList.remove('is-invalid')
            cantidad.classList.add('is-valid')
        }

        if (codigo.value == '') {
            errores.push('Indicá el codigo')
            codigo.classList.add('is-invalid')
            codigo.classList.remove('is-valid')
        } else {
            codigo.classList.remove('is-invalid')
            codigo.classList.add('is-valid')
        }

        if (descripcion.value == '') {
            errores.push('Escribí una breve descripcion del producto')
            descripcion.classList.add('is-invalid')
            descripcion.classList.remove('is-valid')
        } else {
            descripcion.classList.remove('is-invalid')
            descripcion.classList.add('is-valid')
        }

        if (id_productoCat.value == '') {
            errores.push('Selecciona una categoría válida')
            id_productoCat.classList.add('is-invalid')
            id_productoCat.classList.remove('is-valid')
        } else {
            id_productoCat.classList.remove('is-invalid')
            id_productoCat.classList.add('is-valid')
        }

        if (desc2.value == '') {
            errores.push('Escribi toda la informacion del producto')
            desc2.classList.add('is-invalid')
            desc2.classList.remove('is-valid')
        } else {
            desc2.classList.remove('is-invalid')
            desc2.classList.add('is-valid')
        }

        if (imagen.value == '') {
            errores.push('No se ha cargado ninguna imagen.')
            imagen.classList.add('is-invalid')
            imagen.classList.remove('is-valid')
        } else {
            imagen.classList.remove('is-invalid')
            imagen.classList.add('is-valid')
        }

        if (errores.length > 0) {
            listaErrores.innerHTML = ``
            for (let error of errores) {
                listaErrores.innerHTML += `<li>${error}</li>`
            }
        } else {
            listaErrores.innerHTML = ``
            Swal.fire(
                'Producto creado',
                'success'
            ).then(() => {
                form.submit()
            })


            /*let model = {
                nombre: nombre.value,
                precio: precio.value,
                cantidad: cantidad.value,
                codigo: codigo.value,
                descripcion: descripcion.value,
                id_productoCat: id_productoCat.value,
                desc2: desc2.value,
                imagen: ?????
            }

            let respuestaApi = await fetch('/api/productos/create', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(model)})
            let response = await respuestaApi.json()
            console.log(response)
            if(response.data) {
                Swal.fire(
                    'Producto creado',
                    'success'
                ).then(() => {
                    window.location.href = '/productList'
                })
            } else {
                Swal.fire(
                    'Ups!, Hubo un error',
                    'error'
                ) 
            }*/
        }
    })
}