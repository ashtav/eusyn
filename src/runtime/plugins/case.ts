/**
 * get is a function to get value from localStorage
 * @param {string} key - Key of the value.
 * @returns {any}
 */

import {
    camelCase, capitalCase, constantCase,
    dotCase, kebabCase, noCase, pascalCase, pascalSnakeCase, pathCase, sentenceCase, snakeCase, trainCase
} from "../scripts/change-case"
import type Case from "../types/case"


const changeCase: Case = {
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
}

export default changeCase
