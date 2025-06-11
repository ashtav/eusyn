import Case from './case'
import Faker from './faker'
import Image from './image'
import LocalStorage from './storage'
import Theme from './theme'
import Utils from './utils'

interface Ntx {
    utils: Utils,
    faker: Faker,
    image: Image,
    theme: Theme,
    storage: LocalStorage,
    case: Case,
    focus: (self: any, ref: string) => void
    overlay: (message?: string | Boolean, options?: { closeAfter?: Number }) => void
}

export default Ntx