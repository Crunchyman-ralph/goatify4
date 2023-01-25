# Goatify Frontend

This **web app** was implemented with the following stack:

- [**Next.js**](https://nextjs.org/docs): Open-source web development framework built on top of Node.js enabling React-based web applications functionalities such as server-side rendering and generating static websites
- [**NextAuth.js**](https://next-auth.js.org/getting-started/introduction): Complete open-source authentication solution for Next.js applications.
- [**TypeScript**](https://www.typescriptlang.org/): Strongly typed programming language that builds on JavaScript
- [**Apollo Client**](https://www.apollographql.com/docs/react/): GraphQL client for React
- [**GraphQL Code Generator**](https://www.graphql-code-generator.com/docs/getting-started): Generate code from GraphQL schema
- [**Tailwind CSS**](https://tailwindcss.com/): A utility-first CSS framework for styled components
- [**daisyUI**](https://daisyui.com/): A Tailwind CSS component library

This project follows the **NRN file structure**. Check out [this link](https://unlyed.github.io/next-right-now/reference/folder-structure) for more information.

## Getting Started

### 1. Clone repo and install dependencies

Install dependencies:

```
yarn install
```

Enable Git hooks:
```
yarn husky install
```

### 2. Create the .env file

Duplicate the .env.example and rename it to .env, then customize the variables values.

```
NEXTAUTH_URL="http://localhost:3000"
PUBLIC_URL="http://localhost:3000"
BACKEND_URL="http://localhost:4000"
```

### 3. Start the app

Launch your next.js app with this command:

```
yarn dev
```

Navigate to [http://localhost:3000](http://localhost:3000) in your browser to explore the app. To connect, you will need to have the goatify backend running.
# goatify4
