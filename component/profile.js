import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';

export default function Profile(props){
    console.log(props);


    
    return(
        <View>
        <Image style={styles.tinyLogo}
        //   source={{ uri: 'https://reactnative.dev/img/tiny_logo.png',}}
        // source = {props.picture}
        source = {{uri: props.picture}}
        />
        {/* <Text>Name:{props.picture}</Text> */}
            <Text>{props.name}</Text>
            <Text>{props.gender}</Text>
        </View>
    );
}

const screenWidth = Dimensions.get('window').width;
const numColumns = 3;
const tileSize = screenWidth / numColumns;

const styles = StyleSheet.create({
    tinyLogo:{
        borderWidth:1,
        width:tileSize, 
        height:tileSize,
    }
})

