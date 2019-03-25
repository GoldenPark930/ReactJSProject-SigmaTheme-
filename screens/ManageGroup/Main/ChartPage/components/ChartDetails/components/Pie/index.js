import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { View, Text } from 'react-native';
import { VictoryPie } from 'victory-native';
import { isOwnerOrAdmin } from '../../../../../../../../constants/users/roles';
import Currency from '../../../../../../../../components/currency';

import { BLUE, CALM, RED } from '../../../../../../../../constants/colors';
import styles from './styles';

/**
 |------------------------------------------------------------------------------
 | Pie -> ChartDetails
 |
 | Content view
 |------------------------------------------------------------------------------
 */

const Pie = ({ data, groupRole }) => {
  const {
    title,
    count,
    totals,
    creationDate,
  } = data;
  const total = totals.collected + totals.uncollected + totals.declined;
  const stats = parseInt(totals.collected / total * 1000) / 10;
  return (
    <View style={styles.wrapper}>
      <View style={styles.pieContainer}>
        <View style={styles.statsContainer}>
          <Text style={styles.stats}>{`${stats}`}</Text>
          <Text style={styles.percentSymbol}>%</Text>
        </View>
        <VictoryPie
          width={140}
          height={140}
          padding={0}
          style={{ labels: { fontSize: 0 } }}
          data={[
            { x: ' ', y: totals.collected },
            { x: ' ', y: totals.uncollected + totals.declined },
          ]}
          innerRadius={62}
          padAngle={1}
          colorScale={['#00D7AC', '#666', '#f44236']}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.date}>
            Created: {moment(creationDate).format('MMM Do, YYYY @ h:mma ')}
        </Text>
        { data.dueDate ?
          <Text style={styles.date}>
            Due: NOW
          </Text> : null }
      </View>
      { isOwnerOrAdmin(groupRole) ?
        <View style={styles.detailsContainer}>
          <View style={[styles.detailsSideColumnContainer, {
            paddingLeft: 20,
          }]}
          >
            <Text style={[styles.detailsTitleText, { color: BLUE }]}>
             Paid
            </Text>
            <Text style={[styles.detailsNumbersText, { color: BLUE }]}>
              {`${data.data.collected}/${count}`}
            </Text>
          </View>
          <View style={styles.detailsMiddleColumnContainer}>
            <Text style={[styles.detailsTitleText, { color: CALM }]}>
              Total Collected
            </Text>
            <Currency
              color={CALM}
              amount={totals.collected % 1 === 0 ?
                totals.collected :
                totals.collected.toFixed(2)}
              numberSize={20}
            />
          </View>
          <View style={[styles.detailsSideColumnContainer, {
            paddingHorizontal: 10,
          }]}
          >
            <Text style={[styles.detailsTitleText, { color: RED }]}>
              Total Outstanding
            </Text>
            <Currency
              color={RED}
              amount={totals.uncollected % 1 === 0 ?
                totals.uncollected :
                totals.uncollected.toFixed(2)}
              numberSize={22}
            />
          </View>
        </View>
        : null }
    </View>
  );
};

const { shape, string, number, object } = PropTypes;

Pie.propTypes = {
  data: shape({
    title: string.isRequired,
    count: number.isRequired,
    totals: object.isRequired,
    data: object.isRequired,
  }).isRequired,
  groupRole: string.isRequired,
};

export default Pie;
