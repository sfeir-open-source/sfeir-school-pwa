export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_PEOPLE_ID = 'UPDATE_PEOPLE_ID';

export const navigate = path => dispatch => {
  // Extract the page name from path.
  const page = path === '/' ? 'home' : path.slice(1);

  dispatch(loadPage(page.split('/')));
};

const loadPage = ([page, ...params]) => dispatch => {
  switch (page) {
    case 'home':
      import('../components/HomeComponent.js');
      break;
    case 'people':
      import('../components/PeopleListComponent.js');
      break;
    default:
      page = 'home';
      import('../components/HomeComponent.js');
  }
  dispatch(updatePage(page, params));
};

const updatePage = (page, params) => {
  return {
    type: UPDATE_PAGE,
    page,
    params
  };
};
