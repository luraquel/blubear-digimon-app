export interface IDigimon {
  id: number;
  name: string;
  xAntibody?: boolean;
  images?: Image[];
  levels?: Level[];
  types?: Type[];
  attributes?: Attribute[];
  fields?: Field[];
  releaseDate?: string;
  descriptions?: Description[];
  skills?: Skill[];
  priorEvolutions?: PriorEvolution[];
  nextEvolutions?: NextEvolution[];
}

export interface Image {
  href: string;
  transparent: boolean;
}

export interface Level {
  id: number;
  level: string;
}

export interface Type {
  id: number;
  type: string;
}

export interface Attribute {
  id: number;
  attribute: string;
}

export interface Field {
  id: number;
  field: string;
  image: string;
}

export interface Description {
  origin: string;
  language: string;
  description: string;
}

export interface Skill {
  id: number;
  skill: string;
  translation: string;
  description: string;
}

export interface PriorEvolution {
  id?: number;
  digimon: string;
  condition: string;
  image: string;
  url: string;
}

export interface NextEvolution {
  id: number;
  digimon: string;
  condition: string;
  image: string;
  url: string;
}
