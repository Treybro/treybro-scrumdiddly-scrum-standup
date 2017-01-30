const styleSettings = require ("../settings/styleSettings");

const React = require ("react-native");
const { StyleSheet } = React;

module.exports = StyleSheet.create ({

	containerView: {

		flex: 1,
		backgroundColor: styleSettings.pink,
		justifyContent: "center",
		alignItems: "center",
	},
	welcomeText: {

		fontSize: 25,
		color: styleSettings.white,
		width: 250,
	},
	enterButton: {

		backgroundColor: styleSettings.blue,
		width: 250,
		height: 50,
		marginTop: 10,
	},
	enterButtonText: {

		color: styleSettings.white,
		marginLeft: 10,
	}
});