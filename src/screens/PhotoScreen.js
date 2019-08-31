import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import {Camera} from 'expo-camera';
import {FontAwesome} from '@expo/vector-icons';

export default class PhotoScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            isFlashLight: Camera.Constants.FlashMode.off
        };
    }

    async componentDidMount () {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    flipCamera = () => {
        this.setState({
            type:
                this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front 
                    : Camera.Constants.Type.back
        })
    }

    flashLight = () => {
        this.setState({
            isFlashLight:
                this.state.isFlashLight === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
        })
    }

    takePicture = async () => {
        if(this.camera){
            let photo = await this.camera.takePictureAsync();
            this.props.navigation.navigate("Home", { photo });
        }
    }
    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
          return <View />;
        } else if (hasCameraPermission === false) {
          return <Text>No access to camera</Text>;
        } else {
          return (
            <View style={styles.container}>
                <Camera 
                    style={styles.cameraView}
                    type={this.state.type}
                    flashMode={this.state.isFlashLight}
                    ref={ref => {
                        this.camera=ref
                    }}
                >
                <View style={styles.actionContainer}>
                <TouchableOpacity
                        style={styles.iconHolder}
                        onPress={() => {this.flipCamera()}}
                    >
                        <FontAwesome 
                            name="camera"
                            size={35}
                            style={styles.item}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconHolder}
                        onPress={() => {this.takePicture()}}
                    >
                        <FontAwesome 
                            name="circle"
                            size={35}
                            style={styles.item}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconHolder}
                        onPress={() => {this.flashLight()}}
                    >
                        <FontAwesome 
                            name="flash"
                            size={35}
                            style={styles.item}
                        />
                    </TouchableOpacity>
                </View>
                </Camera>
            </View>
          );
        }
      }
    }

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cameraView: {
        flex: 1
    },
    actionContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "transparent"
    },
    iconHolder: {
        flex:1,
        alignItems: "center",
        alignSelf: "flex-end"
    },
    item: {
        marginBottom: 10,
        color: "#FFF"
    }
})