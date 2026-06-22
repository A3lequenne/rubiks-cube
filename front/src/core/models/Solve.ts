import type { Penalty } from "./Penalty";
import type { SolveSource } from "./SolveSource";

export type Solve = {
  id: string;
  timeMS: number;
  scramble: string;
  createdAt: Date;
  penalty: Penalty;
  source: SolveSource;
  notes?: string;
}