// libraries
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import {
  Formik, Form,
} from 'formik';
// constants
import { MAX_TEXTAREA_LENGTH, SUCCESS_MESSAGE } from '../../constants/constants';
import { VALIDATION_SUPPORT_SCHEMA } from '../../constants/validationSchema';
// api
import { sendEmail } from '../../api/support';
// helpers
import { addErrorToast, addSuccessToast } from '../../helpers/toast';
// views
import Loading from '../Base/Loading';
import FormInputs from '../Base/FormInputs';

const initialValues = {
  email: '',
  message: '',
};

const Portfolio = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formValues) => {
    setLoading(true);

    try {
      await sendEmail(formValues);

      setLoading(false);

      setIsEmailSent(true);
      addSuccessToast(SUCCESS_MESSAGE);
    } catch ({ message }) {
      setLoading(false);
      addErrorToast(message);
    }
  };

  const formFieldKeys = [
    {
      name: 'email',
      label: 'Email',
    }, {
      name: 'message',
      label: 'Message',
      fieldType: 'textarea',
      maxLength: MAX_TEXTAREA_LENGTH,
    },
  ];

  return (
    <main className="container-fluid my-5 py-3">
      <h2 className="text-center mb-5 pt-5 text-uppercase font-weight-bold">Get in Touch</h2>
      <div className="row">
        <section className="col-md-6 col-sm-12 py-3 pl-5 pr-4">
          <div className="contact-wrapper p-5">
            <h3>My Address</h3>
            <p>Minsk, Belarus</p>
            <h3>Call Me</h3>
            <a href="tel:+275559632514">+ 275 55 963 25 14</a>
            <h3>Email Me</h3>
            <a href="mailto:syberry.pi@gmail.com">syberry.pi@gmail.com</a>
          </div>
        </section>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={VALIDATION_SUPPORT_SCHEMA}
        >
          {({
            errors, setFieldValue, values, touched, setFieldTouched, resetForm,
          }) => {
            useEffect(() => {
              resetForm();
              setIsEmailSent(false);
            }, [isEmailSent]);

            return (
              <Form className="col-md-6 col-sm-12 py-3 pl-4 pr-5" noValidate>
                <div className="contact-wrapper p-5">
                  <FormInputs
                    errors={errors}
                    inputsKey={formFieldKeys}
                    setFieldTouched={setFieldTouched}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    values={values}
                  />

                  <Button
                    className="px-4 mt-3"
                    onClick={(e) => e.target.blur()}
                    type="submit"
                    variant="dark"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
        <Loading isLoadingShown={loading} />
      </div>
    </main>
  );
};

export default Portfolio;
