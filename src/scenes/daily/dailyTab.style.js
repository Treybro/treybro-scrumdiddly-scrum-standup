const styleSettings = require ("AppTheme");

const React = require ("react-native");
const { StyleSheet } = React;

module.exports = StyleSheet.create ({

	containerView: {

		flex: 1,
		backgroundColor: styleSettings.white,
	},
	//  Get this out of here
	card: {

		marginVertical: 5,
		flex: 1,
		borderWidth: 1,
		borderRadius: 2,
		borderColor: "#DDD",
		flexWrap: "wrap",
		borderBottomWidth: 0,
		backgroundColor: styleSettings.white,
		shadowColor: "#000",
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.1,
		shadowRadius: 1.5,
		elevation: 2,
	},
	//  Get this out of here
	modal: {

		flex: 1,
		flexDirection: "column",
	},
});