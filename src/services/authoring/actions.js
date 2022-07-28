
import { UPDATE_AUTHORING } from './actionTypes';

export const updateAuthoring = isAuthoring => ({
  type: UPDATE_AUTHORING,
  payload: isAuthoring
});