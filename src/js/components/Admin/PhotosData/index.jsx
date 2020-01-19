// libraries
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
// api
import { getByUserId, deletePhotoRequest } from '../../../api/photo';
// helpers
import { addErrorToast } from '../../../helpers/toast';
import { getFromSessionStorage } from '../../../helpers/sessionStorage';
// constants
import STORAGE_KEYS from '../../../constants/storageKeys';
import ROUTES from '../../../constants/routes';
// views
import Loading from '../../Base/Loading';

const PhotosData = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const userData = getFromSessionStorage(STORAGE_KEYS.userData);

  if (!userData) {
    history.push(ROUTES.adminLogin);

    return null;
  }

  const { _id: userId } = userData;

  const loadPhotos = async () => {
    setLoading(true);

    try {
      const requestData = await getByUserId(userId);

      setLoading(false);

      setPhotos(requestData);
    } catch ({ message }) {
      setLoading(false);
      addErrorToast(message);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const deletePhoto = async (id) => {
    setLoading(true);

    try {
      await deletePhotoRequest(id);

      const newPhotos = photos.filter(({ _id }) => _id !== id);

      setPhotos(newPhotos);
      setLoading(false);
    } catch ({ message }) {
      setLoading(false);
      addErrorToast(message);
    }
  };

  return (
    <main className="container-fluid my-5 py-3">

      <div className="d-flex align-items-center flex-wrap pt-3 mb-5">
        <h2 className="m-0 mr-auto">Photos</h2>
        <Link
          className="btn btn-dark px-4"
          to={ROUTES.adminAddPhoto}
        >
          + Add photos
        </Link>
        <Link className="px-3 text-muted" to={ROUTES.adminLogin}>Logout</Link>
      </div>
      <Table bordered className="mb-5" hover responsive striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Tags</th>
            <th>Image</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {photos.map(({
            image, title, tags, _id,
          }, index) => (
            <tr key={_id}>
              <td>{index + 1}</td>
              <td>{title}</td>
              <td>{tags.join(', ')}</td>
              <td>
                <a href={image} rel="noopener noreferrer" target="_blank" title={image}>Link</a>
              </td>
              <td>
                <button
                  className="action-button edit-button"
                  onClick={() => {
                    history.push(`/admin/${_id}/edit-photo`);
                  }}
                  type="button"
                />
                <button
                  className="action-button delete-button"
                  onClick={() => {
                    deletePhoto(_id);
                  }}
                  type="button"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Loading isLoadingShown={loading} />
    </main>
  );
};

export default PhotosData;
