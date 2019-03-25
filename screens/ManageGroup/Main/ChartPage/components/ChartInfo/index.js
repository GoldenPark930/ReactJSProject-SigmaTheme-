import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { VictoryPie } from 'victory-native';
import { isOwnerOrAdmin, ALL_ROLES } from '../../../../../../constants/users/roles';
import * as Colors from '../../../../../../constants/colors';
import Currency from '../../../../../../components/currency';

import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | ChartInfo -> ChartPage
 |
 | Content view
 |------------------------------------------------------------------------------
 */

const { shape, func, string, number, object, oneOf } = PropTypes;

class ChartInfo extends Component {
  static propTypes = {
    onDetails: func.isRequired,
    data: shape({
      title: string.isRequired,
      count: number.isRequired,
      totals: object.isRequired,
      data: object.isRequired,
    }).isRequired,
    group: shape({
      role: oneOf(ALL_ROLES).isRequired,
    }),
  };

  /*
  |-----------------------------------------------------------------------------
  | Helper functions
  |-----------------------------------------------------------------------------
  */

  onDetails() {
    if (this.props.onDetails) this.props.onDetails();
  }

  /*
  |-----------------------------------------------------------------------------
  | RENDER
  |-----------------------------------------------------------------------------
  */

  render() {
    const {
      title,
      count,
      totals,
      data,
    } = this.props.data;
    const { group } = this.props;
    const total = totals.collected + totals.uncollected + totals.declined;
    const stats = parseInt(totals.collected / total * 1000) / 10;
    const outstanding = totals.uncollected + totals.declined;

    return (
      <TouchableOpacity style={styles.wrapper} onPress={() => this.onDetails()} >
        <View style={styles.pieContainer}>
          <View style={styles.statsContainer}>
            <Text style={styles.stats}>{`${stats}`}</Text>
            <Text style={styles.percentSymbol}>%</Text>
          </View>
          <VictoryPie
            width={80}
            height={80}
            padding={0}
            style={{ labels: { fontSize: 0 } }}
            data={[
              { x: ' ', y: totals.collected },
              { x: ' ', y: totals.uncollected + totals.declined },
            ]}
            innerRadius={32}
            padAngle={1}
            colorScale={['#00D7AC', '#666', '#f44236']}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          { isOwnerOrAdmin(group.role) ?
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <View style={styles.chartItem}>
                <Text style={{ color: Colors.BLUE, fontSize: 10 }}>Paid</Text>
                <Text style={{ color: Colors.BLUE, fontWeight: '700' }}>{data.collected}/{count}</Text>
              </View>
              <View style={styles.chartItem}>
                <Text style={{ color: Colors.CALM, fontSize: 10 }}>Collected</Text>
                <Text style={{ color: Colors.CALM, fontWeight: '700' }}>${totals.collected % 1 === 0 ? totals.collected : totals.collected.toFixed()}</Text>
              </View>
              <View style={[styles.chartItem, { borderRightWidth: 0 }]}>
                <Text style={{ color: Colors.RED, fontSize: 10 }}>Outstanding</Text>
                <Currency
                  color={Colors.RED}
                  amount={outstanding % 1 === 0 ?
                    outstanding :
                    outstanding.toFixed(2)}
                  numberSize={14}
                />
              </View>
            </View>
            :
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <View style={[styles.chartItem, { borderRightWidth: 0 }]}>
                <Text style={{ color: Colors.BLUE, fontSize: 10 }}>Paid</Text>
                <Text style={{ color: Colors.BLUE, fontWeight: '700' }}>{data.collected}/{count}</Text>
              </View>
            </View>
          }
        </View>
        <View style={{ width: 10 }}>
          <Icon name="ios-arrow-forward" style={{ fontSize: 22 }} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default ChartInfo;
