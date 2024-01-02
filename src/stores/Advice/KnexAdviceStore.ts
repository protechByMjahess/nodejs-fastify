import { Advice, AdviceInput, AdviceStore } from "./AdviceStore";
import { v4 as uuid } from "uuid";
import { Knex } from "knex";
interface KnexAdvice {
  id: string;
  advice: string;
}
export class KnexAdviceStore implements AdviceStore {
  knex: Knex;
  constructor(knex: Knex) {
    this.knex = knex;
  }
  async getAdvice(id: string): Promise<Advice> {
    return await this.knex<KnexAdvice>("Advice").where(id).first();
  }
  async getRandomAdvice(): Promise<Advice> {
    let advices = await this.knex<KnexAdvice>("Advice").select();
    let random = Math.random() * (advices.length - 1);
    return advices[random];
  }
  async createAdvice(advice: AdviceInput): Promise<Advice> {
    try {
      return (
        await this.knex<KnexAdvice>("Advice")
          .insert({
            ...advice,
            id: uuid(),
          })
          .returning("*")
      )[0];
    } catch (e) {
      throw e;
    }
  }
}
