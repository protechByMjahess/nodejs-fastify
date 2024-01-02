export type User = {
  id: string;
  email: string;
  name: string;
};
export type UserInput = {
  email: string;
  name: string;
  password: string;
};
export interface UserStore {
  getUserbyId(id: string): Promise<User>;
  getUserbyCreds(email: string, password: string): Promise<User>;
  createUser(user: UserInput): Promise<User>;
}
