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

import theme from "AppTheme";
import getIconAsset from "IconAssets";

/*
*	Allows the user to add a Yesterday Item
*/
export class MenuButton extends Component {

	static propTypes = {

		navDrawer: React.PropTypes.object.isRequired,
	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<View style={styles.leftNavIconContainer}>
				<TouchableOpacity onPress={() => this._openDrawer ()}>
					<Image source={getIconAsset ("menuIcon")} style={styles.leftNavIcon} resizeMode={"stretch"}/>
				</TouchableOpacity>
			</View>
		);
	}

	_openDrawer () {

		this.props.navDrawer.navigate ("DrawerOpen");
	}
}

const styles = StyleSheet.create({

	leftNavIconContainer: {

		height: 25,
		width: 25,
		marginLeft: (Platform.OS === "ios") ? 20 : 15,
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

export default connect (mapStateToProps, null)(MenuButton);