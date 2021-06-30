import {
  KNAB_BAL,
  KNABR_BAL,
  KNAB_USDC_BAL,
  KNABR_USDC_BAL
} from './action.config'

export const setKnabBal = (data: any) => {
  return {
    type: KNAB_BAL,
    payload: data,
  }
}

export const setKnabrBal = (data: any) => {
  return {
    type: KNABR_BAL,
    payload: data,
  }
}

export const setKnabUsdcBal = (data: any) => {
  return {
    type: KNAB_USDC_BAL,
    payload: data,
  }
}

export const setKnabrUsdcBal = (data: any) => {
  return {
    type: KNABR_USDC_BAL,
    payload: data,
  }
}