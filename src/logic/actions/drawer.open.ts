import {OPEN_DRAWER, CLOSE_DRAWER} from './action.config';

export const handleDrawerOpen = () => {
    console.log("called")
    return{
       type:  OPEN_DRAWER
    }
}
export const handleDrawerClose = () => {
    return{
       type:  CLOSE_DRAWER
    }
}