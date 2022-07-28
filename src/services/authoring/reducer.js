import { UPDATE_AUTHORING } from './actionTypes';

const initialState = {
  isAuthoring: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AUTHORING:
      return {
        ...state,
        isAuthoring: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
