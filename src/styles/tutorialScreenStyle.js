const styleSettings = require ('../settings/styleSettings');

const React = require ('react-native');
const { StyleSheet } = React;

module.exports = StyleSheet.create ({

  wrapper: {

  },
  slide1: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: styleSettings.pink,
  },
  slide2: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: styleSettings.pink,
  },
  slide3: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: styleSettings.pink,
  },
  text: {

    color: styleSettings.white,
    fontSize: 30,
    fontWeight: 'bold',
  },
  enterButton: {

    backgroundColor: styleSettings.darkGrey,
    height: 30,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
  }
});