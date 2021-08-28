# Team15 CRM-Frontend
ReactJS, Material-UI, Firebase
#### Trello Link:
https://trello.com/b/Vn3tMyRD/compsci-399-project-sprint-1-%F0%9F%9A%80-28-07-21-04-08-21


## Usage

### Install yarn

```terminal
$ npm install yarn -g //install yarn globally
```
for Windows add this command in Terminal: Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted

### Start

```terminal
$ yarn install       // yarn install pacakges
$ yarn start         // run it locally
// http://localhost:3000 be available
$ yarn run build    // this will build the server code to es5 js codes and generate a dist file

```

### Pull request

Before your create a new pull request, you should do:

```terminal
$ yarn run lint
$ yarn run lint:fix     //fix eslint error

```

## Documentation

### Material-UI
https://material-ui.com/


### useFetch

```terminal
We use useFetch to make http request.
Location: ./src/apis/useFetch.js

Return strucure: { data, loading, error, refetch }

data: response (usually will be json)
loading: boolean
error: error object
refetch: function to refetch the data (typicallly used with onClick)

```
