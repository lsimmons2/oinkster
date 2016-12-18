
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import fetchOinks from './actions/fetch-oinks-actions'
import store from './store'


function listenToLocation(location){
  switch(location.pathname){
    case '/board':
      return store.dispatch(fetchOinks());
    default:
      return;
  }
}

const history = syncHistoryWithStore(browserHistory, store);

history.listen(location => listenToLocation(location));

export default history
