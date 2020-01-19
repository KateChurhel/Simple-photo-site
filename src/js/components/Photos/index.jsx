// libraries
import React, { useState, useEffect } from 'react';
import {
  CardColumns,
  Card,
} from 'react-bootstrap';
import { connect } from 'react-redux';
// images
import Quote from '../../../img/quote.svg';
// api
import { getAllPhotos, getPhotoByTag } from '../../api/photo';
// helpers
import { addErrorToast } from '../../helpers/toast';
// constants
import { MAIN_TAG } from '../../constants/constants';
// views
import Footer from '../Footer';
import Loading from '../Base/Loading';

const Photos = ({ activeTag = MAIN_TAG }) => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  const loadPhotos = async () => {
    setLoading(true);

    try {
      let requestData = [];

      if (activeTag === MAIN_TAG) {
        requestData = await getAllPhotos();
      } else {
        requestData = await getPhotoByTag(activeTag);
      }

      setLoading(false);

      setPhotos(requestData);
    } catch ({ message }) {
      setLoading(false);
      addErrorToast(message);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, [activeTag]);

  return (
    <main className="container-fluid my-5 pt-3 pb-5">
      <section className="row py-5 px-0 mx-0 mb-5 mt-4">
        <div className="col-12">
          <img alt="Life. Moments. Memories" className="quote-image p-0 mx-auto col-12" src={Quote} />
          <p className="quote-text text-center mt-4 mb-0">remember every moment of your life with photos</p>
        </div>
      </section>
      <CardColumns>
        {
          photos.map(({
            _id, image, title, tags, user: author,
          }) => (
            <Card key={_id} className="overflow-hidden rounded-0 border-0">
              <Card.Img alt={title} className="card-img" src={image} />
              <Card.Body className="card-img-overlay bg-dark text-white p-3">
                <Card.Title className="text-uppercase mb-2">{title}</Card.Title>
                <Card.Text className="card-tags mb-1 text-uppercase">{`Author: ${author}`}</Card.Text>
                <Card.Text className="card-tags"><i>{tags.join(', ')}</i></Card.Text>
              </Card.Body>
            </Card>
          ))
        }
      </CardColumns>
      <Footer />
      <Loading isLoadingShown={loading} />
    </main>
  );
};

const mapStateToProps = (state) => ({
  activeTag: state.tags && state.tags.activeTag,
});

export default connect(mapStateToProps)(Photos);
