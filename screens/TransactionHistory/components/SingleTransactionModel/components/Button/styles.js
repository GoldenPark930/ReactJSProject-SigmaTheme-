import { StyleSheet } from 'react-native';

import { scale } from '../../../../../../utils/helpers';
import * as Colors from '../../../../../../constants/colors';

export default StyleSheet.create({
  globalWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  likeWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(92.5),
    height: scale(30),
    marginVertical: scale(10),
    marginRight: scale(10),
    backgroundColor: Colors.CALM,
    borderRadius: 5,
  },
  commentWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(92.5),
    height: scale(30),
    marginVertical: scale(10),
    marginRight: scale(10),
    backgroundColor: Colors.RED,
    borderRadius: 5,
  },
  text: {
    fontSize: 13,
    color: Colors.WHITE,
  },
});
