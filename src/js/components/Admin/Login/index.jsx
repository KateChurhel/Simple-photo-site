// libraries
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import {
  Formik, Form,
} from 'formik';
import { Button } from 'react-bootstrap';
// api
import { login } from '../../../api/user';
// helpers
import { addErrorToast } from '../../../helpers/toast';
import { removeFromSessionStorage, setToSessionStorage } from '../../../helpers/sessionStorage';
// constants
import { VALIDATION_LOGIN_SCHEMA } from '../../../constants/validationSchema';
import STORAGE_KEYS from '../../../constants/storageKeys';
import ROUTES from '../../../constants/routes';
// views
import Loading from '../../Base/Loading';
import FormInputs from '../../Base/FormInputs';

const LoginPage = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    username: '',
    password: '',
  };

  // reset login status
  removeFromSessionStorage(STORAGE_KEYS.user);

  const handleSubmit = async (formValues) => {
    setLoading(true);

    try {
      const user = await login(formValues);

      setToSessionStorage(STORAGE_KEYS.authToken, user.token);
      setToSessionStorage(STORAGE_KEYS.userData, user);

      setLoading(false);

      history.push(ROUTES.adminPhotos);
    } catch ({ message }) {
      setLoading(false);
      addErrorToast(message);
    }
  };

  const formFieldKeys = [
    {
      name: 'username',
      label: 'Username',
    }, {
      name: 'password',
      type: 'password',
      label: 'Password',
    },
  ];

  return (
    <section className="col-md-4 col-md-offset-3 mx-auto pt-5">
      <h2 className="mb-5">Login</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={VALIDATION_LOGIN_SCHEMA}
      >
        {({
          errors, setFieldValue, values, touched, setFieldTouched,
        }) => (
          <Form>
            <FormInputs
              errors={errors}
              inputsKey={formFieldKeys}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              touched={touched}
              values={values}
            />

            <div className="form-group pt-3">
              <Button
                className="px-4"
                onClick={(e) => e.target.blur()}
                type="submit"
                variant="dark"
              >
                Login
              </Button>
              <Link className="px-3 text-muted" to={ROUTES.adminRegister}>Register</Link>
            </div>
          </Form>
        )}
      </Formik>
      <Loading isLoadingShown={loading} />
    </section>
  );
};

export default LoginPage;
