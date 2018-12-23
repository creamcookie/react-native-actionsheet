/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';

import ActionSheet from 'react-native-ccs-actionsheet';

type Props = {};
export default class App extends Component<Props> {

	state = {

	};

	constructor(props) {
		super(props);
	}

	showActionSheet() {
		ActionSheet.show(["Reload", "Stop Remote JS Debugging", "Enable Live Reload", "Enable Hot Reloading", "Toggle ", "Show Pref", "Start/"], 1)
			.then(r => {
				alert(JSON.stringify(r));
			})
			.catch(e => {
//				alert("error..");
			});
	}

	render() {
		return (
			<View style={styles.container}>

				<TouchableOpacity onPress={() => this.showActionSheet() } style={ styles.button }>
					<Text>showActionSheet</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},

	loading : {
		...StyleSheet.absoluteFill, 
		zIndex: 10, 
		backgroundColor: 'rgba(0,0,0,0.8)', 
		alignItems: 'center', 
		justifyContent: 'center'
	},

	button: {
		borderColor: '#000', 
		borderWidth: 1, 
		padding: 10, 
		width: 200, 
		margin: 10,
	}
});
