# Building RESTful Web APIs with Node.js, Express, MongoDB, TypeScript and Hyperledger Fabric

This is a simple Express TypeScript API, levering the Hyperledger Node SDK

## Requirements

[NodeJS](https://nodejs.org/en/)

Install global TypeScript and TypeScript Node

```
npm install -g typescript ts-node
```

## Getting Started

You should install [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) on your local machine, or use other services such as [mLab](https://mlab.com/) or [Compose](https://www.compose.com/compare/mongodb)

After that, you will have to replace the mongoURL with your MongoDB address in _src/app.ts_

## Clone this repository

```
git clone <url> .
```

Then install the dependencies

```
npm install
```

## Start the server

Run in development mode

```
npm run start
```

Run in production mode

```
npm run prod
```

The default URL is: _https://localhost:3000_

The key and cert in the config folder is for testing purpose only. You should generate your own.

_Reference from [Lynda.com](https://www.lynda.com/Node-js-tutorials/Next-steps/633869/671263-4.html)_
