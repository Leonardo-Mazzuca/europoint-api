> © 2025 Tech's Version — Este projeto é de uso exclusivo do grupo Tech's Version.  
> Nenhuma cópia, modificação ou distribuição é permitida sem autorização prévia dos membros.

## 🇧🇷 PT-BR

👋 Olá, Eurofarma! Sejam muito bem-vindos à API do aplicativo [EuroPoint](https://github.com/Leonardo-Mazzuca/euro-point-app)

🔗 Essa API tem como função realizar a integração entre o aplicativo e o servidor, garantindo uma comunicação confiável entre cliente e backend.

🛠️ Tecnologias utilizadas:

- Prisma ORM para modelagem e queries do banco de dados
- PostgreSQL como banco de dados principal
- Insomnia para testes de endpoints
- Beekeeper para visualização e gerenciamento local de dados

🚀 Como rodar a API

1️⃣ Configure as variáveis de ambiente no arquivo .env.example

- O campo mais importante é a DATABASE_URL, que deve seguir este padrão:

```bash
database://username:password@localhost:port/db_name
```

📖 Veja mais detalhes na [documentação do Prisma](https://www.prisma.io/dataguide/postgresql/short-guides/connection-uris)

2️⃣ Instale as dependências:

```bash
npm i
```

3️⃣ Crie o banco de dados:

```bash
npx prisma db create
```

4️⃣ Rode a migration:

```bash
npx prisma migrate dev
```

5️⃣ Gere os arquivos do Prisma:

```bash
npx prisma generate
```

6️⃣ Execute o seed para popular o banco:

```bash
npx prisma db seed
```

7️⃣ Inicie a API:

```bash
npm run dev
```

A API estará rodando na porta configurada 🎉

📱 **Como rodar a API no emulador/dispositivo**

Como a API roda localmente, não é possível fazer requisições para localhost diretamente de um dispositivo ou emulador.
Para isso, utilizamos o [ngrok](https://ngrok.com/docs), que cria um túnel HTTPS acessível externamente.

1️⃣ Instale e configure o ngrok seguindo a documentação oficial

2️⃣ No terminal, execute:

```bash
ngrok http porta_da_api
```

3️⃣ Copie a URL gerada pelo ngrok e coloque no .env do projeto EuroPoint App

Agora o aplicativo mobile poderá se conectar à API ✅

## 🇺🇸 English

👋 Hello, Eurofarma! Welcome to the [EuroPoint](https://github.com/Leonardo-Mazzuca/euro-point-app) App API.

🔗 This API handles the integration between the mobile app and the server, enabling reliable client–backend communication.

🛠️ Tech stack:

- Prisma ORM for database modeling and queries
- PostgreSQL as the main database
- Insomnia for endpoint testing
- Beekeeper for local data visualization and management

🚀 How to run the API

1️⃣ Configure the environment variables in the .env.example file

- The most important one is DATABASE_URL, which must follow this pattern:

```bash
database://username:password@localhost:port/db_name
```

📖 Check [Prisma’s documentation](https://www.prisma.io/dataguide/postgresql/short-guides/connection-uris) for more details.

2️⃣ Install dependencies:

```bash
npm i
```

3️⃣ Create the database:

```bash
npx prisma db create
```

4️⃣ Run the migration:

```bash
npx prisma migrate dev
```

5️⃣ Generate Prisma files:

```bash
npx prisma generate
```

6️⃣ Seed the database:

```bash
npx prisma db seed
```

7️⃣ Start the API:

```bash
npm run dev
```

Your API will be running on the configured port 🎉

📱 **Running the API on an emulator/device**

Since the API runs locally, you cannot directly send requests to localhost from a device or emulator.
To solve this, we use [ngrok](https://ngrok.com/docs), which exposes a secure HTTPS tunnel.

1️⃣ Install and configure ngrok (see official docs)

2️⃣ Run in the terminal:

```bash
ngrok http your_api_port
```

3️⃣ Copy the generated ngrok URL and update the .env file in the EuroPoint App project

Now the mobile app can connect to the API ✅

## 🇪🇸 Español

👋 ¡Hola, Eurofarma! Bienvenidos a la API de la aplicación [EuroPoint](https://github.com/Leonardo-Mazzuca/euro-point-app)

🔗 Esta API se encarga de la integración entre la aplicación móvil y el servidor, permitiendo una comunicación confiable entre cliente y backend.

🛠️ Tecnologías utilizadas:

- Prisma ORM para modelado y consultas de la base de datos
- PostgreSQL como base de datos principal
- Insomnia para pruebas de endpoints
- Beekeeper para visualización y gestión local de datos

🚀 Cómo ejecutar la API

1️⃣ Configura las variables de entorno en el archivo .env.example

La más importante es DATABASE_URL, que debe seguir este formato:

```bash
database://username:password@localhost:port/db_name
```

📖 Consulta la [documentación de Prisma](https://www.prisma.io/dataguide/postgresql/short-guides/connection-uris) para más detalles.

2️⃣ Instala las dependencias:

```bash
npm i
```

3️⃣ Crea la base de datos:

```bash
npx prisma db create
```

4️⃣ Ejecuta la migración:

```bash
npx prisma migrate dev
```

5️⃣ Genera los archivos de Prisma:

```bash
npx prisma generate
```

6️⃣ Ejecuta el seed para poblar la base de datos:

```bash
npx prisma db seed
```

7️⃣ Inicia la API:

```bash
npm run dev
```

La API estará disponible en el puerto configurado 🎉

📱 Cómo ejecutar la API en un emulador/dispositivo

Como la API se ejecuta localmente, no es posible realizar solicitudes a localhost desde un dispositivo o emulador.
Para solucionarlo, usamos [ngrok](https://ngrok.com/docs), que expone un túnel HTTPS accesible externamente.

1️⃣ Instala y configura ngrok (ver documentación oficial)

2️⃣ En la terminal, ejecuta:

```bash
ngrok http puerto_de_la_api
```

3️⃣ Copia la URL generada por ngrok y colócala en el archivo .env del proyecto EuroPoint App

De esta forma, la aplicación móvil podrá conectarse a la API ✅

