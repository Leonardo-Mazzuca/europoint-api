import { db } from "../src/utils/db.server";

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
  });
}

seed();
