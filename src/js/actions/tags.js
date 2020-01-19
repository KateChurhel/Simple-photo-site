import { SET_ACTIVE_TAG } from '../constants/actions/tags';

export const SetActiveTags = (tag) => ({
  type: SET_ACTIVE_TAG,
  tag,
});
