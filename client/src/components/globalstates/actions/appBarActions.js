import {OPEN_APPBAR_DROPDOWN , CLOSE_APPBAR_DROPDOWN} from '../../utils/constants'

export const openAppBarDropdown = () => dispatch => {
  dispatch({
    OPEN_APPBAR_DROPDOWN
  })
}


export const closeAppBarDropdown = () => dispatch => {
  dispatch({
    CLOSE_APPBAR_DROPDOWN
  })
}