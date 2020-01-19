// libraries
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Formik, Form,
} from 'formik';
import { Button } from 'react-bootstrap';
// api
import { register } from '../../../api/user';
// helpers
import { addErrorToast } from '../../../helpers/toast';
// constants
import { VALIDATION_REGISTER_SCHEMA } from '../../../constants/validationSchema';
import ROUTES from '../../../constants/routes';
// views
import Loading from '../../Base/Loading';
import FormInputs from '../../Base/FormInputs';

const RegisterPage = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  };

  const handleSubmit = async (formValues) => {
    setLoading(true);

    try {
      await register(formValues);

      setLoading(false);

      history.push(ROUTES.adminLogin);
    } catch ({ message }) {
      setLoading(false);
      addErrorToast(message);
    }
  };

  const formFieldKeys = [
    {
      name: 'firstName',
      label: 'First Name',
    }, {
      name: 'lastName',
      label: 'Last Name',
    }, {
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
      <h2 className="mb-5">Register</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={VALIDATION_REGISTER_SCHEMA}
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
                Register
              </Button>
              <Link className="btn btn-link" to={ROUTES.adminLogin}>Cancel</Link>
            </div>
          </Form>
        )}
      </Formik>
      <Loading isLoadingShown={loading} />
    </section>
  );
};

export default RegisterPage;
