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
  ACCORD_ACTION
} from './action.config'

export const setKnab = (data: any) => {
  return {
    type: SET_KNAB,
    payload: data,
  }
}

export const setKnabDollar = (data: any) => {
  return {
    type: SET_KNAB_DOLLAR,
    payload: data,
  }
}

export const setKnabConverted= (data: any) => {
  return {
    type: SET_KNAB_CONVERTED,
    payload: data,
  }
}

export const setKnabConvertedDollar= (data: any) => {
  return {
    type: SET_KNAB_CONVERTED_DOLLAR,
    payload: data,
  }
}

export const setKnabStaked = (data: any) => {
  return {
    type: SET_KNAB_STAKED,
    payload: data,
  }
}

export const setKnabStakedDollar = (data: any) => {
  return {
    type: SET_KNAB_STAKED_DOLLAR,
    payload: data,
  }
}

export const  setKnabr= (data: any) => {
  return {
    type: SET_KNABR,
    payload: data,
  }
}

export const setKnabrDollar = (data: any) => {
  return {
    type: SET_KNABR_DOLLAR,
    payload: data,
  }
}

export const setKnabrEarned = (data: any) => {
  return {
    type: SET_KNABR_EARNED,
    payload: data,
  }
}

export const setKnabrEarnedDollar = (data: any) => {
  return {
    type: SET_KNABR_EARNED_DOLLAR,
    payload: data,
  }
}

export const setUsdc = (data: any) => {
  return {
    type: SET_USDC,
    payload: data,
  }
}

export const setUsdcDollar = (data: any) => {
  return {
    type: SET_USDC_DOLLAR,
    payload: data,
  }
}

export const setUsdcStaked = (data: any) => {
  return {
    type: SET_USDC_STAKED,
    payload: data,
  }
}

export const setUsdcStakedDollar= (data: any) => {
  return {
    type: SET_USDC_STAKED_DOLLAR,
    payload: data,
  }
}

export const setLp = (data: any) => {
  return {
    type: SET_LP,
    payload: data,
  }
}

export const setLpDollar = (data: any) => {
  return {
    type: SET_LP_DOLLAR,
    payload: data,
  }
}

export const setLpStaked = (data: any) => {
  return {
    type: SET_LP_STAKED,
    payload: data,
  }
}

export const setLpStakedDollar = (data: any) => {
  return {
    type: SET_LP_STAKED_DOLLAR,
    payload: data,
  }
}

export const setTvlKnab = (data: any) => {
  return {
    type: SET_TVL_KNAB,
    payload: data,
  }
}

export const setTvlKnabUsdc = (data: any) => {
  return {
    type: SET_TVL_KNAB_USDC,
    payload: data,
  }
}

export const setTvlUsdc = (data: any) => {
  return {
    type: SET_TVL_USDC,
    payload: data,
  }
}

export const setUsdcKnabEarned = (data: any) => {
  return {
    type: SET_USDC_KNAB_EARNED,
    payload: data,
  }
}

export const setLpKnabREarned = (data: any) => {
  return {
    type: SET_LP_KNABR_EARNED,
    payload: data,
  }
}

export const setLoanAmount = (data: any) => {
  return {
    type: SET_LOAN_AMOUNT,
    payload: data,
  }
}

export const setConvertedKnab = (data: any) => {
  return {
    type: SET_CONVERTED_KNAB,
    payload: data,
  }
}

export const setDepositedKnab = (data: any) => {
  return {
    type: SET_DEPOSITED_KNAB,
    payload: data,
  }
}

export const setQuest = (data: any) => {
  return {
    type: SET_QUEST,
    payload: data,
  }
}

export const setQuestSupply = (data: any) => {
  return {
    type: SET_QUEST_SUPPLY,
    payload: data,
  }
}

export const accordActionFn = (data: any) => {
  return {
    type: ACCORD_ACTION,
    payload: data,
  }
}




