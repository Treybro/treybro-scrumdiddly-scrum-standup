/**
 * @providesModule YesterdayModal
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	Modal,
	StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { showYesterdayModal, closeYesterdayModal } from "YesterdayModalActions";

import theme from "AppTheme";
import YesterdayModalContent from "YesterdayModalContent";

/*
*	Displays the Today heading
*/
export class YesterdayModal extends Component {

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
				<YesterdayModalContent />
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

	displayModal: state.yesterdayModalReducer.displayModal,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	showModal: () => dispatch (showYesterdayModal ()),
	closeModal: () => dispatch (closeYesterdayModal ()),
});

export default connect (mapStateToProps,mapDispatchToProps)(YesterdayModal);