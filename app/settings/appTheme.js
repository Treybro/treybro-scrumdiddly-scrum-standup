/**
 * @providesModule AppTheme
 */

export const AppTheme = {

	blue: "#007A87",
	lightBlue: "#00A2B1",
	pink: "#FF5A5F",
	lightPink: "#FF8D90",
	white: "#FFFFFF",
	darkGrey: "#616161",
	darkerGrey: "#424242",
	lightGrey: "#CED1CC",
	veryLightGrey: "#EEEEEE",
	black: "#000000",
	green: "#DAFF8D",
	lightGreen: "#64DD17",
	darkGreen: "#33691E",
	red: "#FF3439",
	darkRed: "#B71C1C",
	lightRed: "#D50000",
	lightOrange: "#F9A825",
};

export const customCalandarStyle = {

	calendarContainer: {

		backgroundColor: AppTheme.white,
	},
	calendarControls: {

		backgroundColor: AppTheme.white,
	},
	calendarHeading: {

		backgroundColor: AppTheme.white,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderBottomWidth: 0,
	},
	currentDayCircle: {

		backgroundColor: AppTheme.lightBlue,
	},
	currentDayText: {

		color: AppTheme.lightBlue,
	},
	eventIndicator: {

		backgroundColor: AppTheme.lightBlue,
	},
	selectedDayCircle: {

		backgroundColor: AppTheme.lightGrey,
	},
	selectedDayText: {

		color: AppTheme.white,
	},
	weekRow: {

		backgroundColor: AppTheme.white,
	},
	dayButton: {

		backgroundColor: AppTheme.white,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderBottomWidth: 0,
	},
	day: {

		color: AppTheme.darkGrey,
		fontWeight: "bold",
	},
	dayHeading: {

		color: AppTheme.darkGrey,
		borderWidth: 0,
	},
	weekendDayText: {

		color: AppTheme.darkGrey,
		fontWeight: "bold",
	},
	weekendHeading: {

		color: AppTheme.darkGrey,
	},
};

export default AppTheme;