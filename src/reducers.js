import { combineReducers } from 'redux'

const reducer = (state = {}, action) => {
  if (action['type'] === 'getUserDetailsSuccess') {
    return {
      ...state,
      ...action['payload']
    };
  } else if (action['api'] === 'repoinfo' && action['type'] === 'success') {
    return {
      ...state,
      ...{ currentRepo: action['payload'] }
    };
  } else {
    return state;
  }
};

export default combineReducers({ state: reducer });
