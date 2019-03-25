import { StyleSheet, Dimensions } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import * as Colors from '../../constants/colors';
import { REGULAR } from '../../constants/fonts';

const { width, height } = Dimensions.get('window');
const modalHeight = 250;
const isSE = width <= 320;
// on Android
const isSmall = height <= 600;

export default StyleSheet.create({
  // container: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   paddingHorizontal: 16,
  //   backgroundColor: Colors.WHITE,
  // },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 70,
    paddingBottom: 16,
  },
  radioButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  groupThumbnail: {
    width: 55,
    height: 55,
    marginRight: 10,
  },
  starBackground: {
    backgroundColor: Colors.CALM,
    position: 'absolute',
    bottom: 0,
    right: 10,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  star: {
    color: Colors.WHITE,
    backgroundColor: 'transparent',
    fontSize: 14,
    position: 'absolute',
    bottom: 2.5,
    right: 13.5,
  },
  radioForm: {
    width: '100%',
    height: 250,
    marginLeft: 15,
    marginTop: 30,
  },
  radioContainer: {
    width: 300,
    height: 60,
    marginLeft: 15,
  },
  radioTitle: {
    width: 250,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  radioDescription: {
    width: 250,
    lineHeight: 12,
    fontSize: 10,
    color: Colors.BLACK,
  },
  mainContainer: {
    marginHorizontal: 20,
    marginTop: 50,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clubName: {
    borderColor: 'transparent',
    borderBottomColor: '#dddce2',
    borderWidth: 2,
    textAlign: 'center',
    height: 60,
    width: '100%',
    fontFamily: REGULAR,
    fontWeight: '100',
    fontSize: 28,
  },
  cameraIconContainer: {
    width: 100,
    height: 100,
    marginTop: 50,
    marginBottom: 50,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  cameraIcon: {
    width: '100%',
    height: '100%',
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  editClubContainer: {
    width: '100%',
    marginHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  editClubButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    flex: 1,
  },
  editClubButtonText: {
    color: Colors.CALM,
    fontFamily: REGULAR,
    flex: 1,
    marginTop: 27,
  },
  modalContainer: {
    width,
    height: modalHeight,
    marginTop: height - modalHeight,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    ...ifIphoneX({
      marginTop: height - modalHeight - 80,
    }),
  },
  modalHeader: {
    marginTop: 10,
    borderBottomColor: Colors.LIGHT_GREY,
    borderBottomWidth: 2,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    height: 64,
  },
  modalHeaderTitle: {
    justifyContent: 'center',
    width: '100%',
    fontFamily: REGULAR,
  },
  modalContent: {
    marginHorizontal: 16,
    height: modalHeight - 64,
    justifyContent: 'center',
    fontFamily: REGULAR,
  },
  modalListItem: {
    flexDirection: 'row',
    marginVertical: 10,
    fontFamily: REGULAR,
  },
  itemLeft: {
    width: '90%',
  },
  itemRight: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTextTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.ROYAL,
    fontFamily: REGULAR,
  },
  itemTextDescription: {
    fontSize: 10,
    color: Colors.ROYAL,
    fontFamily: REGULAR,
  },

  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  addPhotoButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    marginTop: isSE || isSmall ? 25 : 50,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
  },
  photoImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  addPhotoIcon: {
    fontSize: 25,
    marginBottom: 5,
    color: '#cccccc',
  },
  addPhotoText: {
    color: '#cccccc',
  },
  enterClubInput: {
    height: isSE || isSmall ? 55 : 60,
    width: '90%',
    marginTop: isSE || isSmall ? 0 : 25,
    borderBottomWidth: 2,
    borderBottomColor: '#dddce2',
    textAlign: 'center',
    fontFamily: REGULAR,
    fontWeight: '100',
    fontSize: isSE || isSmall ? 25 : 28,
  },
  enterClubTopicInput: {
    height: isSE || isSmall ? 15 : 20,
    width: '90%',
    marginTop: isSE || isSmall ? 10 : 20,
    textAlign: 'center',
    fontFamily: REGULAR,
    fontWeight: '100',
    fontSize: isSE || isSmall ? 14 : 15.5,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  footerTextContainer: {
    width: '80%',
    paddingHorizontal: 8,
    paddingBottom: 8,
    backgroundColor: Colors.WHITE,
  },
  footerTitleText: {
    fontSize: isSE || isSmall ? 12 : 14,
    fontWeight: 'bold',
    fontFamily: REGULAR,
    color: Colors.ROYAL,
  },
  footerdDescriptionText: {
    fontSize: isSE || isSmall ? 8 : 10,
    fontFamily: REGULAR,
    color: Colors.ROYAL,
  },
  editButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    fontFamily: REGULAR,
    color: Colors.CALM,
  },
});
