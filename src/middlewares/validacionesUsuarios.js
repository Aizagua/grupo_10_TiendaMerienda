let express = require ("express");
const { body } = require('express-validator');
const multer = require("multer");

module.exports = [
    body("nombre").notEmpty().withMessage('Debe completar su nombre'),
    body("apellido").notEmpty().withMessage('Debe completar su apellido'),
    body("celular").notEmpty().withMessage('Debe completar su celular').isNumeric().withMessage('Debe ingresar solamente numeros'),
    body("email").notEmpty().withMessage('Debe completar su email').isEmail().withMessage("Debe ingresar un email valido"),
    body("password").isStrongPassword({minLength: 6, maxLength: 10, minUppercase: 0, minSymbols: 0, minNumbers: 2}).withMessage("La clave debe contener de 6 a 10 caracteres y al menos dos numeros"),
];

