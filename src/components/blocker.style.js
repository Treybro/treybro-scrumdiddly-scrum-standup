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
		height: 50,
		backgroundColor: theme.white,
		justifyContent: (Platform.OS === 'ios') ? 'center' : 'center',
		alignItems: (Platform.OS === 'ios') ? 'center' : 'flex-start',
	},
	blockerText: {

		color: theme.lightBlue,
		marginLeft: (Platform.OS === 'ios') ? 0 : 10,
	},
});