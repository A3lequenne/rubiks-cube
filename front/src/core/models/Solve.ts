import type { Penalty } from "./Penalty";

export type Solve = {
  id: string;
  timeMS: number;
  scramble: string;
  createdAt: number;
  penalty: Penalty;
  notes?: string;
}