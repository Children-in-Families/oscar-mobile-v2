import Immutable from 'seamless-immutable'
import { QUANTITATIVE_TYPES } from '../types'

const initialState = Immutable({
  error: '',
  data: [],
  loading: false
})

export default (state = initialState, action) => {
  switch (action.type) {
    case QUANTITATIVE_TYPES.QUANTITATIVE_TYPES_REQUESTING:
      return state.set('error', '').set('loading', true)

    case QUANTITATIVE_TYPES.QUANTITATIVE_TYPES_SUCCESS:
      return state.set('data', action.data).set('loading', false)

    case QUANTITATIVE_TYPES.QUANTITATIVE_TYPES_FAILED:
      return state.set('error', action.error).set('loading', false)

    default:
      return state
  }
}
