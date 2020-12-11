import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderHeightContext } from '@react-navigation/stack';
import Profile from './component/profile';

function HomeScreen({ navigation }) {
	// Hooks for userDetails 
	const [ userDetails, setUserDetails ] = useState(DATA);
	
	// required by FlatList. The Data to display 
	const DATA = [
		{
			id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
			name: 'Alex Gibson',
			gender: 'male',
			picture: 'https://randomuser.me/api/portraits/men/22.jpg',
			email: 'Alex.gibson@example.com',
			age: '23',
		}
	];


	// required by FlatList to render the rows
	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity onPress={() => navigation.navigate('Details', {...item})}>
				<Profile picture={item.picture} />
			</TouchableOpacity>
		);
	};

	const addUser = () => {
		// API Link to get the random user 
		var request = new XMLHttpRequest();

		request.open('GET', 'https://randomuser.me/api/?inc=gender,name,picture,login,email,dob');
		request.responseType = 'json';
		request.send();
		request.onload = function() {
			let name = request.response.results[0].name.first + ' ' + request.response.results[0].name.last;
			let picture = request.response.results[0].picture.large;
			let gender = request.response.results[0].gender;
			let id = request.response.results[0].login.uuid;
			let email = request.response.results[0].email;
			let age = request.response.results[0].dob.age;
			
			// Hooks for setting the state 
			setUserDetails([
				...userDetails,
				{
					id: id,
					name: name,
					gender: gender,
					picture: picture,
					email: email,
					age: age,
				}
			]);
		};
	};

	//function for Resetting the images
	const goodbye = () => {
		setUserDetails([]);
	};

	//useEffect
	useEffect(() => {
		navigation.setOptions({
			headerRight: () => <Button onPress={addUser} title="Add Friends" />,
			headerLeft: () => <Button onPress={goodbye} title="Reset" />
		});
	});

	return (
		<View>
			<FlatList
				data={userDetails}
				renderItem={renderItem}
				numColumns={3}
			/>
		</View>
	);
}

function DetailsScreen({route}){

	// Destructing of data. You extract the data that you need from the array 
	const {id, name, gender, picture, email, age} = route.params;
	return(
		<View style={styles.container}>
			<Image source={{uri: picture}} style={styles.image} />
			{/* <Text style={styles.id}>{id}</Text> */}
			<Text style={styles.name}>{name}</Text>
			<Text style={styles.restOfText}>{email}</Text>
			<Text style={styles.restOfText}>{age}, {gender}</Text>
			{/* <Text style={styles.restOfText}>{age}</Text> */}
		</View>
	);
}

const Stack = createStackNavigator();

export default function App() {
	return (

		// React Navigation 
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Random Friends" component={HomeScreen} />
				<Stack.Screen name="Details" component={DetailsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: "center",
		justifyContent: "flex-start",
	},
	image:{
		width:128,
		height:120,
		borderRadius:100,
		borderWidth:2,
		margin:50,
		marginTop:120,
	},
	name:{
		fontSize:30,
	},
	id:{
		fontSize:15,
		color:"grey",
	},
	restOfText:{
		fontSize:20,
	}
});
