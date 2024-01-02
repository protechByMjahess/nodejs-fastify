import { FastifyInstance } from "fastify";
import { Knex } from "knex";
import { KnexAdviceStore } from "../stores/Advice/KnexAdviceStore";

interface AdviceInput {
  advice: string;
}
export function adviceRoutes(
  fastify: FastifyInstance,
  options: any,
  done: any
) {
  fastify.post("/advice", async (req, res) => {
    let knex = req.requestContext.get("knex");
    let ka = new KnexAdviceStore(knex);
    try {
      let advice = await ka.getRandomAdvice();
      res.send(advice);
    } catch (e) {
      return e;
    }
  });
  fastify.post("/createAdvice", async (req, res) => {
    let knex = req.requestContext.get("knex") as Knex;
    let kas = new KnexAdviceStore(knex);
    let advice = req.body as AdviceInput;
    try {
      let ad = await kas.createAdvice(advice);
      return ad;
    } catch (e) {
      return e;
    }
  });
  done();
}
