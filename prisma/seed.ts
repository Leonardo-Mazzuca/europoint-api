import { db } from "../src/utils/db.server";
import * as UserService from "../src/service/user-service";
import { hash } from "bcrypt";
import { ProjectStatus } from "@prisma/client";
const createQuizzes = async () => {
  const quizzes = [
    {
      title: "Quiz CLIC",
      description: "Programa CLIC - Conecte, Lance Ideias e Colabore",
      duration: "15min",
      image: "/programs/clic.png",
      questions: [
        {
          title: "Qual é o principal objetivo do programa CLIC?",
          correct_answer:
            "Estimular os colaboradores a enviarem ideias para melhorar a empresa",
          total_points: 20,
          options: [
            {
              title: "Promover competições esportivas",
              answer: "Promover competições esportivas",
            },
            {
              title:
                "Estimular os colaboradores a enviarem ideias para melhorar a empresa",
              answer:
                "Estimular os colaboradores a enviarem ideias para melhorar a empresa",
            },
            {
              title: "Organizar festas internas",
              answer: "Organizar festas internas",
            },
          ],
        },
        {
          title: "Onde os colaboradores podem acessar o CLIC?",
          correct_answer: "Na intranet da empresa, na aba 'Inovação e Ideias'",
          total_points: 20,
          options: [
            { title: "No grupo de WhatsApp", answer: "No grupo de WhatsApp" },
            {
              title: "Na intranet da empresa, na aba 'Inovação e Ideias'",
              answer: "Na intranet da empresa, na aba 'Inovação e Ideias'",
            },
            {
              title: "Somente por e-mail para o RH",
              answer: "Somente por e-mail para o RH",
            },
          ],
        },
        {
          title: "Como as ideias enviadas pelo CLIC são avaliadas?",
          correct_answer: "Por um comitê formado por líderes e especialistas",
          total_points: 20,
          options: [
            { title: "Por votação aleatória", answer: "Por votação aleatória" },
            {
              title: "Por um comitê formado por líderes e especialistas",
              answer: "Por um comitê formado por líderes e especialistas",
            },
            { title: "Pelo setor de compras", answer: "Pelo setor de compras" },
          ],
        },
        {
          title:
            "Qual o prazo médio para receber retorno sobre uma ideia enviada no CLIC?",
          correct_answer: "Até 15 dias úteis",
          total_points: 20,
          options: [
            { title: "Até 3 dias úteis", answer: "Até 3 dias úteis" },
            { title: "Até 15 dias úteis", answer: "Até 15 dias úteis" },
            { title: "Até 45 dias", answer: "Até 45 dias" },
          ],
        },
        {
          title: "Qual é o tipo de prêmio dado às melhores ideias no CLIC?",
          correct_answer: "Premiação em dinheiro e reconhecimento interno",
          total_points: 20,
          options: [
            { title: "Viagem internacional", answer: "Viagem internacional" },
            {
              title: "Premiação em dinheiro e reconhecimento interno",
              answer: "Premiação em dinheiro e reconhecimento interno",
            },
            { title: "Dia de folga extra", answer: "Dia de folga extra" },
          ],
        },
        {
          title:
            "Qual é a frequência das rodadas de avaliação de ideias no CLIC?",
          correct_answer: "Mensal",
          total_points: 20,
          options: [
            { title: "Diária", answer: "Diária" },
            { title: "Mensal", answer: "Mensal" },
            { title: "Anual", answer: "Anual" },
          ],
        },
      ],
    },
    {
      title: "Quiz KAIZEN",
      description: "Programa KAIZEN - Melhoria Contínua",
      duration: "15min",
      image: "/programs/kaizen.png",
      questions: [
        {
          title: "O que significa 'Kaizen' no contexto do programa?",
          correct_answer: "Melhoria contínua nos processos",
          total_points: 20,
          options: [
            {
              title: "Inovação tecnológica radical",
              answer: "Inovação tecnológica radical",
            },
            {
              title: "Melhoria contínua nos processos",
              answer: "Melhoria contínua nos processos",
            },
            { title: "Campanha de marketing", answer: "Campanha de marketing" },
          ],
        },
        {
          title: "Quem pode participar do KAIZEN?",
          correct_answer: "Todos os colaboradores da empresa",
          total_points: 20,
          options: [
            { title: "Somente líderes", answer: "Somente líderes" },
            { title: "Somente o RH", answer: "Somente o RH" },
            {
              title: "Todos os colaboradores da empresa",
              answer: "Todos os colaboradores da empresa",
            },
          ],
        },
        {
          title: "Onde as sugestões do KAIZEN devem ser registradas?",
          correct_answer:
            "No portal interno, na seção 'Kaizen - Envie sua Sugestão'",
          total_points: 20,
          options: [
            {
              title: "Em uma urna física na recepção",
              answer: "Em uma urna física na recepção",
            },
            {
              title:
                "No portal interno, na seção 'Kaizen - Envie sua Sugestão'",
              answer:
                "No portal interno, na seção 'Kaizen - Envie sua Sugestão'",
            },
            { title: "Via mensagem no Teams", answer: "Via mensagem no Teams" },
          ],
        },
        {
          title: "Qual o principal benefício para quem participa do KAIZEN?",
          correct_answer: "Reconhecimento e implementação das ideias",
          total_points: 20,
          options: [
            { title: "Bônus de férias", answer: "Bônus de férias" },
            {
              title: "Reconhecimento e implementação das ideias",
              answer: "Reconhecimento e implementação das ideias",
            },
            { title: "Viagem de negócios", answer: "Viagem de negócios" },
          ],
        },
        {
          title:
            "Com que frequência são feitas reuniões de feedback no KAIZEN?",
          correct_answer: "A cada 2 meses",
          total_points: 20,
          options: [
            { title: "Semanalmente", answer: "Semanalmente" },
            { title: "A cada 2 meses", answer: "A cada 2 meses" },
            { title: "Uma vez por ano", answer: "Uma vez por ano" },
          ],
        },
        {
          title: "O KAIZEN incentiva ideias para:",
          correct_answer: "Reduzir desperdícios e aumentar a eficiência",
          total_points: 20,
          options: [
            { title: "Organizar festas", answer: "Organizar festas" },
            {
              title: "Reduzir desperdícios e aumentar a eficiência",
              answer: "Reduzir desperdícios e aumentar a eficiência",
            },
            {
              title: "Criar novas redes sociais",
              answer: "Criar novas redes sociais",
            },
          ],
        },
      ],
    },
    {
      title: "Quiz SIMPLIFICA",
      description: "Programa SIMPLIFICA - Processos Mais Ágeis",
      duration: "15min",
      image: "/programs/simplifica.png",
      questions: [
        {
          title: "Qual é a missão do programa SIMPLIFICA?",
          correct_answer:
            "Tornar processos internos mais rápidos e menos burocráticos",
          total_points: 20,
          options: [
            { title: "Criar novos cargos", answer: "Criar novos cargos" },
            {
              title:
                "Tornar processos internos mais rápidos e menos burocráticos",
              answer:
                "Tornar processos internos mais rápidos e menos burocráticos",
            },
            {
              title: "Organizar eventos anuais",
              answer: "Organizar eventos anuais",
            },
          ],
        },
        {
          title: "Como enviar uma sugestão para o SIMPLIFICA?",
          correct_answer: "Pelo formulário online no portal interno",
          total_points: 20,
          options: [
            {
              title: "Por ligação para o gestor",
              answer: "Por ligação para o gestor",
            },
            {
              title: "Pelo formulário online no portal interno",
              answer: "Pelo formulário online no portal interno",
            },
            { title: "Em um caderno na copa", answer: "Em um caderno na copa" },
          ],
        },
        {
          title: "Qual área lidera o programa SIMPLIFICA?",
          correct_answer: "Gerência de Processos e Qualidade",
          total_points: 20,
          options: [
            { title: "Marketing", answer: "Marketing" },
            {
              title: "Gerência de Processos e Qualidade",
              answer: "Gerência de Processos e Qualidade",
            },
            { title: "RH", answer: "RH" },
          ],
        },
        {
          title: "Qual tipo de sugestão o SIMPLIFICA prioriza?",
          correct_answer: "Sugestões que reduzam tempo e custo em processos",
          total_points: 20,
          options: [
            {
              title: "Sugestões para aumentar redes sociais",
              answer: "Sugestões para aumentar redes sociais",
            },
            {
              title: "Sugestões que reduzam tempo e custo em processos",
              answer: "Sugestões que reduzam tempo e custo em processos",
            },
            {
              title: "Sugestões para mudar o logotipo",
              answer: "Sugestões para mudar o logotipo",
            },
          ],
        },
        {
          title: "Como é feito o acompanhamento das ideias no SIMPLIFICA?",
          correct_answer: "Através de relatórios mensais no portal",
          total_points: 20,
          options: [
            {
              title: "Por e-mail somente para líderes",
              answer: "Por e-mail somente para líderes",
            },
            {
              title: "Através de relatórios mensais no portal",
              answer: "Através de relatórios mensais no portal",
            },
            { title: "Por reuniões anuais", answer: "Por reuniões anuais" },
          ],
        },
        {
          title:
            "Qual é o prazo para avaliação das ideias enviadas ao SIMPLIFICA?",
          correct_answer: "Até 20 dias úteis",
          total_points: 20,
          options: [
            { title: "Até 5 dias úteis", answer: "Até 5 dias úteis" },
            { title: "Até 20 dias úteis", answer: "Até 20 dias úteis" },
            { title: "Até 60 dias", answer: "Até 60 dias" },
          ],
        },
      ],
    },
  ];

  quizzes.forEach(async (quiz) => {
    const { description, duration, questions, title, image } = quiz;

    const createdQuiz = await db.quiz.create({
      data: {
        title,
        description,
        duration,
        image,
      },
    });

    for (const question of questions) {
      const createdQuestion = await db.question.create({
        data: {
          title: question.title,
          correct_answer: question.correct_answer,
          quiz: { connect: { id: createdQuiz.id } },
          total_points: question.total_points,
        },
      });

      for (const option of question.options) {
        await db.questionOption.create({
          data: {
            title: option.title,
            answer: option.answer,
            question: { connect: { id: createdQuestion.id } },
          },
        });
      }
    }
  });
};

