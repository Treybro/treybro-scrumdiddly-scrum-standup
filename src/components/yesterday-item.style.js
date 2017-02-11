const theme = require ('AppTheme');

//  React native imports
const React = require ('react-native');
const { StyleSheet } = React;
//  Used to detect the platform
import { Platform } from 'react-native';

//  The component stylesheet
module.exports = StyleSheet.create ({

	viewContainer: {

		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	contentView: {

		margin: 50,
		height: 150,
		backgroundColor: theme.white,
		opacity: 1,
	}
});