/**
 * @providesModule BackButton
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
export class BackButton extends Component {

	static propTypes = {

		backNavigation: React.PropTypes.object.isRequired,
	};

	constructor (props) {

		super (props);
	}

	render () {

		return (

			<TouchableOpacity onPress={() => this._back ()}>
				<View style={styles.leftNavIconContainer}>
					<Image source={getIconAsset ("backIcon")} style={styles.leftNavIcon} resizeMode={"stretch"}/>
				</View>
			</TouchableOpacity>
		);
	}

	_back () {

		this.props.backNavigation.navigate ("TabOne");
	}
}

const styles = StyleSheet.create({

	leftNavIconContainer: {

		height: 50,
		width: 50,
		marginLeft: (Platform.OS === "ios") ? 0 : 0,
		alignItems: "center",
		justifyContent: "center",
	},
	leftNavIcon: {

		tintColor: theme.white,
		height: 15,
		width: 10,
	},
});

/*
* Mapping for redux state.
*/
const mapStateToProps = state => ({

	backNavigation: state.blockerHistoryReducer.backNavigation,
});

export default connect (mapStateToProps, null)(BackButton);