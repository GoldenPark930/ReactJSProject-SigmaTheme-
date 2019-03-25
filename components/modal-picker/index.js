import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import TextStylePropTypes from 'react-native/Libraries/Text/TextStylePropTypes';
import StyleSheetPropType from 'react-native/Libraries/StyleSheet/StyleSheetPropType';

import ModalWithOverlay from 'src/components/modal-with-overlay';
import ComponentErrorList from './errors-list';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Picker in the Modal with overlay component
 |------------------------------------------------------------------------------
 */

const { number, string, func, arrayOf, oneOfType, objectOf, any } = PropTypes;
const TextComponentStylePropTypes = StyleSheetPropType(TextStylePropTypes);

class ModalPicker extends Component {
  static propTypes = {
    // Data
    selectedValue: oneOfType([string, number]).isRequired,
    listData: arrayOf(objectOf(any)).isRequired,
    selectedValueStyle: TextComponentStylePropTypes,
    // Functions
    keyExtractor: func.isRequired,
    labelExtractor: func.isRequired,
    onValueChange: func.isRequired,
  };

  static defaultProps = {
    selectedValueStyle: styles.empty,
  };

  constructor(props) {
    super(props);

    this.componentErrors = {};

    this.state = {
      isModalVisible: false,
      listDataArray: props.listData.map(item => ({
        ...item,
        label: props.labelExtractor(item),
      })),
      listDataObject: props.listData.reduce((prevResult, item) => {
        const key = props.keyExtractor(item);

        if (prevResult[key] && !this.componentErrors[ComponentErrorList.keyExtractor.key]) {
          this.componentErrors[ComponentErrorList.keyExtractor.key] = ComponentErrorList.keyExtractor.text;
        }

        return {
          ...prevResult,
          [key]: {
            ...item,
            label: props.labelExtractor(item),
          },
        };
      }, {}),
    };
  }

  /*
  |-----------------------------------------------------------------------------
  | Component lifecycle methods
  |-----------------------------------------------------------------------------
  */

  componentDidMount() {
    if (Object.keys(this.componentErrors).length > 0) {
      // Object.values(this.componentErrors).map(error => console.warn(error));
    }
  }

  /*
  |-----------------------------------------------------------------------------
  | Actions handlers
  |-----------------------------------------------------------------------------
  */

  scrollViewItemOnPressHandler = (value) => {
    this.closeModalHandler();
    this.props.onValueChange(value);
  };

  closeModalHandler = () => {
    this.setState({ isModalVisible: false });
  };

  openModalHandler = () => {
    this.setState({ isModalVisible: true });
  };

  /*
  |-----------------------------------------------------------------------------
  | Helper functions
  |-----------------------------------------------------------------------------
  */

  renderScrollViewItem = (item, index) => {
    const { selectedValue, keyExtractor } = this.props;

    const value = keyExtractor(item);
    const scrollViewContainerStyles = index < this.state.listDataArray.length - 1
      ? [styles.scrollViewItemContainer, styles.borderedContainer]
      : styles.scrollViewItemContainer;

    return (
      <TouchableWithoutFeedback key={value} onPress={() => this.scrollViewItemOnPressHandler(value)}>
        <View style={scrollViewContainerStyles}>
          <Text style={styles.scrollViewItemLabel}>
            {item.label}
          </Text>

          <FontAwesomeIcon
            name={selectedValue === value ? 'dot-circle-o' : 'circle-o'}
            style={styles.scrollViewItemIcon}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    const { isModalVisible, listDataArray, listDataObject } = this.state;
    const { selectedValue, selectedValueStyle } = this.props;

    return (
      <View>
        <ModalWithOverlay
          animationType="fade"
          visible={isModalVisible}
          onRequestClose={this.closeModalHandler}
        >
          <View style={styles.modalContainer}>
            <ScrollView style={styles.scrollViewContainer}>
              {listDataArray.map(this.renderScrollViewItem)}
            </ScrollView>
          </View>
        </ModalWithOverlay>

        <TouchableWithoutFeedback onPress={this.openModalHandler}>
          <View style={styles.pickerContainer}>
            <Text style={[styles.pickerSelectedValue, selectedValueStyle]}>
              {listDataObject[selectedValue].label}
            </Text>

            <EntypoIcon name="chevron-small-down" style={styles.pickerArrow} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default ModalPicker;
