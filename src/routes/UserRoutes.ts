import { UserInput } from "./../stores/User/UserStore";
import { FastifyInstance } from "fastify";
import { PasswordEncrypt } from "../services/PasswordHashing";
import { KnexUserStore } from "../stores/User/KnexUserStore";
import { Knex } from "knex";

interface userInput {
  email: string;
  password: string;
}
export function userRoutes(fastify: FastifyInstance, options: any, done: any) {
  fastify.post("/login", async (req, res) => {
    let knex = req.requestContext.get("knex");
    let ku = new KnexUserStore(knex);
    let creds = req.body as userInput;
    try {
      let pass = new PasswordEncrypt(creds.password).hash();
      console.log("user email is " + creds.email);
      let user = await ku.getUserbyCreds(creds.email, pass);
      res.send(user);
    } catch (e) {
      return e;
    }
  });
  fastify.post("/signUp", async (req, res) => {
    let knex = req.requestContext.get("knex") as Knex;
    let kus = new KnexUserStore(knex);
    let user = req.body as UserInput;
    try {
      user = { ...user, password: new PasswordEncrypt(user.password).hash() };
      let u = await kus.createUser(user);
      return true;
    } catch (e) {
      return e;
    }
  });
  done();
}
