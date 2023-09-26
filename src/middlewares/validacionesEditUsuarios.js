let express = require ("express");
const { check } = require('express-validator');
const multer = require("multer");

module.exports = [
    check("nombre").optional().notEmpty().withMessage('Debe completar su nombre'),
    check("apellido").optional().notEmpty().withMessage('Debe completar su apellido'),
    check("celular").optional().notEmpty().withMessage('Debe completar su celular').isNumeric().withMessage('Debe ingresar solamente numeros'),
    check("email").optional().notEmpty().withMessage('Debe completar su email').isEmail().withMessage("Debe ingresar un email valido"),
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

