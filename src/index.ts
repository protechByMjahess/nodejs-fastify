import fastify from "fastify";
import {
  fastifyRequestContextPlugin,
  RequestContext,
} from "fastify-request-context";
import fastifyCors from "fastify-cors";
import knexfile from "../knexfile";
import knex from "knex";
import { userRoutes } from "./routes/UserRoutes";

const server = fastify({ logger: true });

server.register(fastifyRequestContextPlugin, {
  defaultStoreValues: {
    knex: knex(process.env.PORT ? knexfile.production : knexfile.development),
  },
});
server.register(fastifyCors, {
  origin: "*",
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Accept",
    "Content-Type",
    "Authorization",
  ],
  methods: ["GET", "PUT", "OPTIONS", "POST", "DELETE"],
});
server.register(userRoutes);
const port = process.env.PORT || 3000;
server.listen(port, process.env.YOUR_HOST || "127.0.0.1", (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
