import jwt from "jsonwebtoken";
import { Request,Response } from "express";
import { validationResult } from "express-validator";
import { Prisma } from "@prisma/client";
import { db } from "../utils/db.server";

const decodeToken = async (req: Request) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    throw new Error("Token not provided!");
  }

  try {
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as { user_id: number };
    return decoded.user_id
    
  } catch (error) {
    throw new Error("Invalid token");
  }
};

const verifyErrors = (req:Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
}

const createAchieviments = async (user_id: number) => {

  const userAlreadyHavedAchieviments = await db.user.findFirst({where: {id: user_id, achieviments: {some: {}}}});

  if(userAlreadyHavedAchieviments) {
    return;
  }

  const achieviments: Prisma.AchievimentCreateWithoutUserInput[] = [
    {
      title: "Olá, Você por aqui?",
      description: "Fez login pela primeira vez",
      points: 10
    },
    {
      title: "404: Erros encontrados!",
      description: "Acertou todas as perguntas do quiz",
      points: 100
    },
    {
      title: "São dias e dias...",
      description: "Errou uma questão do quiz pela primeira vez",
      points: 10
    },
    {
      title: "O primeiro de muitos!",
      description: "Cadastrou um tipo de post",
      points: 50
    },
    {
      title: "Daqui a pouco vai acabar a memória!",
      description: "Cadastrou 10 tipos de posts",
      points: 200
    },
    {
      title: "Vai ficar famoso hein!",
      description: "Cadastrou 30 tipos de posts",
      points: 500,
    },
    {
      title: "Ta tudo bem querer mudar as vezes...",
      description: "Editou seus dados pela primeira vez",
      points: 10
    },
    {
      title: "Então você gosta de jogar?",
      description: "Jogou um quiz pela primeira vez",
      points: 50
    },
    {
      title: "Está ficando um expert!",
      description: "Jogou um quiz 5 vezes",
      points: 200
    },
    {
      title: "Quem é Einstein perto de você?",
      description: "Jogou um quiz 15 vezes",
      points: 500
    },
    {
      title: "Uma leitura sempre é boa...",
      description: "Finalizou de ler um programa",
      points: 50
    },
    {
      title: "Grande estudioso!",
      description: "Leu um tipo de programa 5 vezes",
      points: 250
    },
    {
      title: "Com toda certeza, você é o nerd do grupo...",
      description: "Leu um tipo de programa 15 vezes",
      points: 700
    },
    {
      title: "Há....então você precisa de uma ajuda?",
      description: "Perguntou uma questão para o bot de ajuda do quiz",
      points: 100
    },
    {
      title: "Há....então você precisa de uma ajuda?",
      description: "Perguntou uma questão para o bot de ajuda do quiz",
      points: 100
    },
    {
      title: "Amor é amor né...",
      description: "Logou no app durante 10 dias seguidos",
      points: 1000
    },
    {
      title: "O bom usuário",
      description: "Logou no app 50 dias seguidos",
      points: 5000
    },
    {
      title: "Parabéns, você está viciado!",
      description: "Logou no app 100 dias seguidos",
      points: 10000
    },
  ];

  await db.achieviment.createMany({
    data: achieviments.map((achieviment) => ({ ...achieviment, user_id })),
  });

  console.log('Conquistas cadastradas com sucesso!');

}

export {
    decodeToken,
    verifyErrors,
    createAchieviments
}
