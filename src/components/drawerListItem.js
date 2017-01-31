//	Main React Import
import React, { Component } from "react";
//	React native components
import {
	Text,
	TouchableOpacity,
} from "react-native";

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
	};

	//	Set style based if the button is selected or not
	static isSelected = false;

	//	Default constructor
	constructor (props) {

		super (props);

		this.state =  ({

			selected: false,
		});
		//	Are we showing the screen associated with the drawer option?
		if (this.props.listItemRowId == this.props.navigator.state.index) {

			isSelected = true;
		} else {

			isSelected = false;
		}
	}

	render () {

		if (this.state.selected === true || isSelected === true) {

			return (

				<TouchableOpacity onPress={() => this._navigate ()} style={styles.selectedButton}>
					<Text style={styles.buttonText}>{this.props.listItemData}</Text>
				</TouchableOpacity>
			);
		}

		return (

			<TouchableOpacity onPress={() => this._navigate ()} style={styles.button}>
				<Text style={styles.buttonText}>{this.props.listItemData}</Text>
			</TouchableOpacity>
		);
	}

	_navigate = () => {

		console.log ("Navigate baby");
		this.setState ({

			selected: true,
		});
		this.props.navigator.navigate ("ScreenTwo");
	}
}

export default DrawerHeader;