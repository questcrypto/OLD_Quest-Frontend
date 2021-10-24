import { OPEN_DRAWER, CLOSE_DRAWER } from '../actions/action.config'

const initialState = {
  openDrawer: true,
}

export const drawerReducer = (state = initialState, action: any) => {
  const { type } = action
  switch (type) {
    case OPEN_DRAWER:
      return {
        openDrawer: true,
      }

    case CLOSE_DRAWER:
      return {
        openDrawer: false,
      }

    default:
      return state
  }
}
