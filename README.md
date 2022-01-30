# The-papayas

https://quizzical-panini-8491ed.netlify.app/

Simple web app that displays a directory structure of midi files.

The directory structure is loaded from a json file. This file is auto updated by an action that 
relies on a google app script to generate the json.

Mainly a vue 3 script setup playground so code quality is rather low.


## Commands


### dev server
```bash
$ yarn dev
```

### production build
```bash
$ yarn build
```

### custom action
The custom action to fetch the updated json should be rebuilt after any change.
```bash
$ cd .github/actions/fetchList
$ yarn build
```
