/**
 * @providesModule BlockerModal
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	Modal,
	StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { showBlockerModal, closeBlockerModal } from "BlockerModalActions";

import theme from "AppTheme";
import BlockerModalContent from "BlockerModalContent";

/*
*	Displays the Blocker heading
*/
export class BlockerModal extends Component {

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
				<BlockerModalContent />
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

	displayModal: state.blockerModalReducer.displayModal,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	showModal: () => dispatch (showBlockerModal ()),
	closeModal: () => dispatch (closeBlockerModal ()),
});

export default connect (mapStateToProps,mapDispatchToProps)(BlockerModal);