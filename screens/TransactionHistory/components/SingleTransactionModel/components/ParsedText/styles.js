import { StyleSheet } from 'react-native';

import { scale } from '../../../../../../utils/helpers';
import { ROYAL } from '../../../../../../constants/colors';
import { NORMAL, BOLD } from '../../../../../../constants/fonts/weight-map';

export default StyleSheet.create({
  descriptionNormal: {
    fontSize: scale(14),
    color: ROYAL,
    fontWeight: NORMAL,
  },

  descriptionBold: {
    fontSize: scale(14),
    color: ROYAL,
    fontWeight: BOLD,
  },
});
