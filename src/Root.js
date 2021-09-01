import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { fetchIsAuthoring } from '@craftercms/ice';
import { addAuthoringSupport } from '@craftercms/ice';

import store from './services/store';

function Root({ children, initialState = {} }) {
  useEffect(() => {
    fetchIsAuthoring().then((isAuthoring) => {
      if (isAuthoring) {
        // This is a react example but you may use addAuthoringSupport outside of react
        addAuthoringSupport().then(() => {
          // Feel free to discard the promise if you don't need
          console.log('Authoring tools have loaded and are ready to use.');
        });
      }
    });
  }, []);

  return (
    <Provider store={store(initialState)}>{children}</Provider>
  );
}

export default Root;
