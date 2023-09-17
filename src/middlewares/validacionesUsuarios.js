let express = require ("express");
const { check } = require('express-validator');
const multer = require("multer");

module.exports = [
    check("nombre").notEmpty().withMessage('Debe completar su nombre'),
    check("apellido").notEmpty().withMessage('Debe completar su apellido'),
    check("celular").notEmpty().withMessage('Debe completar su celular').isNumeric().withMessage('Debe ingresar solamente numeros'),
    check("email").notEmpty().withMessage('Debe completar su email').isEmail().withMessage("Debe ingresar un email valido"),
    check("password").isStrongPassword({minLength: 6, maxLength: 10, minUppercase: 0, minSymbols: 0, minNumbers: 2}).withMessage("La clave debe contener de 6 a 10 caracteres y al menos dos numeros"),
    check('imagen').custom((value, { req }) => {
       
        if (req.fileError) {
            throw new Error('Adjunte una imagen válida');
        }

        if (req.file.size >= (1024 * 1024 * 10)) {
            throw new Error('La imagen es demasiado grande. Debe ser menor a 10 megabytes.');
        }

        return true
    }),
];

