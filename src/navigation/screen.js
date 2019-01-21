import { Navigation } from 'react-native-navigation'
import { Provider }   from 'react-redux'
import configureStore from '../redux/store'

import SplashScreen   from '../screens/SplashScreen'

const store = configureStore()

export default () => {
  Navigation.registerComponentWithRedux('oscar.splashScreen', () => SplashScreen, Provider, store)
}