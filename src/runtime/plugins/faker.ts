
import { defineNuxtPlugin } from '#imports'
import type Faker from '../types/faker'
import { utils } from './utils'

const names: Array<string> = [
    'Dutch Van Der Linde',
    'Hosea Mathews',
    'Molly O\'Shea',
    'Susan Grimshaw',
    'Pearson',
    'Micah Bells',
    'Charles Smith',
    'Bill Williamson',
    'Leopold Strauss',
    'John Marston',
    'Abigail Roberts',
    'Jack Marston',
    'Karen Jones',
    'Javier Escuella',
    'Tilly Jackson',
    'Uncle',
    'Mary-Beth Gaskill',
    'Lenny Summers',
    'Josiah Trelawny',
    'Reverend Swanson',
    'Sean Macguire',
    'Arthur Morgan',
    'Sadie Adler'
]

const addresses: Array<string> = [
    'Jl. Raya Kuta, Gang Cempaka, No. 17, Kuta, Bali',
    'Jl. Gunung Payung, Block F, No. 11, Nusa Dua, Bali',
    'Jl. Tirta Empul, G. 3, No. 8, Gianyar, Bali',
    'Jl. Raya Ubud, Block B, No. 21, Ubud, Bali',
    'Jl. Hanoman, Gang Melati, No. 9, Denpasar, Bali',
    'Jl. Pantai Berawa, G. 6, No. 12, Canggu, Bali',
    'Jl. Kediri, Block D, No. 7, Tabanan, Bali',
    'Jl. Gatot Subroto, G. 4, No. 15, Sanur, Bali',
    'Jl. Raya Kintamani, Block A, No. 3, Bangli, Bali',
    'Jl. Raya Candidasa, G. 9, No. 14, Karangasem, Bali',
    'Jl. Teuku Umar, Gang Pandan, No. 6, Denpasar, Bali',
    'Jl. Batu Belig, Block C, No. 2, Seminyak, Bali',
    'Jl. Raya Sukawati, G. 5, No. 19, Sukawati, Bali',
    'Jl. Pulau Sari, Block E, No. 10, Jimbaran, Bali',
    'Jl. Padang Tegal, Gang Sabtu, No. 11, Ubud, Bali'
]

/**
 * Generates a random number based on length.
 *
 * @param length - The length of the random number.
 * @param startWith - Optional number to start the sequence with.
 * @returns A random number as a string.
 */
const number = (length: number, startWith?: number): string => {
    try {
        let result = ''
        for (let i = 0; i < (length - 1); i++) {
            const randomNumber = utils.randInt(0, 10)
            result += randomNumber.toString()
        }
        return (startWith ?? utils.randInt(0, 10)).toString() + result
    } catch (e) {
        return '0'
    }
}

/**
 * Generates a random price based on length.
 *
 * @param length - The length of the random price.
 * @param locale - The locale for formatting the price.
 * @param prefix - The currency prefix/symbol.
 * @returns A formatted random price as a string.
 */
const price = (length: number = 5, locale: string = 'id_ID', prefix: string = ''): string => {
    const randomIntValue = utils.randInt(0, Math.pow(10, length))
    const price = randomIntValue.toString()

    const value = (price.length < length ? `${price}1` : price)

    // Use Intl.NumberFormat for currency formatting
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: prefix,
        minimumFractionDigits: 0
    })
    const result = formatter.format(parseInt(value))

    return result
}

/**
 * Generates a random name.
 *
 * @returns A random name from the ExampleData names array.
 */
const name = (): string => {
    const randomIndex = utils.randInt(0, names.length)
    return names[randomIndex]
}

/**
 * Generates a random email.
 *
 * @param domain - The email domain.
 * @param addNumber - Whether to add a random number.
 * @returns A random email address.
 */
const email = (domain: string = 'gmail.com', addNumber: boolean = false): string => {
    let result = name().toLowerCase().replace(/ /g, '')

    if (addNumber) {
        result += `${Date.now().toString().padStart(3, '0').substring(0, 3)}@${domain}`
    } else {
        result += `@${domain}`
    }

    return result
}

/**
 * Generates a random phone number.
 *
 * @param prefix - The phone number prefix.
 * @returns A random phone number.
 */
const phone = (prefix: string = '08'): string => {
    return `${prefix}${utils.randInt(0, 999999999)}`
}

/**
 * Generates a random address.
 *
 * @returns A random address from the ExampleData address array.
 */
const address = (): string => {
    const randomIndex = utils.randInt(0, addresses.length)
    return addresses[randomIndex]
}

/**
 * Generates a random date.
 *
 * @param dateFormat - The format of the date.
 * @returns A random date formatted as a string.
 */
const date = (dateFormat: string = 'yyyy-MM-dd'): string => {
    const now = new Date()
    const formattedDate = utils.dateFormat(now, dateFormat)
    return formattedDate
}

/**
 * Generates a random gender.
 *
 * @param data - An array of possible gender values.
 * @returns A random gender.
 */
const gender = (data: string[] = ['Male', 'Female']): string => {
    const randomIndex = utils.randInt(0, data.length)
    return data[randomIndex]
}

/**
 * Generates a random time.
 *
 * @returns A random time formatted as HH:MM:SS.
 */
const time = (): string => {
    const hours = utils.randInt(0, 24).toString().padStart(2, '0')
    const minutes = utils.randInt(0, 60).toString().padStart(2, '0')
    const seconds = utils.randInt(0, 60).toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
}

/**
 * Generates a random invoice number.
 *
 * @returns A random invoice number.
 */
const invoice = (prefix: string = 'INV'): string => {
    return `${prefix}-${utils.randInt(0, 999999999)}`
}

/**
 * Generates a random password with lowercase, uppercase, number, and special character.
 *
 * @param length - The length of the password.
 * @param useSpecialChar - Whether to include special characters.
 * @returns A random password.
 */
const password = (length: number = 8, useSpecialChar: boolean = false): string => {
    const specials = '!@#$%^&*()-_=+[]{}|;:,.<>?/'.split('')
    const lower = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    const numbers = '0123456789'.split('')

    let all = [...lower, ...upper, ...numbers]

    if (useSpecialChar) {
        all = all.concat(specials)
    }

    let result = ''
    for (let i = 0; i < length; i++) {
        result += all[utils.randInt(0, all.length)]
    }

    return result
}

/**
 * Generates a random image URL.
 *
 * @param type - The type of image, can be 'avatar', 'food', or null.
 * @returns A random image URL as a string.
 */
const image = (type: string = 'avatar'): string => {
    const github = 'https://raw.githubusercontent.com/ashtav/assets/master'

    // for avatar is 1 - 16 (.jpg)
    // for food is 1 - 12 (.jpg)

    switch (type) {
        case 'avatar':
            return `${github}/avatar/${Math.floor(Math.random() * 16) + 1}.jpg`
        default:
            return `${github}/food/${Math.floor(Math.random() * 12) + 1}.jpg`
    }
}


const faker: Faker = {
    number, price, name, gender, email, phone, address, date, time, invoice, password, image
}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            faker
        }
    }
})