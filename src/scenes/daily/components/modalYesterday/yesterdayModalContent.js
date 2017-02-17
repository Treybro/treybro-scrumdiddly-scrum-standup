/**
 * @providesModule YesterdayModalContent
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
import { closeYesterdayModal } from "YesterdayModalActions";

import theme from "AppTheme";
import closeIcon from "../../../../assets/images/icon-remove.png";

/*
*	Allows the user to create a new
*	Yesterday Item.
*	TODO - get this into redux
*/
class YesterdayModalContent extends Component {

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
						<Image source={closeIcon} style={styles.closeIcon}/>
					</TouchableOpacity>
				</View>
				<View style={styles.contentView}>
					<Text>Hello World!</Text>
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

	closeModal: () => dispatch (closeYesterdayModal ()),
});

export default connect (null,mapDispatchToProps)(YesterdayModalContent);
