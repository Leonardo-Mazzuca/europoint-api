import { body } from "express-validator";

const postCreateValidation = [
  body("title")
    .notEmpty()
    .withMessage("Título é obrigatório")
    .isString()
    .withMessage("Título deve ser uma string"),

  body("content")
    .notEmpty()
    .withMessage("Conteúdo é obrigatório")
    .isString()
    .withMessage("Conteúdo deve ser uma string"),

  body("area_id")
    .notEmpty()
    .withMessage("ID da área é obrigatório")
    .isInt({ gt: 0 })
    .withMessage("area_id deve ser um número inteiro positivo"),

];

const postEditValidation = [
  body("title")
    .optional()
    .isString()
    .withMessage("Título deve ser uma string")
    .notEmpty()
    .withMessage("Título não pode estar vazio"),

  body("content")
    .optional()
    .isString()
    .withMessage("Conteúdo deve ser uma string")
    .notEmpty()
    .withMessage("Conteúdo não pode estar vazio"),
];

export { postCreateValidation, postEditValidation };
