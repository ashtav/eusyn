import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  kebabCase,
  noCase,
  pascalCase,
  pascalSnakeCase,
  pathCase,
  sentenceCase,
  snakeCase,
  trainCase
} from "../scripts/change-case.mjs";
const changeCase = {
  camel: camelCase,
  capital: capitalCase,
  constant: constantCase,
  dot: dotCase,
  kebab: kebabCase,
  no: noCase,
  pascal: pascalCase,
  pascalSnake: pascalSnakeCase,
  path: pathCase,
  sentence: sentenceCase,
  snake: snakeCase,
  train: trainCase
};
export default changeCase;
