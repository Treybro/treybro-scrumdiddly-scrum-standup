const styleSettings = require ("../settings/styleSettings");

const React = require ("react-native");
const { StyleSheet } = React;

module.exports = StyleSheet.create ({

	containerView: {

		flex: 1,
		backgroundColor: styleSettings.white,
	},
	navbar: {

		backgroundColor: styleSettings.pink,
        justifyContent: 'center',
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
    card: {

        marginVertical: 5,
        flex: 1,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#DDD',
        flexWrap: 'wrap',
        borderBottomWidth: 0,
        backgroundColor: styleSettings.white,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 2
    }
});