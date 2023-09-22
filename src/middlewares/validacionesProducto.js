const { check } = require('express-validator');

module.exports = [
    check('nombre').notEmpty().withMessage('Escribí el nombre').trim(),
    check('precio').isInt({gt:0}).withMessage('Indicá el precio'),
    check('cantidad').isFloat({min: 1, max: 100}).withMessage('Indica una cantidad menor a 100'),
    check('codigo').notEmpty().withMessage('Indicá el codigo'),
    check('descripcion').isLength({min: 10, max: 50}).withMessage("Debe contener de 10 a 50 caracteres"),
    check('id_productoCat').custom((value, { req }) => {
        if (value === -1 || value === '') {
            throw new Error('Selecciona una categoría válida');
        }
        return true;
    }),
    check('desc2').isLength({min: 20, max: 80}).withMessage("Debe contener de 20 a 80 caracteres"),    
    check('imagen').custom((value, { req }) => {
        if (req.fileError) {
            throw new Error('Adjunte una imagen válida');
        }

        // Verifica el tamaño del archivo
        if (!req.file) {
            throw new Error('No se ha cargado ninguna imagen.');
        }

        if (req.file.size >= (1024 * 1024 * 10)) {
            throw new Error('La imagen es demasiado grande. Debe ser menor a 10 megabytes.');
        }

        return true;
    }),
];