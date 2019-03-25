import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import CustomIcon from '../../../../../constants/fonts/custom_icons';
import PlaceholderData from '../../../../../store/constants/hardcoded-data/creadit-cards';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | User settings -> Banks & Cards
 |
 | Credit cards list
 |------------------------------------------------------------------------------
 */

const { shape, number, string, bool, arrayOf, oneOf, oneOfType } = PropTypes;

class CreditCardsList extends Component {
  static propTypes = {
    cards: arrayOf(shape({
      id: number.isRequired,
      type: oneOf(['visa', 'mastercard']).isRequired,
      number: string.isRequired,
      expiring: oneOfType([string, bool]).isRequired,
    })),
  };

  static defaultProps = {
    cards: PlaceholderData,
  };

  /*
   |----------------------------------------------------------------------------
   | Component lifecycle methods
   |----------------------------------------------------------------------------
   */

  shouldComponentUpdate() {
    return false;
  }

  /*
   |----------------------------------------------------------------------------
   | Actions handlers
   |----------------------------------------------------------------------------
   */

  onPressPlaceholder = () => {
    Alert.alert(
      'temporary alert',
      'the handler for this button is not implemented yet',
      [{ text: 'close' }],
    );
  };

  /*
   |----------------------------------------------------------------------------
   | Helper functions
   |----------------------------------------------------------------------------
   */

  renderCreditCardsList = () =>
    this.props.cards.map((card, index) => (
      <View
        key={card.id}
        style={[
          styles.cardInfoWrapper,
          index !== this.props.cards.length - 1 && styles.withBottomBorder,
        ]}
      >
        <View style={styles.cardInfoDescription}>
          <View style={styles.cardIconWrapper}>
            <CustomIcon name={card.type} style={[styles.cardIcon, styles[card.type]]} />
          </View>

          <Text style={styles.cardNumber}>
            {card.number}
          </Text>

          {card.expiring && (
            <Text style={styles.cardExpiring}>
              expiring on {card.expiring}
            </Text>
          )}
        </View>

        <TouchableWithoutFeedback onPress={this.onPressPlaceholder}>
          <View style={styles.arrowButtonWrapper}>
            <FontAwesome style={styles.arrowButton}>
              {Icons.chevronRight}
            </FontAwesome>
          </View>
        </TouchableWithoutFeedback>
      </View>
    ));

  /*
   |----------------------------------------------------------------------------
   | RENDER
   |----------------------------------------------------------------------------
   */

  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          credit cards
        </Text>

        {this.renderCreditCardsList()}

        <View style={styles.linkButtonWrapper}>
          <TouchableWithoutFeedback onPress={this.onPressPlaceholder}>
            <View style={styles.linkButton}>
              <Text style={styles.linkButtonLabel}>
                link credit card
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

export default CreditCardsList;
