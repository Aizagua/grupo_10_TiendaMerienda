const { check } = require('express-validator');

module.exports = [
    check('nombre').notEmpty().withMessage('Escribe tu nombre').trim(),
    check('precio').isInt({gt:0}).withMessage('Indica el precio'),
    check('cantidad').isInt({gt:0}).withMessage('Indica la cantidad'),
    check('codigo').notEmpty().withMessage('Indica el codigo'),
    check('descripcion').notEmpty().withMessage('Escribi una breve descripcion del producto'),
    check('id_productoCat').isInt({gt:0}).withMessage('Indica una categoria'),
    check('desc2').notEmpty().withMessage('Escribi toda la informacion del producto')
]