import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './component/profile';

function HomeScreen(navigation) {
	const DATA = [
		{
			id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
			title: 'First Item',
			name: 'Alex',
			age: 40,
			gender: 'male',
			picture: 'https://randomuser.me/api/portraits/med/men/22.jpg'
		}
	];

	const [ userDetails, setUserDetails ] = useState(DATA);

	const renderItem = ({ item }) => {
		return <Profile name={item.name} age={item.age} picture={item.picture} gender={item.gender} />;
	};

	const addUser = () => {
		var request = new XMLHttpRequest();

		request.open('GET', 'https://randomuser.me/api/?inc=gender,name,picture,login');
		request.responseType = 'json';
		request.send();
		request.onload = function() {
			let name = request.response.results[0].name.first + ' ' + request.response.results[0].name.last;
			let picture = request.response.results[0].picture.medium;
			let gender = request.response.results[0].gender;
			let id = request.response.results[0].login.uuid;
			setUserDetails([
				...userDetails,
				{
					id: id,
					title: 'New Item',
					name: name,
					gender: gender,
					picture: picture
				}
			]);
		};
  };
  
  const goodbye = () => {
    setUserDetails([]);
  };

  
  // useEffect(() => {
	// 	navigation.setOptions({
	// 		headerRight: () => <Button onPress={addUser} title="Add Friends" />,
	// 		headerLeft: () => <Button onPress={goodbye} title="Reset" />
	// 	});
	// });

	return (
		<View>
			<Button title="Add Friends" onPress={addUser} />
      <Button title="Bye Friends" onPrese={goodbye} />
			<FlatList
				data={userDetails}
				renderItem={renderItem}
				numColumns={3}
				// keyExtractor={item => item.id}
			/>
		</View>
	);
}

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Random Friends" component={HomeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
