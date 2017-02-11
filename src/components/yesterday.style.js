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
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	yesterdayText: {

		color: theme.lightBlue,
		marginLeft: 10,
		marginRight: 10,
	},
	addButton: {

		marginLeft: 10,
		marginRight: 10,
	},
	addButtonImage: {

		tintColor: theme.lightBlue,
	}
});