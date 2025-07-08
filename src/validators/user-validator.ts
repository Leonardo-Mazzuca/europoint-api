import { body } from "express-validator";


const userEditValiation = [
    body('email').optional().isEmail().withMessage('Email inválido'),
    body('password').optional().isLength({ min: 6 }).withMessage('Senha inválida'),
    body('username').optional().notEmpty().withMessage('Nome de usuário obrigatório'),
    body('phone_number').optional().notEmpty().withMessage('Número de telefone obrigatório'),
]

export {
 userEditValiation
}