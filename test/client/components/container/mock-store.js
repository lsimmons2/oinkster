
function mockStore(state){
  return {
    default: () => {},
    subscribe: () => {},
    dispatch: () => {},
    getState: () => {
    return { ...state };
    },
  };
}

export default mockStore
