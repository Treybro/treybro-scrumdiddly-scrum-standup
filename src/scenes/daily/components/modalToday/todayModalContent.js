/**
 * @providesModule TodayModalContent
 */

 //	Main React Import
import React, { Component } from "react";
//	React native components
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	StyleSheet,
	Platform,
} from "react-native";
import { connect } from "react-redux";
import { closeTodayModal } from "TodayModalActions";

import theme from "AppTheme";
import getIconAsset from "IconAssets";

/*
*	Allows the user to create a new
*	Today Item.
*	TODO - get this into redux
*/
class TodayModalContent extends Component {

	//	Validate proptypes
	static propTypes = {

		closeModal: React.PropTypes.func,
	};

	//	Default constructor
	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.viewContainer}>
				<View style={styles.closeContainer}>
					<TouchableOpacity onPress={() => this.props.closeModal ()}>
						<Image source={getIconAsset ("removeIcon")} style={styles.closeIcon}/>
					</TouchableOpacity>
				</View>
				<View style={styles.contentView}>
					<Text>Today Modal</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({

	viewContainer: {

		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		flexDirection: "column",
	},
	contentView: {

		flex: 1,
		margin: (Platform.OS === "ios") ? 50 : 50,
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

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	closeModal: () => dispatch (closeTodayModal ()),
});

export default connect (null,mapDispatchToProps)(TodayModalContent);
