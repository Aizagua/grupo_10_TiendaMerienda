window.onload = function() {
    const form = document.querySelector(".formularios-login");

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const nombre = document.querySelector('input[name="nombre"]');
        const precio = document.querySelector('input[name="precio"]');
        const cantidad = document.querySelector('input[name="cantidad"]');
        const codigo = document.querySelector('input[name="codigo"]');
        const descripcion = document.querySelector('#descripcion');
        const id_productoCat = document.querySelector('#id_productoCat');
        const desc2 = document.querySelector('#desc2');
        const imagen = document.querySelector('#imagen');

        const errorNombre = document.querySelector('#errorNombre');
        const errorPrecio = document.querySelector('#errorPrecio');
        const errorCantidad = document.querySelector('#errorCantidad');
        const errorCodigo = document.querySelector('#errorCodigo');
        const errorDescripcion = document.querySelector('#errorDescripcion');
        const errorCategoria = document.querySelector('#errorCategoria');
        const errorDesc2 = document.querySelector('#errorDesc2');
        const errorImagen = document.querySelector('#errorImagen');

        errorNombre.textContent = '';
        errorPrecio.textContent = '';
        errorCantidad.textContent = '';
        errorCodigo.textContent = '';
        errorDescripcion.textContent = '';
        errorCategoria.textContent = '';
        errorDesc2.textContent = '';
        errorImagen.textContent = '';

        let hayErrores = false;

        if (nombre.value == '') {
            hayErrores = true;
            nombre.classList.add('is-invalid');
            nombre.classList.remove('is-valid');
            errorNombre.textContent = 'Escribí el nombre';
        } else {
            nombre.classList.remove('is-invalid');
            nombre.classList.add('is-valid');
        }

        if (precio.value <= 0) {
            hayErrores = true;
            precio.classList.add('is-invalid');
            precio.classList.remove('is-valid');
            errorPrecio.textContent = 'Indicá el precio';
        } else {
            precio.classList.remove('is-invalid');
            precio.classList.add('is-valid');
        }

        if (cantidad.value <= 0  || cantidad.value > 100 || cantidad.value == '') {
            hayErrores = true;
            cantidad.classList.add('is-invalid');
            cantidad.classList.remove('is-valid');
            errorCantidad.textContent = 'Indicá la cantidad, no podes superar las 100 unidades';
        } else {
            cantidad.classList.remove('is-invalid');
            cantidad.classList.add('is-valid');
        }

        if (codigo.value == '') {
            hayErrores = true;
            codigo.classList.add('is-invalid');
            codigo.classList.remove('is-valid');
            errorCodigo.textContent = 'Indicá el codigo';
        } else {
            codigo.classList.remove('is-invalid');
            codigo.classList.add('is-valid');
        }

        if (descripcion.value.length < 5 || descripcion.value.length > 100) {
            hayErrores = true;
            descripcion.classList.add('is-invalid');
            descripcion.classList.remove('is-valid');
            errorDescripcion.textContent = 'Debe contener de 5 a 100 caracteres';
        } else {
            descripcion.classList.remove('is-invalid');
            descripcion.classList.add('is-valid');
        }

        if (id_productoCat.value == '') {
            hayErrores = true;
            id_productoCat.classList.add('is-invalid');
            id_productoCat.classList.remove('is-valid');
            errorCategoria.textContent = 'Selecciona una categoría válida';
        } else {
            id_productoCat.classList.remove('is-invalid');
            id_productoCat.classList.add('is-valid');
        }

        if (desc2.value.length < 20 || desc2.value.length > 1500) {
            hayErrores = true;
            desc2.classList.add('is-invalid');
            desc2.classList.remove('is-valid');
            errorDesc2.textContent = 'Debe contener de  a 1500 caracteres';
        } else {
            desc2.classList.remove('is-invalid');
            desc2.classList.add('is-valid');
        }

        if (imagen.value == '') {
            hayErrores = true;
            imagen.classList.add('is-invalid');
            imagen.classList.remove('is-valid');
            errorImagen.textContent = 'No se ha cargado ninguna imagen';
        } else {
            imagen.classList.remove('is-invalid');
            imagen.classList.add('is-valid');
        }

        if (!hayErrores) {
            Swal.fire(
                'Producto creado',
                'success'
            ).then(() => {
                form.submit()
            });
        }
    });
}
