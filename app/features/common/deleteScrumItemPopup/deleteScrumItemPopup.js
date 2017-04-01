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

//	TODO - get rid of this
import { deleteYesterdayItem } from "YesterdayListActions";
//	TODO - get rid of this
import { deleteTodayItem } from "TodayListActions";

import {

	hideDeleteScrumItemModal,
} from "ModalActions";

import {

	deleteScrumItem,
} from "ScrumHistoryActions";

import theme from "AppTheme";

class DeleteScrumItemPopup extends Component {

	//	Validate proptypes
	static propTypes = {

		deleteScrumItemPopupToggle: React.PropTypes.bool.isRequired,
		hideDeleteScrumItemModal: React.PropTypes.func.isRequired,
		scrumItemDetails: React.PropTypes.object.isRequired,
		deleteScrumItem: React.PropTypes.func.isRequired,
		deleteYesterdayItem: React.PropTypes.func.isRequired,
		deleteTodayItem: React.PropTypes.func.isRequired,
	};

	//	Default constructor
	constructor (props) {

		super (props);
	}

	render () {

		if (this.props.deleteScrumItemPopupToggle === false) {

			return null;
		}

		return (

			<Modal
				animationType={"fade"}
				transparent={true}
				visible={this.props.deleteScrumItemPopupToggle}
				onRequestClose={() => this._hideModal ()}>
				<View style={styles.containerView}>
					<View style={styles.deleteScrumItemView}>
						<Image 
							source={require("../../../assets/images/icons/icon-bin@3x.png")}
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

		//	TODO - refactor this
		if (this.props.scrumItemDetails.scrumId === "yesterday-item" || this.props.scrumItemDetails.scrumId === "today-item") {

			//	If its a yesterday item
			if (this.props.scrumItemDetails.scrumId === "yesterday-item") {
				
				this.props.deleteYesterdayItem (this.props.scrumItemDetails.scrumItemId);
			} else {

				this.props.deleteTodayItem (this.props.scrumItemDetails.scrumItemId);
			}
		} else {

			this.props.deleteScrumItem (this.props.scrumItemDetails.scrumId, this.props.scrumItemDetails.scrumItemId, this.props.scrumItemDetails.scrumItemType);
		}
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
	cancelButton: {

		width: 125,
		height: 50,
		backgroundColor: theme.white,
		alignItems: "center",
		justifyContent: "center",
		borderBottomLeftRadius: 10,
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
		borderBottomRightRadius: 10,
	},
	okButtonText: {

		color: theme.darkGrey,
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

	deleteScrumItemPopupToggle: state.modalReducer.showDeleteScrumItemModal,
	scrumItemDetails: state.modalReducer.scrumItemDetails,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	hideDeleteScrumItemModal: () => dispatch (hideDeleteScrumItemModal ()),
	deleteScrumItem: (scrumId, itemId, itemType) => dispatch (deleteScrumItem (scrumId, itemId, itemType)),
	deleteYesterdayItem: (itemId) => dispatch (deleteYesterdayItem (itemId)),
	deleteTodayItem: (itemId) => dispatch (deleteTodayItem (itemId)),
});

export default connect(mapStateToProps,mapDispatchToProps)(DeleteScrumItemPopup);