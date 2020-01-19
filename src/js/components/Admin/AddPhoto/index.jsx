// libraries
import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  Formik, Form,
} from 'formik';
import { Button } from 'react-bootstrap';
// api
import {
  addPhoto, getAllTags, getPhotoById, updatePhoto,
} from '../../../api/photo';
// helpers
import { addErrorToast } from '../../../helpers/toast';
import { getFromSessionStorage } from '../../../helpers/sessionStorage';
// constants
import { VALIDATION_NEW_PHOTO_SCHEMA } from '../../../constants/validationSchema';
import ROUTES from '../../../constants/routes';
import STORAGE_KEYS from '../../../constants/storageKeys';
// views
import Loading from '../../Base/Loading';
import FormInputs from '../../Base/FormInputs';

const initialValues = {
  title: '',
  tags: '',
  image: '',
};

const AddPhoto = () => {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialValues);
  const [tagsOptions, setTagsOptions] = useState([]);
  const userData = getFromSessionStorage(STORAGE_KEYS.userData);

  if (!userData) {
    history.push(ROUTES.adminLogin);

    return null;
  }

  const { _id: userId, username } = userData;

  const loadTags = async () => {
    setLoading(true);

    try {
      let requestData = await getAllTags();

      setLoading(false);

      requestData = requestData.map((tag) => ({
        value: tag,
        label: tag,
      }));

      setTagsOptions(requestData);
    } catch ({ message }) {
      setLoading(false);
      addErrorToast(message);
    }
  };

  const loadData = async () => {
    setLoading(true);

    try {
      const { image, title, tags } = await getPhotoById(id);

      setLoading(false);

      setFormData({ image, title, tags });
    } catch ({ message }) {
      setLoading(false);
      addErrorToast(message);
    }
  };

  useEffect(() => {
    loadTags();

    if (id) {
      loadData();
    }
  }, []);

  const handleSubmit = async (formValues) => {
    setLoading(true);

    try {
      const requestData = { ...formValues, user: username, userId };

      if (id) {
        await updatePhoto(id, requestData);
      } else {
        await addPhoto(requestData);
      }

      setLoading(false);

      history.push(ROUTES.adminPhotos);
    } catch ({ message }) {
      setLoading(false);
      addErrorToast(message);
    }
  };

  const formFieldKeys = [
    {
      name: 'title',
      label: 'Title',
    }, {
      name: 'tags',
      label: 'Tags',
      fieldType: 'creatableSelect',
      options: tagsOptions,
    }, {
      name: 'image',
      label: 'Image (link)',
      type: 'url',
    },
  ];

  return (
    <section className="col-md-4 col-md-offset-3 mx-auto pt-5">
      <h2 className="mb-5">{id ? 'Edit Photo' : 'Add New Photo'}</h2>
      <Formik
        enableReinitialize
        initialValues={formData}
        onSubmit={handleSubmit}
        validationSchema={VALIDATION_NEW_PHOTO_SCHEMA}
      >
        {({
          errors, setFieldValue, values, touched, setFieldTouched,
        }) => (
          <Form noValidate>
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
                Save
              </Button>
              <Link className="btn btn-link" to={ROUTES.adminPhotos}>Cancel</Link>
            </div>
          </Form>
        )}
      </Formik>
      <Loading isLoadingShown={loading} />
    </section>
  );
};

export default AddPhoto;
