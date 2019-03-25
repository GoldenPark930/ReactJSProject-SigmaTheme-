import React from 'react';
import SafeAreaView from '../../components/safe-area-view';

/**
 * HOC function that wrapping needed component in SafeAreaView
 * @param WrappedComponent component that will be wrapped in SafeAreaView
 * @param disableSide Pass 'bottom' or 'top' string param to disable preferable side. 
 * For example, we don't need top side of SafeAreaView in gradientHeader or the bottom side in MyGroups screen, 
 * but if some side is disabled it should be handled IPhone X locally
 * @returns {React.Component} returns enhanced component wrraped in SafeAreaView
 */
export default function withSafeAreaView(WrappedComponent, disableSide) {
  return class EnhancedComponent extends React.Component {
    render() {
      return (
        <SafeAreaView disableSide={disableSide}>
          <WrappedComponent {...this.props} />
        </SafeAreaView>
      );
    }
  };
}
