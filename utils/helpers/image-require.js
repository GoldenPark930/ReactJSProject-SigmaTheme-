/* eslint-disable */

const IMAGES = {
  drawer: require('assets/images/drawer.jpg'),
  payClubLogo: require('assets/images/payClubLogo.png'),
  payClubLogoWhite: require('assets/images/payClubLogo-white.png'),
  myTransactions: require('assets/images/myTransactions.png'),
  friends: require('assets/images/friends.png'),
  cogs: require('assets/images/cogs.png'),
  grinkCollectTogether: require('assets/images/grinkCollectTogether.jpg'),
  grinkCongratulation: require('assets/images/grinkCongratulation.jpg'),
  grinkEmail: require('assets/images/grinkEmail.jpg'),
  grinkHandsUp: require('assets/images/grinkHandsUp.jpg'),
  grinkLogout: require('assets/images/grinkLogout.jpg'),
  grinkName: require('assets/images/grinkName.jpg'),
  grinkPhone: require('assets/images/grinkPhone.jpg'),
  grinkRequest: require('assets/images/grinkRequest.png'),
  grinkUsername: require('assets/images/grinkUsername.jpg'),
  grinkVerification: require('assets/images/grinkVerification.jpg'),
  makeGroup: require('assets/images/makeGroup.png'),
  sideMenuFooterMonster: require('assets/images/sideMenuFooterMosnter.png'),
  welcome: require('assets/images/welcome.jpg'),
  welcomeSlideOne: require('assets/images/welcomeSlideOne.png'),
  welcomeSlideTwo: require('assets/images/welcomeSlideTwo.png'),
  welcomeSlideThree: require('assets/images/welcomeSlideThree.png'),
  signupMonster: require('assets/images/signupMonster.png'),
  helpFooterMonster: require('assets/images/helpFooterMonster.png'),
  helpThankYouMonster: require('assets/images/helpThankYouMonster.png'),
  bankLockIcon: require('assets/images/bankLock.png'),

  // TODO {Maksym}: change default user profile image to something relevant
  defaultUserProfileImage: { uri: 'https://graph.facebook.com/504962589/picture?width=130&height=130' },
};

export default key => IMAGES[key];
