import {
  KNAB_BAL,
  KNABR_BAL,
  KNAB_USDC_BAL,
  KNABR_USDC_BAL
} from './action.config'

export const getKnabBal = (data: any) => {
  return {
    type: KNAB_BAL,
    payload: data,
  }
}

export const getKnabrBal = (data: any) => {
  return {
    type: KNABR_BAL,
    payload: data,
  }
}

export const getKnabUsdcBal = (data: any) => {
  return {
    type: KNAB_USDC_BAL,
    payload: data,
  }
}

export const getKnabrUsdcBal = (data: any) => {
  return {
    type: KNABR_USDC_BAL,
    payload: data,
  }
}