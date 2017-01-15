
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { fetchOinks } from './actions/board-actions'
import { fetchUserSummary } from './actions/fetch-user-summary'
import { fetchSettings } from './actions/settings-actions'
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
  if (path.slice(0,10) == '/settings/'){
    let id = path.slice(10);
    return store.dispatch(fetchSettings(id));
  }
  return;
}

const history = syncHistoryWithStore(browserHistory, store);

history.listen(location => listenToLocation(location));

export default history
