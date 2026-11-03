# Devis generator
 <img  src="https://avatars3.githubusercontent.com/u/21971184?v=4&amp;s=200" href="http://devisjs.surge.sh" width="250" />

>Scaffold out a [Devis](https://github.com/Devisjs/devis) microservices project.

<p align="center">
  <a href="https://www.npmjs.com/package/generator-devis"><img src="https://img.shields.io/npm/v/generator-devis.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/generator-devis"><img src="https://img.shields.io/npm/l/generator-devis.svg" alt="License"></a>
  <a href="https://github.com/Devisjs/generator-devis/actions/workflows/ci.yml"><img src="https://github.com/Devisjs/generator-devis/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
</p>

## Usage

Node.js 22.18 or later is required.

```bash
npm install -g yo generator-devis
mkdir my-project && cd my-project
yo devis
```

The generator asks for a project name and which Devis plugins to add:
[devis-mongo-client](https://github.com/Devisjs/devis-mongo-client),
[devis-pub_sub-redis](https://github.com/Devisjs/devis-pub_sub-redis) and
[devis_rabbitmq](https://github.com/Devisjs/devis_rabbitmq).

## Generated project

```
my-project/
├── gateway.js              HTTP gateway forwarding GET /hello to the hello microservice
├── services/hello/
│   ├── index.js            the microservice patterns (and the selected plugins)
│   └── server.js           exposes the microservice over TCP
└── test/hello.test.js      starts both processes and calls the gateway
```

Run it:

```bash
npm run start:service
npm run start:gateway
curl "http://127.0.0.1:8080/hello?name=devis"
```

The project uses Devis 4: handlers are `async` functions, the gateway `await`s its calls and answers `502` when the microservice fails or does not answer within 5 seconds, and both processes shut down cleanly on `SIGTERM`.

Add a microservice by copying `services/hello`, changing its patterns and port, and connecting to it from the gateway with `devis.connect`.

## Upgrading

Since 2.1, generated projects target Devis 4 instead of Devis 3.

### From 1.x

Version 2 generates a much smaller project targeting Devis 3. The Wakanda configuration, the Angular front end, the mongoose model generator and the `devis` shell command are gone: they relied on the Devis 1 API (`devis.client`, `devis.act`), which no longer exists. Use the plugins above for data storage and messaging.

## License

MIT
