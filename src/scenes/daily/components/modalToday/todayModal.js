/**
 * @providesModule TodayModal
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	Modal,
	StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { showTodayModal, closeTodayModal } from "TodayModalActions";

import theme from "AppTheme";
import TodayModalContent from "TodayModalContent";

/*
*	Displays the Today heading
*/
export class TodayModal extends Component {

	static propTypes = {

		displayModal: React.PropTypes.bool,
		showModal: React.PropTypes.func,
		closeModal: React.PropTypes.func,
	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<Modal
				style={styles.modal}
				animationType={"slide"}
				transparent={true}
				onShow={() => {}}
				visible={this.props.displayModal}
				onRequestClose={() => {this.props.closeModal ();}}>
				<TodayModalContent />
			</Modal>
		);
	}
}

const styles = StyleSheet.create({

	modal: {

		flex: 1,
		flexDirection: "column",
	},
});

/*
* Mapping for redux state.
*/
const mapStateToProps = state => ({

	displayModal: state.todayModalReducer.displayModal,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	showModal: () => dispatch (showTodayModal ()),
	closeModal: () => dispatch (closeTodayModal ()),
});

export default connect (mapStateToProps,mapDispatchToProps)(TodayModal);