export type Advice = {
  id: string;
  advice: string;
};
export type AdviceInput = {
  advice: string;
};
export interface AdviceStore {
  getAdvice(id: string): Promise<Advice>;
  getRandomAdvice(): Promise<Advice>;
  createAdvice(advice: AdviceInput): Promise<Advice>;
}
