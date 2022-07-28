import React from 'react';
import { connect } from 'react-redux';
import { crafterConf } from '@craftercms/classes';
import { fetchIsAuthoring, initExperienceBuilder } from '@craftercms/experience-builder';

import Shelf from '../Shelf';
import Filter from '../Shelf/Filter';
import GithubCorner from '../github/Corner';
import FloatCart from '../FloatCart';

import { updateAuthoring } from '../../services/authoring/actions';

const siteName = process.env.REACT_APP_CRAFTERCMS_SITE_ID;
if (typeof siteName === 'undefined') {
  throw new Error('The value of `REACT_APP_CRAFTERCMS_SITE_ID` is not defined. Did you create a `.env` file and declare the `REACT_APP_CRAFTERCMS_SITE_ID` variable?');
} else if (siteName === '') {
  throw new Error('The site name value of is blank. Set `REACT_APP_CRAFTERCMS_SITE_ID=YOUR_SITE_NAME` in your .env file.');
}

crafterConf.configure({
  baseUrl: process.env.REACT_APP_CRAFTERCMS_BASE_URL ?? '',
  site: siteName,
  cors: true,
});

const App = ({ updateAuthoring }) => {
  React.useEffect(() => {
    // Check if we're in authoring
    fetchIsAuthoring().then((isAuthoring) => {
      // If we're in authoring, initialize XB
      if (isAuthoring) {
        initExperienceBuilder();
        updateAuthoring(true);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <GithubCorner />
      <main>
        <Filter />
        <Shelf />
      </main>
      <FloatCart />
    </React.Fragment>
  );
};

export default connect(
  null,
  { updateAuthoring },
)(App);
