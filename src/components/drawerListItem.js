//	Main React Import
import React, { Component } from "react";
//	React native components
import {
	Text,
	TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { selectedListItem } from "../actions/drawerActions";

//	Styles for this component
import styles from "../styles/drawerListItemStyle";

/*
*	Responsible for displaying each
*	item within the nav drawer
*/
class DrawerHeader extends Component {

	//	Validate proptypes
	static propTypes = {

		listItemData: React.PropTypes.string,
		navigator: React.PropTypes.object,
		selectListItem: React.PropTypes.func,
	};

	//	Set style based if the button is selected or not
	static isSelected = false;

	//	Default constructor
	constructor (props) {

		super (props);
	}

	render () {

		if (this.props.selected === true) {

			return (

				<TouchableOpacity onPress={this.props.selectListItem} style={styles.selectedButton}>
					<Text style={styles.buttonText}>{this.props.listItemData}</Text>
				</TouchableOpacity>
			);
		}

		return (

			<TouchableOpacity onPress={this._navigate} style={styles.button}>
				<Text style={styles.buttonText}>{this.props.listItemData}</Text>
			</TouchableOpacity>
		);
	}

	_navigate = () => {

		this.props.selectListItem ();
		this.props.navigator.navigate ("ScreenTwo");
	}
}

//  Redux functions mapping
const mapDispatchToProps = dispatch => ({

	selectListItem: () => {

		dispatch(selectedListItem());
	},
});

//  Redux state mapping
const mapStateToProps = state => ({

	selected: state.selected,
});


//  Wire this component to redux with our state and dispatch mappings
export default connect (mapStateToProps, mapDispatchToProps)(DrawerHeader);