async function seed() {
  await db.area.createMany({
      data: [
        {
          name: "TI",
          contact_email: "ti@eurofarma.com",
        },
        {
          name: "RH",
          contact_email: "rh@eurofarma.com",
        },
        {
          name: "Marketing",
          contact_email: "marketing@eurofarma.com",
        },
        {
          name: "Comercial",
          contact_email: "comercial@eurofarma.com",
        },
        {
          name: "Financeiro",
          contact_email: "financeiro@eurofarma.com",
        },
        {
          name: "Logistica",
          contact_email: "logistica@eurofarma.com",
        },
        {
          name: "Compras",
          contact_email: "compras@eurofarma.com",
        },
        {
          name: "Qualidade",
          contact_email: "qualidade@eurofarma.com",
        },
      ]
  });

  const tiArea = await db.area.findFirst();
  const rhArea = await db.area.findFirst({ where: { name: "RH" } });
  const qualityArea = await db.area.findFirst({ where: { name: "Qualidade" } });
  const epiArea = await db.area.findFirst({ where: { name: "Logistica" } });
  const marketingArea = await db.area.findFirst({
    where: { name: "Marketing" },
  });

  if (!tiArea || !marketingArea || !rhArea || !qualityArea || !epiArea) return;

   const encryptedPass = await hash("123456",10);

   await UserService.createManyUsers(
    [
      {area_id:tiArea.id, email: "mazzu@eurofarma.com", password: encryptedPass, username: "Mazzuca", phone_number: "123456789"},
      {area_id:marketingArea.id, email: "livs@eurofarma.com", password: encryptedPass, username: "Livia Ga.", phone_number: "123456789"},
      {area_id:tiArea.id, email: "arthur@eurofarma.com", password: encryptedPass, username: "Arthur", phone_number: "123456789"},
      {area_id: marketingArea.id, email: "luis_miguel@eurofarma.com", password: encryptedPass, username: "Luis", phone_number: "123456789"},
      {area_id: tiArea.id, email: "sophia@eurofarma.com", password: encryptedPass, username: "Sophia", phone_number: "123456789"},
    ]
  );

  const mazzuca = await db.user.findFirst({
    where: { email: "mazzu@eurofarma.com" },
  });
  const livia = await db.user.findFirst({
    where: { email: "livs@eurofarma.com" },
  });
  const sophia = await db.user.findFirst({
    where: { email: "sophia@eurofarma.com" },
  });
  const arthur = await db.user.findFirst({
    where: { email: "arthur@eurofarma.com" },
  });
  const luis = await db.user.findFirst({
    where: { email: "luis_miguel@eurofarma.com" },
  });

  if (!mazzuca || !livia || !sophia || !arthur || !luis) return;

  await db.team.createMany({
    data: [
      {
        name: 'Grupo de TI',
        area_id: tiArea.id,
        members_ids: [mazzuca.id, sophia.id, arthur.id]
      },
      {
        name: 'Grupo de marketing',
        area_id: marketingArea.id,
        members_ids: [livia.id, luis.id]
      }
    ]
  })

  const firstTeam = await db.team.findFirst();
  const secondTeam = await db.team.findFirst({ where: { name: "Grupo de marketing" } });
  
  if(!firstTeam || !secondTeam) return;
  await db.program.createMany({
    data: [
      {
        title: "CLIC",
        description:
          "O CLIC é um sistema interno voltado para comunicação e registro de informações corporativas, permitindo que colaboradores e gestores compartilhem atualizações, comunicados e documentos de forma centralizada. \n\nBenefícios: Melhora a comunicação interna, reduz erros de informação e mantém todos alinhados sobre as mudanças na empresa.\n\nTutorial de acesso:\n1. Acesse o portal interno pelo link: https://intranet.empresa.com/clic\n2. Faça login com seu usuário e senha corporativos.\n3. No menu lateral, clique em 'Comunicados' para ler as últimas atualizações.\n4. Use a opção 'Novo Registro' para adicionar comunicados ou documentos.\n5. Salve e confirme para que todos possam visualizar.\n\nMais informações: https://suporte.empresa.com/clic",
        image: "/programs/clic.png"
      },
      {
        title: "KAIZEN",
        description:
          "O KAIZEN é uma ferramenta de melhoria contínua que permite registrar sugestões, acompanhar indicadores de performance e implementar otimizações nos processos. \n\nBenefícios: Incentiva a inovação interna, melhora a eficiência operacional e reconhece colaboradores que trazem boas ideias.\n\nTutorial de acesso:\n1. Acesse o sistema pelo link: https://intranet.empresa.com/kaizen\n2. Entre com seu usuário e senha corporativos.\n3. Clique em 'Nova Sugestão' para registrar uma ideia de melhoria.\n4. Detalhe a proposta, anexando documentos ou imagens, se necessário.\n5. Acompanhe o status da sua sugestão na aba 'Minhas Ideias'.\n\nMais informações: https://suporte.empresa.com/kaizen",
        image: "/programs/kaizen.png"
      },
      {
        title: "SIMPLIFICA",
        description:
          "O SIMPLIFICA é um sistema criado para facilitar processos burocráticos e automatizar tarefas repetitivas, como aprovações, solicitações e relatórios. \n\nBenefícios: Reduz o tempo gasto com tarefas administrativas, aumenta a produtividade e garante mais agilidade nos fluxos internos.\n\nTutorial de acesso:\n1. Entre no portal: https://intranet.empresa.com/simplifica\n2. Faça login com suas credenciais corporativas.\n3. Selecione o processo que deseja agilizar no painel principal.\n4. Preencha as informações solicitadas e clique em 'Enviar'.\n5. Acompanhe o andamento na aba 'Meus Processos'.\n\nMais informações: https://suporte.empresa.com/simplifica",
        image: "/programs/simplifica.png"
      },
    ],
    skipDuplicates: true
  });

  //create demo posts
  await Promise.all([
    db.post.create({
      data: {
        content:
          "O sistema de vendas estará indisponível no dia 15/08, das 22h às 23h, para manutenção preventiva.",
        area_id: tiArea.id,
        user_id: mazzuca.id,
        is_demo: true,
        images: {
          create: {
            path: "/demo/posts/post-demo-1.jpg",
          },
        },
      },
    }),
    db.post.create({
      data: {
        content:
          "O RH informa que a campanha de vacinação contra a gripe será realizada no dia 20/08, das 9h às 17h, na sala de treinamentos.",
        area_id: rhArea.id,
        user_id: sophia.id,
        is_demo: true,
      },
    }),
    db.post.create({
      data: {
        content:
          "A partir do próximo mês, todos os acessos aos sistemas internos deverão ser autenticados com duplo fator de verificação.",
        area_id: tiArea.id,
        user_id: livia.id,
        is_demo: true,
      },
    }),
    db.post.create({
      data: {
        content:
          "A área de Qualidade convida todos os colaboradores para o treinamento obrigatório sobre Boas Práticas de Fabricação no dia 25/08.",
        area_id: qualityArea.id,
        user_id: mazzuca.id,
        is_demo: true,
        images: {
          create: {
            path: "/demo/posts/post-demo-2.jpg",
          },
        },
      },
    }),
    db.post.create({
      data: {
        content:
          "Todos os colaboradores que utilizam equipamentos de proteção individual devem comparecer ao almoxarifado até 18/08 para a troca obrigatória.",
        area_id: epiArea.id,
        user_id: mazzuca.id,
        is_demo: true,
      },
    }),
  ]);

  //create demo newsletters

  await Promise.all([
    db.newsLetter.create({
      data: {
        title: "Lançamento do Novo Medicamento CardioLife",
        content:
          "É com grande satisfação que anunciamos o lançamento do CardioLife, nosso novo medicamento voltado para o tratamento de doenças cardiovasculares. Após 4 anos de pesquisa e desenvolvimento, o produto apresentou resultados expressivos em estudos clínicos, oferecendo maior eficácia e menor incidência de efeitos colaterais em comparação às terapias convencionais. O CardioLife estará disponível no mercado a partir de 15/09, e nossa equipe de marketing já está preparando campanhas educativas para médicos e pacientes. Este é um marco importante para a nossa empresa e reforça nosso compromisso com a inovação e a saúde.",
        area_id: 5,
        is_demo: true,
        user_id: mazzuca.id,
      },
    }),
    db.newsLetter.create({
      data: {
        title: "Destaques do Mês – Agosto 2025",
        content:
          "O mês de agosto foi repleto de conquistas para a nossa organização. Entre os principais destaques, registramos um crescimento de 12% nas vendas nacionais, impulsionado pela boa aceitação de nossos novos suplementos vitamínicos. Também renovamos a certificação ISO 9001, reafirmando nosso compromisso com a qualidade. Além disso, fechamos novos contratos com distribuidores na América Latina, ampliando nossa presença internacional. Agradecemos a todos os colaboradores que contribuíram para este resultado, mostrando que o trabalho em equipe é a base do nosso sucesso.",
        area_id: 6,
        is_demo: true,
        user_id: mazzuca.id,
        images: {
          create: {
            path: "/demo/newsletter/newsletter-demo.jpg",
          },
        }
      },
    }),
    db.newsLetter.create({
      data: {
        title: "Visão Estratégica – Entrevista com o CEO",
        content:
          "Em uma entrevista exclusiva para nossa newsletter, nosso CEO, Dr. Ricardo Almeida, compartilhou a visão da empresa para os próximos cinco anos. Entre as prioridades estão a ampliação do portfólio de medicamentos genéricos, a entrada em novas áreas terapêuticas e o fortalecimento da presença digital com serviços de teleatendimento. Ele destacou ainda a importância de manter investimentos robustos em pesquisa e inovação, bem como a valorização de nossos talentos internos. Segundo o CEO, 'o futuro do setor farmacêutico está diretamente ligado à personalização do tratamento e à integração da tecnologia com a saúde'.",
        area_id: 6,
        is_demo: true,
        user_id: mazzuca.id,
        images: {
          create: {
            path: "/demo/newsletter/newsletter-demo.jpg",
          },
        }
      },
    }),
    db.newsLetter.create({
      data: {
        title: "Especial Saúde – Como Fortalecer a Imunidade no Inverno",
        content:
          "Com as temperaturas mais baixas, aumentam os riscos de gripes, resfriados e outras doenças respiratórias. Pensando nisso, nossa equipe de especialistas reuniu algumas orientações para manter sua saúde em dia. Uma alimentação balanceada, rica em frutas cítricas, vegetais verde-escuros e proteínas magras, é essencial para o bom funcionamento do sistema imunológico. A prática regular de exercícios físicos, aliada a um sono de qualidade, também contribui para a resistência do organismo. Não se esqueça de manter a hidratação, mesmo em dias frios, e de atualizar sua carteira de vacinação. Pequenos hábitos podem fazer uma grande diferença para a sua saúde e bem-estar.",
        area_id: 7,
        is_demo: true,
        user_id: mazzuca.id,
        images: {
          create: {
            path: "/demo/newsletter/newsletter-demo.jpg",
          },
        }
      },
    }),
    db.newsLetter.create({
      data: {
        title: "Novos Talentos – Bem-vindos à Nossa Equipe",
        content:
          "Neste mês, tivemos a satisfação de receber novos profissionais que chegam para somar ao nosso time. São eles: Mariana Souza (Marketing), Lucas Pereira (Pesquisa e Desenvolvimento), Fernanda Lima (Qualidade) e Roberto Martins (TI). Cada um traz consigo experiências valiosas que certamente contribuirão para os nossos projetos futuros. Aproveitamos para informar que ainda estamos com vagas abertas nas áreas de logística, vendas e farmacovigilância. Interessados devem encaminhar currículo para o e-mail recrutamento@empresa.com até o dia 30/08.",
        area_id: 2,
        is_demo: true,
        user_id: mazzuca.id,
        images: {
          create: {
            path: "/demo/newsletter/newsletter-demo.jpg",
          },
        }
      },
    }),
  ]);

  //create projects demo

  await Promise.all([
    db.project.create({
      data: {
        area_id: tiArea.id,
        title: "Projeto Sistema Integrado de Estoque",
        content:
          "Estamos na fase final do desenvolvimento do novo sistema de gestão de estoque, que integrará informações da fábrica e dos centros de distribuição em tempo real. O objetivo é reduzir perdas e otimizar a reposição de insumos.",
        team_id: firstTeam.id,
        image: {
          create: {
            path: "/demo/project/project-demo.jpg",
          },
        },
        members_ids: [livia.id],
        user_id: mazzuca.id,
        is_demo: true
      },
    }),
    db.project.create({
      data: {
        area_id: tiArea.id,
        title: "Projeto Portal de Benefícios",
        content:
          "O time de RH está implementando um novo portal de benefícios, onde os colaboradores poderão consultar e gerenciar seus benefícios de forma simples e rápida, inclusive pelo celular.",
        team_id: firstTeam.id,
        image: {
          create: {
            path: "/demo/project/project-demo.jpg",
          },
        },
        members_ids: [livia.id],
        user_id: mazzuca.id,
        is_demo: true
      },
    }),
    db.project.create({
      data: {
        area_id: tiArea.id,
        title: "Projeto Automação do Envase",
        content:
          "A fábrica iniciou um projeto para automatizar parte da linha de envase, aumentando a produtividade e garantindo mais precisão na dosagem dos produtos.",
        team_id: firstTeam.id,
        image: {
          create: {
            path: "/demo/project/project-demo.jpg",
          },
        },
        members_ids: [livia.id],
        user_id: mazzuca.id,
        is_demo: true
      },
    }),
    db.project.create({
      data: {
        area_id: tiArea.id,
        title: "Projeto Dashboard de Indicadores",
        content:
          "Estamos desenvolvendo um dashboard de indicadores para acompanhamento de KPIs em tempo real, permitindo que líderes e gestores tenham acesso a dados estratégicos de forma rápida e visual.",
        team_id: firstTeam.id,
        image: {
          create: {
            path: "/demo/project/project-demo.jpg",
          },
        },
        members_ids: [livia.id],
        status: ProjectStatus.FINISHED,
        user_id: mazzuca.id,
        is_demo: true
      },
    }),
    db.project.create({
      data: {
        area_id: tiArea.id,
        title: "Projeto App de Comunicação Interna",
        content:
          "O departamento de Comunicação está criando um novo aplicativo interno para engajamento, onde os colaboradores poderão interagir, enviar sugestões e acompanhar novidades da empresa.",
        team_id: firstTeam.id,
        image: {
          create: {
            path: "/demo/project/project-demo.jpg",
          },
        },
        members_ids: [livia.id],
        user_id: mazzuca.id,
        is_demo: true
      },
    }),
  ]);
  

  const quizzes = await db.quiz.findMany({where: {title: "Quiz CLIC", OR: [{title: "Quiz KAIZEN"}, {title: "Quiz SIMPLIFICA"}]}});

  if(!quizzes.length) {
    await createQuizzes();
  }
}

seed();
