// libraries
import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Nav,
} from 'react-bootstrap';
import { connect } from 'react-redux';
// constants
import { MAIN_TAG } from '../../constants/constants';
// api
import { getAllTags } from '../../api/photo';
// helpers
import { addErrorToast } from '../../helpers/toast';
// views
import Loading from '../Base/Loading';
// actions
import { SetActiveTags } from '../../actions/tags';

const Footer = ({ SetActiveTag, activeTag = MAIN_TAG }) => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);

  const loadTags = async () => {
    setLoading(true);

    try {
      const requestData = await getAllTags();

      setLoading(false);

      setTags([MAIN_TAG, ...requestData]);
      SetActiveTag(tags[0]);
    } catch ({ message }) {
      setLoading(false);
      addErrorToast(message);
    }
  };

  useEffect(() => {
    loadTags();
  }, []);

  return (
    <footer>
      <Navbar
        bg="dark"
        className="text-uppercase py-1 footer-tags"
        collapseOnSelect
        expand="lg"
        fixed="bottom"
        variant="dark"
      >
        <div className="container-fluid px-0">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="my-1" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto flex-wrap">
              {tags.map((tag) => (
                <button
                  className={`text-uppercase nav-link ${activeTag === tag ? 'active' : ''}`}
                  onClick={() => SetActiveTag(tag)}
                  type="button"
                >
                  {tag}
                </button>
              ))}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <Loading isLoadingShown={loading} />
    </footer>
  );
};

const mapStateToProps = (state) => ({
  activeTag: state.tags && state.tags.activeTag,
});

const mapDispatchToProps = (dispatch) => ({
  SetActiveTag: (tag) => dispatch(SetActiveTags(tag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
