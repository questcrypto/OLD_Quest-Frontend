import {
  SET_KNAB,
  SET_KNAB_DOLLAR,
  SET_KNAB_CONVERTED,
  SET_KNAB_CONVERTED_DOLLAR,
  SET_KNAB_STAKED,
  SET_KNAB_STAKED_DOLLAR,
  SET_KNABR,
  SET_KNABR_DOLLAR,
  SET_KNABR_EARNED,
  SET_KNABR_EARNED_DOLLAR,
  SET_USDC,
  SET_USDC_DOLLAR,
  SET_USDC_STAKED,
  SET_USDC_STAKED_DOLLAR,
  SET_LP,
  SET_LP_DOLLAR,
  SET_LP_STAKED,
  SET_LP_STAKED_DOLLAR,
  SET_TVL_KNAB,
  SET_TVL_KNAB_USDC,
  SET_TVL_USDC,
  SET_USDC_KNAB_EARNED,
  SET_LP_KNABR_EARNED,
  SET_LOAN_AMOUNT,
  SET_CONVERTED_KNAB,
  SET_QUEST,
  SET_QUEST_SUPPLY
} from '../actions/action.config'

const initialState = {

  knab: 0.0,
  knab_dollar: 0.0,
  knab_converted: 0.0,
  knab_converted_dollar: 0.0,
  knab_staked: 0.0,
  knab_staked_dollar: 0.0,

  knabr: 0.0,
  knabr_dollar: 0.0,
  knabr_earned: 0.0,
  knabr_earned_dollar: 0.0,

  usdc: 0.0,
  usdc_dollar: 0.0,
  usdc_staked: 0.0,
  usdc_staked_dollar: 0.0,
  usdc_knabr_earned: 0.0,

  lp: 0.0,
  lp_dollar: 0.0,
  lp_staked: 0.0,
  lp_staked_dollar: 0.0,
  lp_knabr_earned: 0.0,

  tvl_knab: 0.0,
  tvl_knab_usdc: 0.0,
  tvl_usdc: 0.0,

  loan_amount: 0.0,

  converted_knab: 0.0,

  quest: 0.0,
  quest_supply: 0.0
}

export const stakingReducer = (state = initialState, action: any) => {
  let { type, payload } = action
  payload = parseFloat(payload).toFixed(2)
  switch (type) {
    case SET_KNAB:
      return {
        ...state,
        knab: payload
      }
    case SET_KNAB_DOLLAR:
      return {
        ...state,
        knab_dollar: payload
      }
    case SET_KNAB_CONVERTED:
      return {
        ...state,
        knab_converted: payload
      }
    case SET_KNAB_CONVERTED_DOLLAR:
      return {
        ...state,
        knab_converted_dollar: payload
      }
    case SET_KNAB_STAKED:
      return {
        ...state,
        knab_staked: payload
      }
    case SET_KNAB_STAKED_DOLLAR:
      return {
        ...state,
        knab_staked_dollar: payload
      }
    case SET_KNABR:
      return {
        ...state,
        knabr: payload
      }
    case SET_KNABR_DOLLAR:
      return {
        ...state,
        knabr_dollar: payload
      }
    case SET_KNABR_EARNED:
      return {
        ...state,
        knabr_earned: payload
      }
    case SET_KNABR_EARNED_DOLLAR:
      return {
        ...state,
        knabr_earned_dollar: payload
      }
    case SET_USDC:
      return {
        ...state,
        usdc: payload
      }
    case SET_USDC_DOLLAR:
      return {
        ...state,
        usdc_dollar: payload
      }
    case SET_USDC_STAKED:
      return {
        ...state,
        usdc_staked: payload
      }
    case SET_USDC_STAKED_DOLLAR:
      return {
        ...state,
        usdc_staked_dollar: payload
      }
    case SET_USDC_KNAB_EARNED:
      return {
        ...state,
        usdc_knabr_earned: payload
      }
    case SET_LP:
      return {
        ...state,
        lp: payload
      }
    case SET_LP_DOLLAR:
      return {
        ...state,
        lp_dollar: payload
      }
    case SET_LP_STAKED:
      return {
        ...state,
        lp_staked: payload
      }
    case SET_LP_STAKED_DOLLAR:
      return {
        ...state,
        lp_staked_dollar: payload
      }
    case SET_LP_KNABR_EARNED:
      return {
        ...state,
        lp_knabr_earned: payload
      }
    case SET_TVL_KNAB:
      return {
        ...state,
        tvl_knab: payload
      }
    case SET_TVL_KNAB_USDC:
      return {
        ...state,
        tvl_knab_usdc: payload
      }
    case SET_TVL_USDC:
      return {
        ...state,
        tvl_usdc: payload
      }
    case SET_LOAN_AMOUNT:
      return {
        ...state,
        loan_amount: payload
      }
    case SET_CONVERTED_KNAB:
      return {
        ...state,
        converted_knab: payload
      }
    case SET_QUEST:
      return {
        ...state,
        quest: payload
      }
    case SET_QUEST_SUPPLY:
      return {
        ...state,
        quest_supply: payload
      }
    default:
      return state
  }
}