const { check } = require('express-validator');

module.exports = [
    check('nombre').notEmpty().withMessage('Escribí el nombre').trim(),
    check('precio').isInt({gt:0}).withMessage('Indicá el precio'),
    check('cantidad').isFloat({min: 1, max: 100}).withMessage('Indicá la cantidad, no podes superar las 100 unidades'),
    check('codigo').notEmpty().withMessage('Indicá el codigo'),
    check('descripcion').notEmpty().withMessage('Escribí una breve descripcion del producto'),
    check('id_productoCat').custom((value, { req }) => {
        if (value === -1 || value === '') {
            throw new Error('Selecciona una categoría válida');
        }
        return true;
    }),
    check('desc2').notEmpty().withMessage('Escribi toda la informacion del producto'),    
    check('img').custom((value, { req }) => {
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