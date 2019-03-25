let _dispatch; // eslint-disable-line

function setDispatch(dispatch) {
  _dispatch = dispatch;
}

function dispatchAction(action) {
  _dispatch(action());
}

export default {
  setDispatch,
  dispatchAction,
};
