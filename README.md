## Get Started

```sh
npx create-app-starter my-app

# If you want to create a pure js/css/html app include `vanilla` as the 4th argument
npx create-app-starter my-app vanilla
```

or

```sh
git clone https://github.com/ItsLeeOwen/app-starter.git my-app

cd my-app

# If you want to create a pure js/css/html app include
# checkout the vanilla branch
git checkout vanilla

npm install
```

That's it.

## Code Splitting

Add additional packages to package.json's "webpack.entry" config.

```json
"webpack": {
  "entry": {
    "index.html": "./src/index.html",
    "index.js": "./src/index.js",

    "login.html": "./src/login.html",
    "login.js": "./src/login.js"
  }
}
```

## Environment Vars

Add environment variables to your project, accessible on `process.env`. Example: `process.env.GREETING`.

```json
"webpack": {
  "env": {
    "GREETING": "cześć",
    "GREETING_FROM_ENV": "$GREETING_FROM_ENV"
  }
}
```

Values prefixed with `$` will be assigned from your environment.
Source environment variables from a `.env` file at the root of your project:

```sh
GREETING_FROM_ENV=alo
```
