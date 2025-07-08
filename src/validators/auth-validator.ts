import { body } from "express-validator";

const validateLogin = [
  body("email").isEmail().withMessage("Email inválido"),
  body("password").isString().withMessage("Senha obrigatória"),
];

const validateNewUser = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("username").notEmpty(),
  body("phone_number").notEmpty(),
  body("area_id").isNumeric().notEmpty(),
];

export {
    validateLogin,
    validateNewUser
}