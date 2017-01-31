const styleSettings = require ("../settings/styleSettings");

const React = require ("react-native");
const { StyleSheet } = React;

module.exports = StyleSheet.create ({

	button: {

		height: 50,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	selectedButton: {

		height: 50,
		justifyContent: "center",
		alignItems: "flex-start",
		backgroundColor: styleSettings.blue,
	},
	buttonText: {

		fontSize: 18,
		color: styleSettings.white,
		paddingLeft: 8,
	},
});