const styleSettings = require ("../settings/styleSettings");

const React = require ("react-native");
const { StyleSheet } = React;

module.exports = StyleSheet.create ({

	containerView: {

		flex: 1,
		backgroundColor: styleSettings.pink,
	},
});