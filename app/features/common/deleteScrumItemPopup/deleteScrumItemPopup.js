/**
 * @providesModule DeleteScrumItemPopup
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

	hideDeleteScrumItemModal,
} from "ModalActions";

import {

	deleteScrumItem,
} from "ScrumHistoryActions";

import theme from "AppTheme";
import getIconAsset from "IconAssets";

class DeleteScrumItemPopup extends Component {

	//	Validate proptypes
	static propTypes = {

		deleteScrumItemPopupToggle: React.PropTypes.bool.isRequired,
		hideDeleteScrumItemModal: React.PropTypes.func.isRequired,
		scrumItemDetails: React.PropTypes.object.isRequired,
		deleteScrumItem: React.PropTypes.func.isRequired,
	};

	//	Default constructor
	constructor (props) {

		super (props);
	}

	render () {

		return (

			<Modal
				animationType={"fade"}
				onShow={() => console.log ("Modal Popup!")}
				transparent={true}
				visible={this.props.deleteScrumItemPopupToggle}
				onRequestClose={() => this._hideModal ()}>
				<View style={styles.containerView}>
					<View style={styles.deleteScrumItemView}>
						<Image 
							source={getIconAsset ("binIcon")}
							resizeMode={"stretch"}
							style={styles.icon}/>
						<Text style={styles.headerText}>Delete Scrum Item?</Text>
						<Text style={styles.messageText}>Once it's gone... it's gone...</Text>
						<View style={styles.buttonContainer}>
							<TouchableOpacity 
								onPress={() => this._hideModal ()}
								style={styles.cancelButton}>
								<Text style={styles.cancelButtonText}>CANCEL</Text>
							</TouchableOpacity>
							<TouchableOpacity 
								onPress={() => this._deleteItem ()}
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

		this.props.hideDeleteScrumItemModal ();
	}

	//	Deletes the scrum item
	_deleteItem () {

		this.props.deleteScrumItem (this.props.scrumItemDetails.scrumId, this.props.scrumItemDetails.scrumItemId, this.props.scrumItemDetails.scrumItemType);
		this.props.hideDeleteScrumItemModal ();
	}
}

const styles = StyleSheet.create({

	containerView: {

		flex: 1,
		backgroundColor: "rgba(33,33,33,0.4)",
		alignItems: "center",
		justifyContent: "center",
	},
	deleteScrumItemView: {

		width: 250,
		height: 250,
		backgroundColor: theme.pink,
		borderRadius: 5,
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
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		flexDirection: "row",
	},
	cancelButton: {

		width: 125,
		height: 50,
		backgroundColor: theme.white,
		alignItems: "center",
		justifyContent: "center",
		borderBottomLeftRadius: 5,
	},
	cancelButtonText: {

		color: theme.pink,
		fontSize: 14,
		fontWeight: "bold",
	},
	okButton: {

		width: 125,
		height: 50,
		backgroundColor: theme.white,
		alignItems: "center",
		justifyContent: "center",
		borderBottomRightRadius: 5,
	},
	okButtonText: {

		color: theme.pink,
		fontSize: 14,
		fontWeight: "bold",
	},
	icon: {

		marginTop: 20,
		height: 80,
		width: 50,
		tintColor: theme.white,
	},
});

const mapStateToProps = state => ({

	deleteScrumItemPopupToggle: state.modalReducer.toggleDeleteScrumItemModal,
	scrumItemDetails: state.modalReducer.scrumItemDetails,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	hideDeleteScrumItemModal: () => dispatch (hideDeleteScrumItemModal ()),
	deleteScrumItem: (scrumId, itemId, itemType) => dispatch (deleteScrumItem (scrumId, itemId, itemType)),
});

export default connect(mapStateToProps,mapDispatchToProps)(DeleteScrumItemPopup);