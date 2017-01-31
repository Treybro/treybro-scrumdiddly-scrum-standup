const styleSettings = require ("../settings/styleSettings");

const React = require ("react-native");
const { StyleSheet } = React;

module.exports = StyleSheet.create ({
	
	headerContainer: {

		height: 175,
		backgroundColor: styleSettings.white,
		justifyContent: "center",
		alignItems: "center",
	},
	headerImage: {

		height: 100,
		width: 100,
	},
	headerText: {

		color: styleSettings.lightBlue,
	},
});