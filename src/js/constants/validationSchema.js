import * as Yup from 'yup';
import { FORM_ERRORS } from './errors';
import { MAX_INPUT_LENGTH, MAX_TEXTAREA_LENGTH } from './constants';

const {
  FIELD_REQUIRED, INVALID_LENGTH, INVALID_EMAIL, INVALID_URL,
} = FORM_ERRORS;

const URL_REG_EXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9а-яА-я@:%_+.~#?&//=]*)/;

const YUP_RULES = {
  requiredField: Yup.string()
    .max(MAX_INPUT_LENGTH, INVALID_LENGTH)
    .required(FIELD_REQUIRED),
  email: Yup.string()
    .email(INVALID_EMAIL)
    .required(FIELD_REQUIRED),
  url: Yup.string()
    .matches(new RegExp(URL_REG_EXP), {
      message: INVALID_URL,
      excludeEmptyString: false,
    })
    .required(FIELD_REQUIRED),
};

export const VALIDATION_LOGIN_SCHEMA = Yup.object().shape({
  username: YUP_RULES.requiredField,
  password: YUP_RULES.requiredField,
});

export const VALIDATION_REGISTER_SCHEMA = Yup.object().shape({
  username: YUP_RULES.requiredField,
  password: YUP_RULES.requiredField,
  firstName: YUP_RULES.requiredField,
  lastName: YUP_RULES.requiredField,
});

export const VALIDATION_NEW_PHOTO_SCHEMA = Yup.object().shape({
  title: YUP_RULES.requiredField,
  tags: YUP_RULES.requiredField,
  image: YUP_RULES.url,
});

export const VALIDATION_SUPPORT_SCHEMA = Yup.object().shape({
  email: YUP_RULES.email,
  message: YUP_RULES.requiredField.max(MAX_TEXTAREA_LENGTH, INVALID_LENGTH),
});
