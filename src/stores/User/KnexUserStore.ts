import { v4 as uuid } from "uuid";
import { Knex } from "knex";
import { UserStore, User, UserInput } from "./UserStore";

interface KnexUser {
  id: string;
  name: string;
  email: string;
  password: string;
}
export class KnexUserStore implements UserStore {
  knex: Knex;
  constructor(knex: Knex) {
    this.knex = knex;
  }
  async getUserbyCreds(email: string, password: string) {
    return this.toUser(
      await this.knex<KnexUser>("Users").where({ email, password }).first()
    );
  }
  async getUserbyId(id: string) {
    return this.toUser(await this.knex<KnexUser>("Users").where(id).first());
  }
  async createUser(user: UserInput): Promise<User> {
    try {
      return this.toUser(
        (
          await this.knex<KnexUser>("Users")
            .insert({
              ...user,
              id: uuid(),
            })
            .returning("*")
        )[0]
      );
    } catch (e) {
      throw e;
    }
  }

  toUser(user: KnexUser): User {
    return { ...user };
  }
}
