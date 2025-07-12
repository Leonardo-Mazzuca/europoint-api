
import { db } from "../src/utils/db.server";


async function seed() {
    
    const area = await db.area.create({
        data: {
            name: "TI",
            contact_email: "ti@eurofarma.com",
        }
    });

    await db.user.create({
        data: {
            email: "macucu12@email.com",
            password: "123456",
            phone_number: "1111111",
            username: "macucu",
            area: {
                connect: {
                    id: area.id,
                }
            }
        }
    })

    await db.team.create({
        data: {
            name: 'Grupo de TI',
            area_id: 1,
            members_ids: [1,2]
        }
    })
}

seed();