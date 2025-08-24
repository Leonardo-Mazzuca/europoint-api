import { db } from "../src/utils/db.server";

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

  quizzes.forEach(async quiz => {
    const {description,duration,questions,title, image} = quiz;

    const createdQuiz = await db.quiz.create({
      data: {
        title,
        description,
        duration,
        image
      },
    });

    for (const question of questions) {
      const createdQuestion = await db.question.create({
        data: {
          title: question.title,
          correct_answer: question.correct_answer,
          quiz: { connect: { id: createdQuiz.id } },
          total_points: question.total_points
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
  // const area = await db.area.create({
  //     data: {
  //         name: "TI",
  //         contact_email: "ti@eurofarma.com",
  //     }
  // });

  // await db.user.create({
  //     data: {
  //         email: "macucu12@email.com",
  //         password: "123456",
  //         phone_number: "1111111",
  //         username: "macucu",
  //         area: {
  //             connect: {
  //                 id: area.id,
  //             }
  //         }
  //     }
  // })

  // await db.team.create({
  //     data: {
  //         name: 'Grupo de TI',
  //         area_id: 1,
  //         members_ids: [1,2]
  //     }
  // });

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

  const quizzes = await db.quiz.findMany({where: {title: "Quiz CLIC", OR: [{title: "Quiz KAIZEN"}, {title: "Quiz SIMPLIFICA"}]}});

  if(!quizzes.length) {
    await createQuizzes();
  }
  
}

seed();
