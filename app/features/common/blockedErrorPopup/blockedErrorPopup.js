/**
 * @providesModule BlockedErrorPopup
 */

//	Main React Import
import React, { Component } from "react";
//	React native components
import {

	View,
	StyleSheet,
	Text,
	Modal,
	TouchableOpacity,
	Image,
} from "react-native";
import { connect } from "react-redux";

import {

	hideBlockedErrorModal,
} from "ModalActions";

import theme from "AppTheme";

class BlockedErrorPopup extends Component {

	//	Validate proptypes
	static propTypes = {

		showBlockedErrorModal: React.PropTypes.bool.isRequired,
		hideBlockedErrorModal: React.PropTypes.func.isRequired,
	};

	//	Default constructor
	constructor (props) {

		super (props);
	}

	render () {

		if (this.props.showBlockedErrorModal === false) {

			return null;
		}

		return (

			<Modal
				animationType={"fade"}
				transparent={true}
				visible={this.props.showBlockedErrorModal}
				onRequestClose={() => this._hideModal ()}>
				<View style={styles.containerView}>
					<View style={styles.blockedErrorView}>
						<Image 
							source={require("../../../assets/images/icons/icon-warning@3x.png")}
							resizeMode={"stretch"}
							style={styles.icon}/>
						<Text style={styles.headerText}>Item is blocked!</Text>
						<Text style={styles.messageText}>Items cannot be completed while they are blocked.</Text>
						<View style={styles.buttonContainer}>
							<TouchableOpacity 
								onPress={() => this._hideModal ()}
								style={styles.okButton}>
								<Text style={styles.okButtonText}>OK</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		);
	}

	//	Hides the modal
	_hideModal () {

		this.props.hideBlockedErrorModal ();
	}
}

const styles = StyleSheet.create({

	containerView: {

		flex: 1,
		backgroundColor: "rgba(33,33,33,0.4)",
		alignItems: "center",
		justifyContent: "center",
	},
	blockedErrorView: {

		width: 250,
		height: 250,
		backgroundColor: theme.lightOrange,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	headerText: {

		color: theme.white,
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 15,
	},
	messageText: {

		color: theme.white,
		height: 50,
		marginTop: 15,
		marginLeft: 15,
		marginRight: 15,
	},
	buttonContainer: {

		backgroundColor: theme.white,
		height: 50,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		flexDirection: "row",
	},
	okButton: {

		width: 250,
		height: 50,
		backgroundColor: theme.white,
		alignItems: "center",
		justifyContent: "center",
		borderBottomRightRadius: 10,
		borderBottomLeftRadius: 10,
	},
	okButtonText: {

		color: theme.darkGrey,
		fontSize: 14,
		fontWeight: "bold",
	},
	icon: {

		marginTop: 20,
		height: 80,
		width: 80,
		tintColor: theme.white,
	},
});

const mapStateToProps = state => ({

	showBlockedErrorModal: state.modalReducer.showBlockedErrorModal,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	hideBlockedErrorModal: () => dispatch (hideBlockedErrorModal ()),
});

export default connect(mapStateToProps,mapDispatchToProps)(BlockedErrorPopup);