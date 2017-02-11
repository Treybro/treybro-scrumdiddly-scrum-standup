const theme = require ("AppTheme");

//  React native imports
const React = require ("react-native");
const { StyleSheet } = React;
//  Used to detect the platform
import { Platform } from "react-native";

//  The component stylesheet
module.exports = StyleSheet.create ({

	viewContainer: {

		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		flexDirection: "column",
	},
	contentView: {

		margin: (Platform.OS === "ios") ? 50 : 50,
		height: 150,
		backgroundColor: theme.white,
		opacity: 1,
	},
	closeContainer: {

		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: 22,
	},
	closeIcon: {

		tintColor: theme.white,
		marginRight: 22,
	},
});