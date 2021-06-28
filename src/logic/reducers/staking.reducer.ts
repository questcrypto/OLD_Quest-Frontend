import {
  KNAB_BAL,
  KNABR_BAL,
  KNAB_USDC_BAL,
  KNABR_USDC_BAL
} from '../actions/action.config'

const initialState = {
  knab: 0.0,
  knabr: 1.0,
  knabUsdc: 0.0,
  knabrUsdc: 0.0
}

export const stakingReducer = (state = initialState, action: any) => {
  const { type, payload } = action
  switch (type) {
    case KNAB_BAL:
      return {
        ...state,
        knab: payload
      }
    case KNABR_BAL:
      return {
        ...state,
        knabr: payload
      }
    case KNAB_USDC_BAL:
      return {
        ...state,
        knabUsdc: payload
      }
    case KNABR_USDC_BAL:
      return {
        ...state,
        knabrUsdc: payload
      }
    default:
      return state
  }
}