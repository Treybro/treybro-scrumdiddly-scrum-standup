const styleSettings = require ("../settings/styleSettings");

const React = require ("react-native");
const { StyleSheet } = React;

module.exports = StyleSheet.create ({

	navbar: {

		backgroundColor: styleSettings.pink,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        height: 64,
        elevation: 3,
        position: 'relative',
    },
    title: {

    	color: styleSettings.white,
		fontSize: 19,
		fontFamily: 'HelveticaNeue',
		fontWeight: '500',
		alignSelf: 'center',
    },
    navLeftIcon: {

    	tintColor: styleSettings.white,
    	marginLeft: 15,
    	marginRight: 15,
    },
    navRightIcon: {

    	tintColor: styleSettings.white,
    	marginLeft: 15,
    	marginRight: 15,
    },
});