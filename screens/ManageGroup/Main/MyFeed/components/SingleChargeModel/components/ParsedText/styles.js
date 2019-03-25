import { StyleSheet } from 'react-native';

import { scale } from '../../../../../../../../utils/helpers';
import { ROYAL } from '../../../../../../../../constants/colors';
import { NORMAL, BOLD } from '../../../../../../../../constants/fonts/weight-map';
import { REGULAR } from '../../../../../../../../constants/fonts';

export default StyleSheet.create({
  descriptionNormal: {
    fontSize: scale(14),
    color: ROYAL,
    fontWeight: NORMAL,
    fontFamily: REGULAR,
  },

  descriptionBold: {
    fontSize: scale(14),
    color: ROYAL,
    fontWeight: BOLD,
    fontFamily: REGULAR,
  },
});
