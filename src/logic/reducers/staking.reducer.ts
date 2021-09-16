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
  SET_DEPOSITED_KNAB,
  SET_QUEST,
  SET_QUEST_SUPPLY,
  ACCORD_ACTION,
  SET_KNAB_SUPPLY,
  SET_USDC_SUPPLY,
  SET_KNABR_SUPPLY,
  SET_LP_SUPPLY,
  SET_TVL_KNAB_USDC2,
  SET_LP2,
  SET_LP_DOLLAR2,
  SET_LP_STAKED2,
  SET_LP_STAKED_DOLLAR2,
  SET_LP_KNABR_EARNED2,
  SET_LP2_SUPPLY,
  SET_APR_K,
  SET_APR_Q,
  SET_APR_S,
  SET_APR_U
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
  deposited_knab: 0.0,

  quest: 0.0,
  quest_supply: 0.0,

  accordAction: {
    first: false,
    second: false,
    third: false,
    four_three: false
  },

  knab_supply: 100000000,
  usdc_supply: 0.0,
  knabr_supply: 0.0,
  lp_supply: 0.0,

  tvl_knab_usdc2: 0.0,
  lp2: 0.0,
  lp_dollar2: 0.0,
  lp_staked2: 0.0,
  lp_staked_dollar2: 0.0,
  lp_knabr_earned2: 0.0,
  lp2_supply: 0.0,

  apr_k: 0.0,
  apr_q: 0.0,
  apr_s: 0.0,
  apr_u: 0.0,

}

