import {
  KNAB_BAL,
  KNABR_BAL,
  KNAB_USDC_BAL,
  KNABR_USDC_BAL
} from '../actions/action.config'

const initialState = {
  
  knab: 0.0,
  knab_dollar: 0.0,
  knab_converted: 0.0,
  knab_converted_dollar: 0.0,
  knab_staked: 0.0,
  knab_staked_dollar: 0.0,

  knabr: 1.0,
  knabr_dollar: 0.0,
  knabr_earned: 0.0,
  knabr_earned_dollar: 0.0,

  usdc: 0.0,
  usdc_dollar: 0.0,
  usdc_staked: 0.0,
  usdc_staked_dollar: 0.0,

  lp: 0.0,
  lp_dollar: 0.0,
  lp_staked: 0.0,
  lp_staked_dollar: 0.0

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