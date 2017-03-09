/**
 * @providesModule MenuButton
 */

//  Import items from react
import React, { Component } from "react";
//  Import items from react-native
import {

	Image,
	View,
	StyleSheet,
	TouchableOpacity,
	Platform,
} from "react-native";
import { connect } from "react-redux";
import {

	openDrawer,
} from "DrawerActions";

import theme from "AppTheme";
import getIconAsset from "IconAssets";

/*
*	Allows the user to add a Yesterday Item
*/
export class MenuButton extends Component {

	static propTypes = {

		navDrawer: React.PropTypes.object.isRequired,
		openDrawer: React.PropTypes.func.isRequired,
	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<TouchableOpacity onPress={() => this._openDrawer ()}>
				<View style={styles.leftNavIconContainer}>
					<Image source={getIconAsset ("menuIcon")} style={styles.leftNavIcon} resizeMode={"stretch"}/>
				</View>
			</TouchableOpacity>
		);
	}

	_openDrawer () {

		this.props.openDrawer ();
	}
}

const styles = StyleSheet.create({

	leftNavIconContainer: {

		height: 50,
		width: 50,
		marginLeft: (Platform.OS === "ios") ? 10 : 5,
		alignItems: "center",
		justifyContent: "center",
	},
	leftNavIcon: {

		tintColor: theme.white,
		height: 15,
		width: 25,
	},
});

const mapStateToProps = state => ({

	navDrawer: state.drawerReducer.drawer,
});

/*
* Mapping for redux dispatch functions.
*/
const mapDispatchToProps = dispatch => ({

	openDrawer: () => dispatch (openDrawer ()),
});

export default connect (mapStateToProps, mapDispatchToProps)(MenuButton);