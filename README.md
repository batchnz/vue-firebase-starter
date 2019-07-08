# Vue Firebase Starter

A vue starter project, that using Firebase suite.

[DEMO](https://vue-firebase-starter-e8020.web.app/)

* Firebase Auth
* Cloud Firestore
* Firebase Storage
* Firebase Function
* Firebase Hosting

## Project setup
```
yarn install
firebase deploy --only hosting
```

## Add staging site
Adding alias to the default(production) project.

1. Manually setup environment, or call it adding alias
 `cat .firebaserc`

2. Using **firebase-cli**

```bash
# Add staging project
firebase use --add

# Switching Project
firebase use default
firebase use staging

```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your tests
```
yarn test
```

### Lints and fixes files
```
yarn lint
```

### Run your unit tests
```
yarn test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
