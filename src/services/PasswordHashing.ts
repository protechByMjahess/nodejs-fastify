import { createHmac } from "crypto";

export class PasswordEncrypt {
  constructor(private password: string) {}
  hash(): string {
    let salt =
      "at mounetna you find the best products 123123*%&^%&#%*^*&% *&^#*^#&#*^";
    let hashed = createHmac("sha256", salt);
    let hash = hashed.update(this.password).digest("hex");
    return hash;
  }
}
