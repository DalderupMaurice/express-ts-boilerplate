<p align="center">
  <h2 align="center">RESTful Web API with Node.js - Express - Typescript</h2>
  <p align="center">
  A simple boilerplate to bootstrap a Node.js express backend, utilizing Typescript and MongoDB
  </p>
  <p align="center">
    <a href="https://github.com/DalderupMaurice/express-ts-boilerplate/blob/master/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-yellow.svg" />
    </a>
    <a href="https://github.com/DalderupMaurice/express-ts-boilerplate">
    	<img src="https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-blue.svg" alt="platforms" />
    </a>
    <a href="https://github.com/DalderupMaurice/express-ts-boilerplate">
	    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="prs welcome">
    </a>
  </p>
</p>

## Features

- Written in **Typescript**
- Middleware **Logging**
- MongoDB

## Development

Make sure you have a MongoDB database running locally or have a connection URL to a hosted MongoDB instance.

```bash
# Clone repo
git clone <url>

# Create .env file (and adjust values accordingly)
cp .env.example .env

# Install dependencies
yarn

# Start in development mode
yarn start

# Start in production mode
yarn start:prod
```

The default URL is: _http://localhost:3000_ and _https://localhost:3000_ when HTTPS is enabled.

>The key and cert in the config folder is for testing purpose only. You should generate your own.


## Contributions

Feel free to submit pull requests, create issues, discuss ideas or spread the word.

## License

MIT &copy; [Maurice Dalderup](https://twitter.com/mauricedalderup)