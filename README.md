# NodeJS Application

## Instructions

### 1. Install Dependencies

```bash
# NPM 
> npm i -D typescript @types/node ts-node-dev nodemon rimraf

# YARN
> yarn add -D typescript @types/node ts-node-dev nodemon rimraf

# PNPM
> pnpm i -D typescript @types/node ts-node-dev nodemon rimraf

# BUN
> bun i -D typescript @types/node ts-node-dev nodemon rimraf
```

### 2. Create Node Configuration File

```bash
> touch nodemon.json
```

### 3. Edit nodemon.json and put the following code:

```json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "npx ts-node-dev --inspect -- ./src/app.ts"
}
```

### 4. Initialize Typescript Configuration:

```bash
> npx tsc --init --outDir dist/ --rootDir src/
```

### 5. Modify ```tsconfig.json```:

```json
"compilerOptions": {
  // previous configuration ...
  "include": ["src/**/*"],
  "exclude": [
    "node_modules",
    "test/**/*.spec.ts",
    "test/**/*.test.ts",
  ],
}
```

### 6. Create ```src/``` folder:

```bash
> mkdir src
```

### 7. Create ```app.ts``` file inside ```src/``` folder:

```bash
> touch src/app.ts
> echo 'console.log("NodeJs Running")' > src/app.ts
```

### 8. Modify ```package.json``` and replace the following code with:

```json
"name": "name-of-your-application",
"version": "0.0.0",
"description": "Some custom description here.",
// ...
"main": "app.js",
// ...
"scripts": {
  "dev": "ts-node-dev --inspect -- src/app.ts",
  "dev:nodemon": "nodemon",
  "build": "rimraf ./dist && && tsc",
  "start": "npm run build && node dist/app.js"
},
// ...
"author": "Your name here",
// ...
"license": "UNLICENSED",
```

### 9. Create and edit ```.gitignore```

```bash
> touch .gitignore
```

**Ignore the necessary folders and files:**

```
node_modules/
dist/
```

### 10. Run Development:

```bash
# NPM
> npm run dev

# YARN
> yarn dev

# PNPM
> pnpm dev

# BUN
> bun dev
```

**Now the server will run something similar:**

```bash
[nodemon] watching extensions: ts,js
[nodemon] starting `npx ts-node-dev --inspect -- ./src/app.ts`
[INFO] 22:30:12 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.2, typescript ver. 5.3.3)
Debugger listening on ws://127.0.0.1:9229/94639663-8da0-4a7b-b178-9ce8b2e00d7f
For help, see: https://nodejs.org/en/docs/inspector
NodeJs Running
[nodemon] clean exit - waiting for changes before restart
```

### 11. Don't forget to initialize ```GIT```:

```bash
> git init
> git add .
> git commit -m "initial-configuration"
> git tag 0.0.0
```

**NOTE: git tags are useful to keep track semantic versioning with package.json.**

**So don't forget to update this number accordingly with your version:**

```json
{
  // ...
  "version": "0.0.0",
  // ...
}
```

### 12. Install ```YARGS```

```bash
# NPM
> npm install yargs @types/yargs

# YARN
> yarn add yargs @types/yargs

# PNPM
> pnpm add yargs @types/yargs

# BUN
> bun add yargs @types/yargs
```

### 13. Install testing dependencies

```bash
# NPM
> npm install jest @types/jest ts-jest supertest

# YARN
> yarn add jest @types/jest ts-jest supertest

# PNPM
> pnpm add jest @types/jest ts-jest supertest

# BUN
> bun add jest @types/jest ts-jest supertest
```

### 14. Create jest configuration file.

```bash
> npx jest --init
```

### 15. Configure ```jest.config.ts```.

```typescript
const config: Config = {
  // ...

  preset: ts-jest,
  testEnvironment: 'jest-environment-node',

  // Optional - The paths for modules that run some
  // code to configure or set up the testing
  // environment for each test.

  // setupFiles: ['dotenv/config'],
}
```

### 16. Create scripts for testing in ```package.json```

```json
{
  // ...
  "scripts": [
    // ...
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  ],
  // ...
}
````