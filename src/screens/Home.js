import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';

export default class Home extends Component {

    static navigationOptions = {
        title: "PhotoClicker"
    }
    render(){
        const photo = this.props.navigation.getParam("photo", "empty")
        return (
            <View style={styles.container}>
              <Image 
                resizeMode="center"
                source={
                    photo === 'empty' ? require("C:/Documents/React-Native/photoClicker/assets/logo.png") : photo
                }
                style={styles.image}
              />
              <Button 
                title= "Camera"
                style={{marginTop: 10}}
                onPress={() => {
                    this.props.navigation.navigate("PhotoScreen");
                }}
              />
            </View>
        );
    }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
      alignSelf: "center",
      height: 500,
      margin: 20
  }
});