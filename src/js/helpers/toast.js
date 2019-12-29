// libraries
import { toast, Flip } from 'react-toastify';

import { TOAST_DEFAULT_OPTIONS, TOAST_TYPES } from 'constants/toast';

const addToast = ({ text, ...params }) => {
  const options = {
    ...TOAST_DEFAULT_OPTIONS,
    transition: Flip,
    ...params,
  };

  return toast(text, options);
};

export const addSuccessToast = (text) => {
  addToast({
    text,
    type: TOAST_TYPES.success,
  });
};

export const addWarningToast = (text) => {
  addToast({
    text,
    type: TOAST_TYPES.warning,
  });
};

export const addInfoToast = (text) => {
  addToast({
    text,
    type: TOAST_TYPES.info,
  });
};

export const addErrorToast = (text) => {
  addToast({
    text,
    type: TOAST_TYPES.error,
  });
};
