# <%= name %>

A [Devis](https://github.com/Devisjs/devis) microservices project.

## Structure

* `services/hello`: a microservice that answers the `{ role: "hello", cmd: "greet" }` pattern over TCP.
* `gateway.js`: an HTTP gateway that forwards `GET /hello?name=...` to the hello microservice.<% if (plugins.length) { %>
* Plugins plugged into the hello microservice: <%= plugins.join(", ") %>.<% } %>

## Run

Start each process in its own terminal:

```bash
npm run start:service
npm run start:gateway
curl "http://127.0.0.1:8080/hello?name=devis"
```

`SERVICE_HOST`, `SERVICE_PORT` and `PORT` override the default addresses.

## Test

```bash
npm test
```
