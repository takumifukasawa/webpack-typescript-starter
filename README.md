# webpack-typescript-starter

Base project is [kayac-html5-starter](https://github.com/kayac/kayac-html5-starter).

## environment

- webpack
- pug
- sass
- typescript

## usage

```
// install node modules
$ npm i

// dev
$ npm run dev

// build
$ npm run build

// clean build files
$ npm run clean
```

## editor setup

### vscode

1. Install `prettier - Code formatter` and `EsLint` extension.

2. Add these settings to `settings.json`.

(If does no exist `settings.json` yet, please create `settings.json` on project root.)

```json
{
  ...
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode"
  ...
}
```
