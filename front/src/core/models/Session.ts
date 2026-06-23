import type { Solve } from "./Solve";

export type Session = {
  id: string;
  name: string;
  createdAt: number;
  cubeType: "2x2" | "3x3" | "4x4";
  solves: Solve[];
}