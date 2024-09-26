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
}

export default Ntx