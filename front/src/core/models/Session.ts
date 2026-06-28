import type { Solve } from "./Solve";
import type { SolveSource } from "./SolveSource";

export type Session = {
  id: string;
  name: string;
  createdAt: number;
  solves: Solve[];
  source: SolveSource;
}