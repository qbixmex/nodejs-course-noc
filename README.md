# NodeJS Application

## Instructions

### 1.A Install Production Dependencies

```bash
npm i -D yargs cron
```

### 1.B Install Dev Dependencies

```bash
npm i -D @types/node @types/yargs rimraf typescript ts-node-dev
```

### 2. Initialize Typescript Configuration:

```bash
npx tsc --init --outDir dist/ --rootDir src/
```

### 3. Modify ```tsconfig.json```:

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

### 4. Create ```src/``` folder:

```bash
mkdir src
```

### 5. Create ```index.ts``` file inside ```src/``` folder:

```bash
touch src/index.ts
echo 'console.log("NodeJs Running")' > src/index.ts
```

### 6. Modify ```package.json``` and replace the following code with:

```json
"name": "name-of-your-application",
"version": "0.0.0",
"description": "Some custom description here.",
// ...
"main": "app.js",
// ...
"scripts": {
  "dev": "tsnd --respawn src/index.ts -- src/app.ts",
  "build": "rimraf ./dist && && tsc",
  "start": "npm run build && node dist/app.js"
},
// ...
"author": "Your name here",
// ...
"license": "UNLICENSED",
```

### 7. Create and edit ```.gitignore```

```bash
touch .gitignore
```

**Ignore the necessary folders and files:**

```
node_modules/
dist/
```

### 8. Run Development:

```bash
npm run dev
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

### 9. Don't forget to initialize ```GIT```:

```bash
git init
git add .
git commit -m "initial-configuration"
git tag 0.0.0
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

### 10. Install testing dependencies

```bash
npm install jest @types/jest ts-jest supertest
```

### 11. Create jest configuration file.

```bash
npx jest --init
```

### 12. Configure ```jest.config.ts```.

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

### 13. Create scripts for testing in ```package.json```

```json
{
  // ...
  "scripts": [
    // ...
    "test": "NODE_OPTIONS=--experimental-vm-modules jest --silent",
    "test:watch": "NODE_OPTIONS=--experimental-vm-modules jest --watch",
    "test:coverage": "jest --coverage"
  ],
  // ...
}
```

### 14. Config Environment Variables

```bash
cp .env.template .env
```

**Edit variables the values ```.env```**

```
PORT= # example 3000
HOST= # https://yourdomain.com
MAILER_EMAIL= # example mailer@yourdomain.com
MAILER_SECRET_KEY= # example 123456
PRODUCTION= # true or false
```

### 15. Docker

**Load Docker Image**

```bash
# Detach Mode
docker compose up -d
```