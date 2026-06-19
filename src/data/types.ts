export type Character = {
  name: string;
  role: string;
  description: string;
  importance: string;
};

export type Relationship = {
  from: string;
  to: string;
  label: string;
};

export type Scene = {
  title: string;
  body: string;
};

export type Act = {
  title: string;
  scenes: Scene[];
};

export type TimelineEvent = {
  phase: string;
  title: string;
  body: string;
};

export type SymbolItem = {
  symbol: string;
  meaning: string;
};

export type Theme = {
  name: string;
  body: string;
};

export type Play = {
  slug: "raktakarabi" | "raja" | "achalayatan";
  title: string;
  titleRoman: string;
  year: string;
  genre: string;
  shortIntro: string;
  cover: string;
  summary: string;
  plot: Act[];
  characters: Character[];
  relationships: Relationship[];
  timeline: TimelineEvent[];
  symbols: SymbolItem[];
  literarySignificance: string[];
  themes: Theme[];
};
