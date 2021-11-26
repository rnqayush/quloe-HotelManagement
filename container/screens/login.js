import React, { useState } from 'react';

import {

    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Dimensions,
    TextInput,
    StatusBar
} from 'react-native';
import axios from 'axios';

import * as actions from "../redux/action/action"
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width


const Login = (props) => {
    console.log('this is only', props)

    const [userName, setUserName] = useState('')
    const [Password, setPassword] = useState('')


    const loginCheck = async () => {

        // >>> checking username

        if (userName.length == 0) {
            Alert.alert(
                "Oops ",
                "User Name could not be empty",
                [

                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            )

        }
        else {

            // >>> password check
            if (Password.length == 0) {
                Alert.alert(
                    "Oops ",
                    "password could not be empty",
                    [

                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                )

            }
            else {
                /** login credential in form of formdata  */

                const loginFormData = new FormData();
                loginFormData.append("company_email", userName)
                loginFormData.append("password", Password)

                /** login credential in form of formdata  */
                let response = await axios({
                    method: "post",
                    url: "http://hotel.quloe.info/apimanager-login",
                    data: loginFormData,
                    headers: { "Content-Type": "multipart/form-data" }, /** headers is given to give credential in formdata */
                })
                console.log(response.data.success)

                if (response.data.success == "true") {
                    if (!response.data.type) {
                        response.data.type = "manager"
                    }

                    props.login(response.data)  // saving data to props with reducers 
                    props.navigation.navigate('managerHome')
                    try {
                        await AsyncStorage.setItem('email', userName)
                        await AsyncStorage.setItem('password', Password)


                    } catch (e) {
                        console.log("its error",e);
                    }
                    

                }
                else {
                    // if user is not valid 
                    const loginData = new FormData();
                    loginData.append("emp_email", userName)
                    loginData.append("password", Password)


                    let response = await axios({
                        method: "post",
                        url: "http://hotel.quloe.info/apiemployee-login",
                        data: loginData,
                        headers: { "Content-Type": "multipart/form-data" }, /** headers is given to give credential in formdata */
                    })
                    console.log(response.data.success)

                    if (response.data.success == "true") {
                        if (!response.data.type) {
                            response.data.type = "employee"
                        }
                        console.log("ayushhhhhhhhhhhhhhhhhhhhhh", response.data.type);
                        props.login(response.data)  // saving data to props with reducers 
                        props.navigation.navigate('userScreen')
                       
                            try {
                                await AsyncStorage.setItem('email', userName)
                                await AsyncStorage.setItem('password', Password)


                            } catch (e) {
                                console.log("its error",e);
                            }

                            
                        


                    }
                    else {
                        Alert.alert(
                            "Oops ",
                            "Invalid user name or password",
                            [

                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                        )

                    }




                }
            }
        }
    }
    return (

        <View style={{ backgroundColor: 'black', width: width, height: height, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
            <StatusBar hidden={true} />
            <Text style={{ color: "white", position: "absolute", top: 20, alignSelf: 'center', fontSize: 20, fontWeight: '600' }}>
                Login
            </Text>

            <View
                style={[
                    {
                        height: 40,
                        width: "90%",
                        borderRadius: 20,
                        borderBottomColor: "gray",
                        borderBottomWidth: 1,
                        marginBottom: 25,
                        backgroundColor: 'white',
                        paddingLeft: 10,
                        paddingRight: 10,
                    },

                ]}
            >
                <TextInput
                    underlineColorAndroid="transparent"
                    style={{
                        flex: 1,
                        padding: 0,
                        //height: 20,
                        // opacity: 0.6,
                        fontFamily: "SegoeUI",
                        fontSize: 15,
                        fontWeight: "normal",
                        fontStyle: "normal",
                        // lineHeight: Platform.OS == "ios" ? 22 : 37,
                        letterSpacing: 0,
                        textAlign: "center",
                        color: "#000"
                    }}
                    placeholderTextColor='gray'
                    placeholder='Email'
                    keyboardType="default"
                    returnKeyType="done"

                    value={userName}
                    onChangeText={setUserName}
                />
            </View>

            <View
                style={[
                    {
                        height: 40,
                        width: "90%",
                        borderRadius: 20,
                        borderBottomColor: "gray",
                        borderBottomWidth: 1,
                        marginBottom: 25,
                        backgroundColor: 'white',
                        paddingLeft: 10,
                        paddingRight: 10,
                    },

                ]}
            >
                <TextInput
                    underlineColorAndroid="transparent"
                    style={{
                        flex: 1,
                        padding: 0,
                        //height: 20,
                        // opacity: 0.6,
                        fontFamily: "SegoeUI",

                        fontSize: 15,
                        fontWeight: "normal",
                        fontStyle: "normal",
                        // lineHeight: Platform.OS == "ios" ? 22 : 37,
                        letterSpacing: 0,
                        textAlign: "center",
                        color: "#000"
                    }}
                    placeholder='Password'
                    placeholderTextColor='gray'
                    keyboardType="default"
                    returnKeyType="done"
                    secureTextEntry={true}
                    value={Password}
                    onChangeText={setPassword}
                />
            </View>
            <TouchableOpacity
                style={{
                    height: 40,
                    width: "90%",
                    borderRadius: 20,
                    borderBottomColor: "gray",
                    borderBottomWidth: 1,
                    marginBottom: 10,
                    backgroundColor: 'gray',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: 10,
                    paddingRight: 10,
                }}
                onPress={() => loginCheck()}
            >
                <Text style={{ color: 'white' }}>
                    Login
                </Text>
            </TouchableOpacity>

        </View>



    );
}

const styles = StyleSheet.create({


});

const mapStateToProps = (state) => {

    const { logindetail } = state

    return {
        logindetail: logindetail
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => dispatch(actions.login({ data: data })),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
