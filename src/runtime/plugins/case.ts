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
    camelCase: camelCase,
    capitalCase: capitalCase,
    constantCase: constantCase,
    dotCase: dotCase,
    kebabCase: kebabCase,
    noCase: noCase,
    pascalCase: pascalCase,
    pascalSnakeCase: pascalSnakeCase,
    pathCase: pathCase,
    sentenceCase: sentenceCase,
    snakeCase: snakeCase,
    trainCase: trainCase
}

export default changeCase