export const stakingReducer = (state = initialState, action: any) => {
  let { type, payload } = action
  if (typeof payload !== 'object') {
    // payload = parseFloat(payload).toFixed(3)
  }
  switch (type) {
    case SET_KNAB:
      return {
        ...state,
        knab: parseFloat(payload).toFixed(3)
      }
    case SET_KNAB_DOLLAR:
      return {
        ...state,
        knab_dollar: parseFloat(payload).toFixed(3)
      }
    case SET_KNAB_CONVERTED:
      return {
        ...state,
        knab_converted: parseFloat(payload).toFixed(3)
      }
    case SET_KNAB_CONVERTED_DOLLAR:
      return {
        ...state,
        knab_converted_dollar: parseFloat(payload).toFixed(3)
      }
    case SET_KNAB_STAKED:
      return {
        ...state,
        knab_staked: parseFloat(payload).toFixed(3)
      }
    case SET_KNAB_STAKED_DOLLAR:
      return {
        ...state,
        knab_staked_dollar: parseFloat(payload).toFixed(3)
      }
    case SET_KNABR:
      return {
        ...state,
        knabr: parseFloat(payload).toFixed(3)
      }
    case SET_KNABR_DOLLAR:
      return {
        ...state,
        knabr_dollar: parseFloat(payload).toFixed(3)
      }
    case SET_KNABR_EARNED:
      return {
        ...state,
        knabr_earned: parseFloat(payload).toFixed(3)
      }
    case SET_KNABR_EARNED_DOLLAR:
      return {
        ...state,
        knabr_earned_dollar: parseFloat(payload).toFixed(3)
      }
    case SET_USDC:
      return {
        ...state,
        usdc: parseFloat(payload).toFixed(3)
      }
    case SET_USDC_DOLLAR:
      return {
        ...state,
        usdc_dollar: parseFloat(payload).toFixed(3)
      }
    case SET_USDC_STAKED:
      return {
        ...state,
        usdc_staked: parseFloat(payload).toFixed(3)
      }
    case SET_USDC_STAKED_DOLLAR:
      return {
        ...state,
        usdc_staked_dollar: parseFloat(payload).toFixed(3)
      }
    case SET_USDC_KNAB_EARNED:
      return {
        ...state,
        usdc_knabr_earned: parseFloat(payload).toFixed(3)
      }
    case SET_LP:
      return {
        ...state,
        lp: parseFloat(payload).toFixed(7)
      }
    case SET_LP_DOLLAR:
      return {
        ...state,
        lp_dollar: parseFloat(payload).toFixed(7)
      }
    case SET_LP_STAKED:
      return {
        ...state,
        lp_staked: parseFloat(payload).toFixed(7)
      }
    case SET_LP_STAKED_DOLLAR:
      return {
        ...state,
        lp_staked_dollar: parseFloat(payload).toFixed(7)
      }
    case SET_LP_KNABR_EARNED:
      return {
        ...state,
        lp_knabr_earned: parseFloat(payload).toFixed(3)
      }
    case SET_TVL_KNAB:
      return {
        ...state,
        tvl_knab: parseFloat(payload).toFixed(3)
      }
    case SET_TVL_KNAB_USDC:
      return {
        ...state,
        tvl_knab_usdc: parseFloat(payload).toFixed(7)
      }
    case SET_TVL_USDC:
      return {
        ...state,
        tvl_usdc: parseFloat(payload).toFixed(3)
      }
    case SET_LOAN_AMOUNT:
      return {
        ...state,
        loan_amount: parseFloat(payload).toFixed(3)
      }
    case SET_CONVERTED_KNAB:
      return {
        ...state,
        converted_knab: parseFloat(payload).toFixed(3)
      }
    case SET_DEPOSITED_KNAB:
      return {
        ...state,
        deposited_knab: parseFloat(payload).toFixed(3)
      }
    case SET_QUEST:
      return {
        ...state,
        quest: parseFloat(payload).toFixed(3)
      }
    case SET_QUEST_SUPPLY:
      return {
        ...state,
        quest_supply: parseFloat(payload).toFixed(3)
      }
    case ACCORD_ACTION:
      return {
        ...state,
        accordAction: payload
      }
    case SET_KNAB_SUPPLY:
      return {
        ...state,
        knab_supply: parseFloat(payload).toFixed(3)
      }
    case SET_USDC_SUPPLY:
      return {
        ...state,
        usdc_supply: parseFloat(payload).toFixed(3)
      }
    case SET_KNABR_SUPPLY:
      return {
        ...state,
        knabr_supply: parseFloat(payload).toFixed(3)
      }
    case SET_LP_SUPPLY:
      return {
        ...state,
        lp_supply: parseFloat(payload).toFixed(3)
      }

    case SET_TVL_KNAB_USDC2:
      return {
        ...state,
        tvl_knab_usdc2: parseFloat(payload).toFixed(7)
      }
    case SET_LP2:
      return {
        ...state,
        lp2: parseFloat(payload).toFixed(7)
      }
    case SET_LP_DOLLAR2:
      return {
        ...state,
        lp_dollar2: parseFloat(payload).toFixed(7)
      }
    case SET_LP_STAKED2:
      return {
        ...state,
        lp_staked2: parseFloat(payload).toFixed(7)
      }
    case SET_LP_STAKED_DOLLAR2:
      return {
        ...state,
        lp_staked_dollar2: parseFloat(payload).toFixed(7)
      }
    case SET_LP_KNABR_EARNED2:
      return {
        ...state,
        lp_knabr_earned2: parseFloat(payload).toFixed(3)
      }
    case SET_LP2_SUPPLY:
      return {
        ...state,
        lp2_supply: parseFloat(payload).toFixed(3)
      }
    case SET_APR_K:
      return {
        ...state,
        apr_k: parseFloat(payload).toFixed(3)
      }
      case SET_APR_Q:
      return {
        ...state,
        apr_q: parseFloat(payload).toFixed(3)
      }
      case SET_APR_S:
      return {
        ...state,
        apr_s: parseFloat(payload).toFixed(3)
      }
      case SET_APR_U:
      return {
        ...state,
        apr_u: parseFloat(payload).toFixed(3)
      }
    default:
      return state
  }
}