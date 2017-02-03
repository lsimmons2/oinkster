
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { fetchOinks, fetchBoardProfile } from './actions/board-actions'
import { fetchUsers } from './actions/users-actions'
import { fetchUserSummary } from './actions/profile-actions'
import { fetchSettings } from './actions/settings-actions'
import store from './store'


function listenToLocation(location){
  let path = location.pathname;
  if (path === '/board'){
    if (localStorage.getItem('userId')){
      store.dispatch(fetchBoardProfile(localStorage.getItem('userId')));
      return store.dispatch(fetchOinks(localStorage.getItem('jwt')));
    }
    return store.dispatch(fetchOinks());
  }
  if (path === '/allusers'){
    return store.dispatch(fetchUsers());
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
