export type ArrayManipulationRequest = {
  colors: string[];
  products: string[];
  promos: string[];
};

export type ArrayManipulationResponse = {
  input: ArrayManipulationRequest;
  result: string[];
  resultWithExtraColor?: string[];
};
