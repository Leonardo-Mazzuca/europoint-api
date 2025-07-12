import { body } from "express-validator";

const projectCreateValidation = [
  body("area_id")
    .exists()
    .withMessage("area_id é obrigatório")
    .isInt({ gt: 0 })
    .withMessage("area_id deve ser um número inteiro positivo"),

  body("content")
    .exists()
    .withMessage("content é obrigatório")
    .isString()
    .withMessage("content deve ser uma string")
    .notEmpty()
    .withMessage("content não pode ser vazio"),

  body("title")
    .exists()
    .withMessage("title é obrigatório")
    .isString()
    .withMessage("title deve ser uma string")
    .notEmpty()
    .withMessage("title não pode ser vazio"),

  body("team_id")
    .exists()
    .withMessage("team_id é obrigatório")
    .isInt({ gt: 0 })
    .withMessage("team_id deve ser um número inteiro positivo"),

  body("members_ids")
    .exists()
    .withMessage("members_ids é obrigatório")
    .isArray({ min: 1 })
    .withMessage("members_ids deve ser um array com pelo menos um ID"),

  body("members_ids.*")
    .isInt({ gt: 0 })
    .withMessage("Cada member_id deve ser um número inteiro positivo"),

  body("image")
    .exists()
    .withMessage("image é obrigatório")
    .isURL()
    .withMessage("image deve ser uma URL válida"),
];

const projectEditValidation = [
  body("content")
    .optional()
    .isString()
    .withMessage("content deve ser uma string")
    .notEmpty()
    .withMessage("content não pode ser vazio"),

  body("title")
    .optional()
    .isString()
    .withMessage("title deve ser uma string")
    .notEmpty()
    .withMessage("title não pode ser vazio"),

  body("members_ids")
    .optional()
    .isArray({min:1})
    .withMessage("members_ids deve ser um array"),

  body("members_ids.*")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Cada member_id deve ser um número inteiro positivo"),

  body("image").optional().isURL().withMessage("image deve ser uma URL válida"),
];

export { projectCreateValidation, projectEditValidation };
