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

  body("user_id")
    .notEmpty()
    .withMessage("ID do usuário é obrigatório")
    .isInt({ gt: 0 })
    .withMessage("user_id deve ser um número inteiro positivo"),

  body("images")
    .isArray({ min: 1 })
    .withMessage("Images deve ser um array com pelo menos uma imagem"),

  body("images.*")
    .isString()
    .withMessage("Cada imagem deve ser uma string (URL ou caminho)"),
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

  body("images").optional().isArray({min:1}).withMessage("Images deve ser um array"),

  body("images.*")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Cada imagem deve ser uma string (URL ou caminho)"),
];

export { postCreateValidation, postEditValidation };
