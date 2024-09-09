import Faker from './faker'
import Image from './image'
import Utils from './utils'
import Theme from './theme'

interface Ntx {
    utils: Utils,
    faker: Faker,
    image: Image,
    theme: Theme,
}

export default Ntx