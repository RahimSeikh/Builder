import { raktakarabi } from "./raktakarabi";
import { raja } from "./raja";
import { achalayatan } from "./achalayatan";
import type { Play } from "../types";

export const plays: Play[] = [raktakarabi, raja, achalayatan];

export const playBySlug: Record<Play["slug"], Play> = {
  raktakarabi,
  raja,
  achalayatan,
};
