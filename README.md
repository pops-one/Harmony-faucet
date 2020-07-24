# Harmony Faucet

## Setup env variables

### Backend

```
add .env file corresponding to .env.sample in root of faucet-backend
add config.json file corresponding to config-sample.json in config folder of faucet-backend

```

### Frontend

```
add .env file corresponding to .env.sample in root of faucet-frontend
```

### Contract

```
add .env file corresponding to .env.sample in root of faucet-contract
```

## Installation

From root of this repo run the following command

```
npm install // installs all dependencies for project
npm run build // builds and deploy contract and copy Harmony-Faucet.json file to config folder backend, builds frontend project
npm start // starts frontend server at port:3000 and backend server to provided port - default 5000
```
