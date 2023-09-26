const { check } = require('express-validator');

module.exports = [
    check('nombre').optional().notEmpty().withMessage('Escribí el nombre').trim(),
    check('precio').optional().isInt({gt:0}).withMessage('Indicá el precio'),
    check('cantidad').optional().isFloat({min: 1, max: 100}).withMessage('Indica una cantidad menor a 100'),
    check('codigo').optional().notEmpty().withMessage('Indicá el codigo'),
    check('descripcion').optional().isLength({min: 5, max: 100}).withMessage("Debe contener de 5 a 100 caracteres"),
    check('id_productoCat').optional().custom((value, { req }) => {
        if (value === -1 || value === '') {
            throw new Error('Selecciona una categoría válida');
        }
        return true;
    }),
    check('desc2').optional().isLength({min: 20, max: 1500}).withMessage("Debe contener de 20 a 1500 caracteres"),    
    check('imagen').optional().custom((value, { req }) => {
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