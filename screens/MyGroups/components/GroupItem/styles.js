import { StyleSheet } from 'react-native';

import * as Colors from '../../../../constants/colors';
import { REGULAR, LIGHT, SEMIBOLD, REGULAR_IT } from '../../../../constants/fonts';

export default StyleSheet.create({
  groupItem: {
    borderRadius: 5,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    margin: 10,
    marginRight: 15,
    elevation: 5,
    paddingRight: 0,
    borderLeftColor: Colors.GREEN,
    borderLeftWidth: 5,
  },
  groupItemHeaderContainer: {
    flexDirection: 'row',
  },
  groupItemHeaderDetails: {
    flex: 1,
    alignItems: 'stretch',
    paddingLeft: 20,
  },
  groupItemHeaderThumbnailContainer: {
    alignItems: 'flex-end',
  },
  clubDetails: {
    fontSize: 12,
    fontFamily: LIGHT,
    flexDirection: 'row',
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: 110,
    opacity: 0.75,
    top: -10,
    left: 0,
  },
  backgroundImageMask: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: 110,
    top: -10,
    left: 0,
  },
  groupBody: {
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
  },
  thumbnailContainer: {
    flexDirection: 'row',
  },
  groupThumbnail: {
    width: 55,
    height: 55,
    borderWidth: 0,
    borderColor: Colors.WHITE,
    borderRadius: 55 / 2,
    marginTop: 2,
    marginLeft: 2,
  },
  groupThumbnailBorder: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.GREEN,
    borderWidth: 3, 
    borderRadius: 32.5,
    width: 65,
    height: 65,
    marginRight: 15,
    position: 'relative',
  },
  groupThumbnailBadge: {
    
  },
  groupOwnerThumbnailBorder: {
    backgroundColor: Colors.WHITE,
    borderColor: Colors.GREEN,
    borderWidth: 1.5, 
    borderRadius: 15,
    width: 30,
    height: 30,
    marginLeft: -5,
    marginTop: 5,
    marginRight: 5,
  },
  groupOwnerThumbnail: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    marginTop: 1,
    marginLeft: 1,
  },
  createdBy: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 8,
    backgroundColor: 'transparent',
  },
  ownerName: {
    fontSize: 10,
    fontWeight: '700',
    backgroundColor: 'transparent',
    fontFamily: REGULAR,
    marginBottom: 5,
    color: Colors.GREY,
  },
  groupName: {
    color: Colors.ROYAL,
    fontSize: 28,
    fontFamily: REGULAR,
    fontWeight: '100',
    backgroundColor: 'transparent',
    marginBottom: 3,
    marginTop: 5,
  },
  lock: {
    color: Colors.ROYAL,
    backgroundColor: 'transparent',
    fontSize: 30,
    marginTop: 5,
  },
  lockContainer: {
    width: 28,
    height: 10,
    marginLeft: 5,
  },
  spacer: {
    flex: 1,
  },
  groupMiddleSection: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.LIGHT_GREY,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  groupBalance: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: 'transparent',

  },
  currencyTitle: {
    fontSize: 8,
    color: Colors.BLUE,
    fontWeight: '700',
    fontFamily: REGULAR,
  },
  creationDate: {
    fontSize: 10,
    textAlign: 'center',
    flex: 1,
    marginTop: 10,
  },
  seeMore: {
    marginBottom: 10,
  },
  clubTypeContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    flexDirection: 'row',
  },
  clubTypeText: {
    backgroundColor: 'transparent',
    color: Colors.BLACK,
    flex: 1,
    fontFamily: REGULAR,
    fontSize: 8,
  },
  clubTypeIcon: {
    color: Colors.BLACK,
    flex: 1,
    marginTop: -2,
    marginLeft: 3,
  },
  clubDetailsOwner: {
    marginTop: 5,
    flexDirection: 'row',
  },
  clubOwner: {
    fontFamily: SEMIBOLD,
    lineHeight: 30,
    height: 30,
    alignItems: 'center',
    fontSize: 12,
  },
  clubSeparator: {
    fontFamily: REGULAR,
    lineHeight: 30,
    height: 30,
    alignItems: 'center',
    fontSize: 12,
  },
  clubOwnerUsername: {
    fontFamily: REGULAR_IT,
    lineHeight: 30,
    height: 30,
    alignItems: 'center',
    fontSize: 12,
  },
  clubDetailsBalance: {
    alignItems: 'flex-end',
    flex: 1,
    marginTop: 4,
  }
});

