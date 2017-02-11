/**
 * @providesModule DailyTab
 */

//	Main React Import
import React, { Component } from "react";
//	React native components
import {
	Text,
	View,
	Image,
	ScrollView,
	Modal,
} from "react-native";

import Yesterday from "Yesterday";
import Today from "Today";
import Blocker from "Blocker";
import YesterdayItem from "YesterdayItem";

//	Import Scene style
import styles from "./dailyTab.style";
//	Import NavBar Icons
import menuIcon from "../../assets/images/icon-menu.png";

class DailyTab extends Component {

	//	Validate proptypes
	static propTypes = {

		navigation: React.PropTypes.object,
	};

	//	Navigation bar options
	static navigationOptions = {

		title: "Scrum Daily Items",
		header: {

			visible: true,
			title: "Scrum Daily Items",
			right: () => {},
			left: () => {},
			style: {},
			titleStyle: {},
			tintColor: {},
		},
		tabBar: {

			label: "Daily",
			icon: ({ tintColor }) => (

				<Image source={menuIcon} style={{tintColor: tintColor}}/>
			),
		},
	};

	//	Default constructor
	constructor (props) {

		super (props);
		//	TODO - get this into redux
		this.state = {

			showModal: false,
		};
	}

	render () {

		return (

			<View style={styles.containerView}>
				{/*	TODO do this better */}
				<Modal
					style={styles.modal}
					animationType={"slide"}
					transparent={true}
					onShow={() => {}}
					visible={this.state.showModal}
					onRequestClose={() => {this.toggleModal(false);}}>
					<YesterdayItem closeModal={() => {this.toggleModal(false);}}/>
				</Modal>
				<ScrollView>
					<Yesterday showModal={() => {this.toggleModal(true);}}/>
					<View style={styles.card}>
						<Text>
							dkwnadoaw oabdoawbdaowjbd aowkdnawodnawopidnaw pianwdpnawdopanwdop naowdnawopidnaw
						</Text>
					</View>
					<View style={styles.card}>
						<Text>
							dkwnadoaw oabdoawbdaowjbd aowkdnawodnawopidnaw pianwdpnawdopanwdop naowdnawopidnaw
						</Text>
					</View>
					<View style={styles.card}>
						<Text>
							dkwnadoaw oabdoawbdaowjbd aowkdnawodnawopidnaw pianwdpnawdopanwdop naowdnawopidnaw
						</Text>
					</View>
					<View style={styles.card}>
						<Text>
							dkwnadoaw oabdoawbdaowjbd aowkdnawodnawopidnaw pianwdpnawdopanwdop naowdnawopidnaw
						</Text>
					</View>
					<Today />
					<View style={styles.card}>
						<Text>
							dkwnadoaw oabdoawbdaowjbd aowkdnawodnawopidnaw pianwdpnawdopanwdop naowdnawopidnaw
						</Text>
					</View>
					<View style={styles.card}>
						<Text>
							dkwnadoaw oabdoawbdaowjbd aowkdnawodnawopidnaw pianwdpnawdopanwdop naowdnawopidnaw
						</Text>
					</View>
					<View style={styles.card}>
						<Text>
							dkwnadoaw oabdoawbdaowjbd aowkdnawodnawopidnaw pianwdpnawdopanwdop naowdnawopidnaw
						</Text>
					</View>
					<View style={styles.card}>
						<Text>
							dkwnadoaw oabdoawbdaowjbd aowkdnawodnawopidnaw pianwdpnawdopanwdop naowdnawopidnaw
						</Text>
					</View>
					<View style={styles.card}>
						<Text>
							dkwnadoaw oabdoawbdaowjbd aowkdnawodnawopidnaw pianwdpnawdopanwdop naowdnawopidnaw
						</Text>
					</View>
					<Blocker/>
					<View style={styles.card}>
						<Text>
							dkwnadoaw oabdoawbdaowjbd aowkdnawodnawopidnaw pianwdpnawdopanwdop naowdnawopidnaw
						</Text>
					</View>
				</ScrollView>
			</View>
		);
	}

	toggleModal (visible) {
		
		this.setState({showModal: visible});
	}
}

export default DailyTab;