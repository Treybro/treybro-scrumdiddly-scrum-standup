//	Main React Import
import React, { Component } from "react";
//	React native components
import {
	Text,
	View,
	ListView,
} from "react-native";

//	Import components
import DrawerHeader from "./drawerHeader";
import DrawerListItem from "./drawerListItem";

//	Styles for this component
import styles from "../styles/drawerStyle";

class Drawer extends Component {

	//	Validate proptypes
	static propTypes = {

		navigation: React.PropTypes.object,
	};

	//	Default constructor
	constructor (props) {

		super (props);
		const dataSource = new ListView.DataSource ({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {

			dataSource: dataSource.cloneWithRows (["Options 1","Options 2","Options 3","Options 4","Options 5",
				"Options 6","Options 7","Options 8","Options 9","Options 10",
				"Options 11","Options 12","Options 13","Options 14","Options 15"]),
		};
	}

	render () {

		return (

			<View style={styles.containerView}>
				<DrawerHeader />
				<ListView
					dataSource={this.state.dataSource}
					renderRow={(rowData, sectionID, rowID, highlightRow) => <DrawerListItem listItemRowId={rowID} listItemData={rowData} navigator={this.props.navigation}/>}/>
			</View>
		);
	}
}

export default Drawer;