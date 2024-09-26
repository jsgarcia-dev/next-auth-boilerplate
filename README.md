# next-auth-boilerplate

Este é um **boilerplate** para autenticação utilizando [Next.js](https://nextjs.org/) e [NextAuth.js](https://next-auth.js.org/). Este projeto serve como ponto de partida para aplicações que necessitam de funcionalidades de autenticação robustas e seguras.

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Visão Geral

O **next-auth-boilerplate** é uma base pronta para desenvolver aplicações web modernas com autenticação integrada. Utilizando as melhores práticas e ferramentas do ecossistema Next.js, este boilerplate facilita a configuração e personalização de funcionalidades de login, registro, proteção de rotas e gerenciamento de sessões.

## Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/):** Framework React para aplicações de renderização do lado do servidor e geração de sites estáticos.
- **[NextAuth.js](https://next-auth.js.org/):** Solução completa para autenticação em aplicações Next.js.
- **[TypeScript](https://www.typescriptlang.org/):** Superset do JavaScript que adiciona tipagem estática.
- **[Prisma](https://www.prisma.io/):** ORM para gerenciamento de banco de dados.
- **[Tailwind CSS](https://tailwindcss.com/):** Framework CSS utilitário para estilização rápida e responsiva.
- **[Vercel](https://vercel.com/):** Plataforma para deploy de aplicações Next.js.

## Funcionalidades

- **Autenticação:** Suporte a provedores de autenticação como GitHub, Google, e credenciais personalizadas.
- **Proteção de Rotas:** Páginas protegidas acessíveis apenas para usuários autenticados.
- **Gerenciamento de Sessões:** Sessões de usuário persistentes e seguras.
- **Integração com Banco de Dados:** Configuração simplificada com Prisma para operações de banco de dados.
- **Interface Responsiva:** Design responsivo utilizando Tailwind CSS.

## Instalação

1. **Clone o Repositório:**

   ```bash:/README.md
   git clone https://github.com/seu-usuario/next-auth-boilerplate.git
   cd next-auth-boilerplate
   ```

2. **Instale as Dependências:**

   ```bash:/README.md
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Configure as Variáveis de Ambiente:**

   Copie o arquivo `.env.example` para `.env` utilizando o comando abaixo:

   ```cp .env.example .env

   ```

4. **Configure o Banco de Dados:**

   Execute as migrações do Prisma para configurar o banco de dados:

   ```bash:/README.md
   npx prisma migrate dev --name init
   ```

## Como Usar

1. **Inicie o Servidor de Desenvolvimento:**

   ```bash:/README.md
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   # ou
   bun dev
   ```

2. **Acesse a Aplicação:**

   Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação em funcionamento.

3. **Autentique-se:**

   Utilize os provedores de autenticação configurados para fazer login e acessar as funcionalidades protegidas.

## Scripts Disponíveis

- **`npm run dev`** - Inicia o servidor de desenvolvimento.
- **`npm run build`** - Compila a aplicação para produção.
- **`npm run start`** - Inicia o aplicativo em modo de produção.
- **`npm run lint`** - Executa o linter para verificar padrões de código.
- **`npm run format`** - Formata o código utilizando Prettier.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir **issues** ou enviar **pull requests** para melhorar este boilerplate.

1. **Fork o Repositório**
2. **Crie uma Branch para sua Feature** (`git checkout -b feature/nova-feature`)
3. **Commit suas Alterações** (`git commit -m 'Adiciona nova feature'`)
4. **Push para a Branch** (`git push origin feature/nova-feature`)
5. **Abra um Pull Request**

## Licença

Este projeto está licenciado sob a [MIT License](./LICENSE).

---

Projeto criado com ❤️ por [Julio Garcia](https://github.com/jsgarcia-dev)
