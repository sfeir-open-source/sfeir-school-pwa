import { UPDATE_PAGE, UPDATE_PEOPLE_ID } from '../actions/app.js';

const INITIAL_STATE = {
  page: '',
  peopleId: ''
};

const app = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page,
        peopleId: (action.page === 'people' && action.params[0]) || ''
      };
    default:
      return state;
  }
};

export default app;
