// libraries
import React from 'react';
import { ErrorMessage, Field } from 'formik';
import CreatableSelect from 'react-select/creatable';
// constants
import { MAX_INPUT_LENGTH } from '../../constants/constants';

/**
 * This method is required to handle input elements with values
 * stored in nested objects, e.g.: key name: 'something.child'
 * values object is: {field1: 'val1', field2: 'val2', something: { child: 'value'} }
 * @param values
 * @param key
 * @returns {null|*}
 */
const getValue = (values, key) => {
  if (!values) {
    return null;
  }

  if (key.includes('.')) {
    const index = key.indexOf('.');

    return getValue(values[key.substring(0, index)], key.substring(index + 1));
  }

  return values[key];
};

const getSelectValue = (options, values, key) => {
  const selectValues = getValue(values, key);

  return selectValues && selectValues.map((value) => options.find((v) => v.value === value) || {
    label: value,
    value,
    __isNew__: true,
  });
};

const getValueData = (values) => (values ? values.map(({ value }) => value) : []);

const FormInputs = ({
  inputsKey = [],
  errors = {}, touched = {}, setFieldValue, setFieldTouched, values = {},
}) => inputsKey.map(({
  name, placeholder, maxLength, fieldType = '', disabled, label, type, options,
}) => {
  let field;
  switch (fieldType) {
    case 'creatableSelect':
      field = (
        <div key={name} className={`form-group ${errors[name] && touched[name] ? 'has-error' : ''}`}>
          <label htmlFor={name}>{label}</label>
          <CreatableSelect
            key={name}
            className={`select ${errors[name] && touched[name] ? ' error' : ''}`}
            classNamePrefix="select"
            id={name}
            isMulti
            name={name}
            onBlur={() => {
              setFieldTouched(name);
            }}
            onChange={(newValues) => {
              setFieldValue(name, getValueData(newValues));
            }}
            options={options}
            placeholder={placeholder}
            value={getSelectValue(options, values, name)}
          />
          <ErrorMessage className="help-block" component="div" name={name} />
        </div>
      );
      break;
    case 'textarea':
      field = (
        <div key={name} className={`form-group ${errors[name] && touched[name] ? 'has-error' : ''}`}>
          <label htmlFor={name}>{label}</label>
          <Field
            className="form-control"
            component="textarea"
            disabled={disabled}
            id={name}
            maxLength={maxLength || MAX_INPUT_LENGTH}
            name={name}
            placeholder={placeholder}
            rows={4}
          />
          <ErrorMessage className="help-block" component="div" name={name} />
        </div>
      );
      break;
    default:
      field = (
        <div key={name} className={`form-group ${errors[name] && touched[name] ? 'has-error' : ''}`}>
          <label htmlFor={name}>{label}</label>
          <Field
            className="form-control"
            disabled={disabled}
            id={name}
            maxLength={maxLength || MAX_INPUT_LENGTH}
            name={name}
            placeholder={placeholder}
            type={type}
          />
          <ErrorMessage className="help-block" component="div" name={name} />
        </div>
      );
  }

  return field;
});

export default FormInputs;
