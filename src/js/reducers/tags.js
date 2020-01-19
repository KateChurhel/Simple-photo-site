import { SET_ACTIVE_TAG } from '../constants/actions/tags';
import { MAIN_TAG } from '../constants/constants';

const initialState = {
  activeTag: MAIN_TAG,
};

const Tags = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_TAG:
      return {
        ...state,
        activeTag: action.tag,
      };
    default:
      return state;
  }
};

export default Tags;
