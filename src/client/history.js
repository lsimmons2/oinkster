
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import fetchOinks from './actions/fetch-oinks-actions'
import fetchUserSummary from './actions/fetch-user-summary'
import store from './store'


function listenToLocation(location){
  let path = location.pathname;
  if (path === '/board'){
    return store.dispatch(fetchOinks());
  }
  if (path.slice(0,6) === '/user/'){
    let id = path.slice(6);
    return store.dispatch(fetchUserSummary(id));
  }
  return;
}

const history = syncHistoryWithStore(browserHistory, store);

history.listen(location => listenToLocation(location));

export default history
