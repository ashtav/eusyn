import Faker from './faker'
import Image from './image'
import Theme from './theme'
import Utils from './utils'

interface Ntx {
    utils: Utils,
    faker: Faker,
    image: Image,
    theme: Theme,
    storage: LocalStorage,
    focus: (self: any, ref: string) => void
    overlay: (message?: string | Boolean, options?: { closeAfter?: Number }) => void
}

export default Ntx