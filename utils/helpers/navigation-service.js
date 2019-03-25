import { NavigationActions } from 'react-navigation';

let _navigator;  // eslint-disable-line
let debounce;

function setNavigator(navigator) {
  _navigator = navigator;
}

function reset(routeName) {
  _navigator.dispatch(
    NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName }),
      ],
    }),
  );
}

function navigate(routeName) {
  _navigator.dispatch(
    NavigationActions.navigate({ routeName }),
  );
}

function navigateWithDebounce(routeName, params, action) {
  const func = () => {
    if (debounce) {
      return;
    }

    _navigator.dispatch(NavigationActions.navigate({
      routeName,
      params,
      action,
    }));

    debounce = setTimeout(() => {
      debounce = 0;
    }, 1000);
  };
  return func();
}

export default {
  navigateWithDebounce,
  setNavigator,
  navigate,
  reset,
};
