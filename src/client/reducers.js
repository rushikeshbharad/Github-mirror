import { GET_REPO_DETAILS_SECCUESS, GET_USER_DETAILS_SECCUESS } from './action-types';
import { combineReducers } from 'redux'

const reducer = (state = {}, action) => {
  if (action['type'] === GET_USER_DETAILS_SECCUESS) {
    return {
      ...state,
      ...action['payload']
    };
  } else if (action['type'] === GET_REPO_DETAILS_SECCUESS) {
    return {
      ...state,
      ...{ currentRepo: action['payload'] }
    };
  } else {
    return state;
  }
};

export default combineReducers({ state: reducer });
