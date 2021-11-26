
import axios from 'axios';
import React, { useState } from 'react';
import Toast, { BaseToast } from 'react-native-toast-message';
import {

    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    TextInput,
    ScrollView,
    Image,
    Modal,
    FlatList


} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker'

import * as actions from "../redux/action/action"
import { connect } from 'react-redux';


const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

let f1 = require("../assets/f1.jpeg")
let f2 = require("../assets/f2.jpeg")
let f3 = require("../assets/f3.jpeg")
let f4 = require("../assets/f4.jpeg")
let f5 = require("../assets/f5.jpeg")
let f6 = require("../assets/f6.jpeg")
let f7 = require("../assets/f7.jpeg")
let f8 = require("../assets/f8.jpeg")
let f9 = require("../assets/f9.jpeg")
let f10 = require("../assets/f10.jpeg")
let f11 = require("../assets/f11.jpeg")



const AddUser = (props) => {





    console.log(props.logindetail.data.managerid)



    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [number, setNumber] = useState()

    const [address, setAddress] = useState()
    const [image, setImage] = useState()
    const [frame, setFrame] = useState()
    const [model, setModel] = useState(false)


    const imageframe = [f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11]









    const toastConfig = {
        /* 
          overwrite 'success' type, 
          modifying the existing `BaseToast` component
        */
        success: ({ text1, props, ...rest }) => (
            <BaseToast
                {...rest}
                style={{ borderLeftColor: 'green', width: width / 2 }}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                text1Style={{
                    fontSize: 18,
                    fontWeight: '400',
                    color: 'green'

                }}
                text1={text1}

            />
        ),

        /*
          Reuse the default ErrorToast toast component
        */
        error: (props) => (
            <ErrorToast
                {...props}
                text1Style={{
                    fontSize: 17
                }}
                text2Style={{
                    fontSize: 15
                }}
            />
        ),
        /* 
          or create a completely new type - `my_custom_type`,
          building the layout from scratch
        */
        my_custom_type: ({ text1, props, ...rest }) => (
            <View style={{ height: 60, width: width / 2, backgroundColor: 'orange', alignSelf: 'center', zIndex: 0 }}>
                <Text>{text1}</Text>
            </View>
        )
    };



    function selectImage(type) {



        if (type == "image") {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,

            }).then(response => {
                if (!response.name || response.filename) {
                    response.filename = response.path.split('/').pop()
                }
                if (!response.type) {
                    response.type = 'image/jpeg'
                }

                if (!response.uri) {
                    response.uri = response.path
                }

                console.log(response)

                setImage(response)
            }).catch((err) => {
                console.log(err)
            })

        }


    }



    function selectFrame(f) {

        setFrame(f)



    }

    async function save() {
        console.log('enter');
        console.log(image);
        console.log(frame)

        var data = new FormData();
        data.append('managerid', (props.logindetail.data.managerid));
        data.append('emp_name', name);
        data.append('emp_email', email);
        data.append('emp_mobile', number);
        data.append('password', password);
        data.append('eimage', { type: "image/jpg", uri: image.uri, name: image.path.split('/').pop() });
        data.append('eframe', { type: "image/jpg", uri: Image.resolveAssetSource(frame).uri, name: `${frame}.jpeg` });

        console.log(data)

        await axios({
            method: "post",
            url: "http://hotel.quloe.info/apimanager-employee-register",
            data: data,
            headers: { "Content-Type": "multipart/form-data" }, /** headers is given to give credential in formdata */
        }).then((res) => {
            if (res.data.success == "true") {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: "saved",

                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 30,
                })
                setTimeout(function () { props.navigation.navigate('managerHome') }, 3000);


            } else {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: res.data.message,

                    visibilityTime: 3000,
                    autoHide: true,
                    topOffset: 30,
                })

            }
        })












    }








    return (
        <View style={{ height: height, flex: 1 }}>
            <Toast style={{ zIndex: 1 }} config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
            <ScrollView>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('managerHome')}
                    style={{ position: 'absolute', right: 5, top: 5, width: 25, height: 25, backgroundColor: 'lightgrey', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginTop: 3 }} >
                    <Text>X</Text>
                </TouchableOpacity>

                <View style={{ width: width, flexDirection: 'row', flex: 1 }}>
                    <View style={{ width: '35%' }} >
                        <View style={{ height: 144 }} />
                        <View style={[styles.detailContainer, { marginTop: 10, paddingLeft: 15 }]}>
                            <View style={{ justifyContent: 'center', height: 24 }}>
                                <Text style={styles.detailText} >
                                    Name
                                </Text>

                            </View>

                            <View style={{ justifyContent: 'center', height: 34 }}>
                                <Text style={styles.detailText} >
                                    Email
                                </Text>

                            </View>
                            <View style={{ justifyContent: 'center', height: 34 }}>
                                <Text style={styles.detailText}>
                                    Password
                                </Text>

                            </View>
                            <View style={{ justifyContent: 'center', height: 34 }}>
                                <Text style={styles.detailText} >
                                    Contact Number
                                </Text>

                            </View>
                            <View style={{ justifyContent: 'center', height: 34 }}>
                                <Text style={styles.detailText} >
                                    Address
                                </Text>

                            </View>
                        </View>
                    </View>

                    <View style={{ width: '70%', flex: 1 }}>
                        <View style={{ width: 200, height: 155 }}>



                            <Text style={{ margin: 1, fontWeight: '700', alignSelf: 'center' }} >Add Member</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                <View style={{ width: 90 }}>
                                    <View style={styles.box}>
                                        <Image source={image} style={{ width: 85, height: 90, }} />

                                    </View>
                                    <TouchableOpacity
                                        onPress={() => selectImage('image')}
                                        style={{ height: 25, width: 85, marginTop: 5, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ alignSelf: "center", color: 'white', fontSize: 10.5, fontWeight: '800' }}>USER IMAGE</Text>
                                    </TouchableOpacity>

                                </View>



                                <View style={{ width: 90 }}>
                                    <View style={styles.box}>
                                        <Image source={frame} resizeMode="stretch" style={{ width: 85, height: 90, }} />

                                    </View>
                                    <TouchableOpacity
                                        onPress={() => setModel(true)    /* selectImage('frame') */}
                                        style={{ height: 25, width: 85, marginTop: 5, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ alignSelf: "center", color: 'white', color: 'white', fontSize: 10.5, fontWeight: '800' }}>FRAME
                                        </Text>
                                    </TouchableOpacity>



                                </View>

                            </View>


                        </View>

                        <View style={{ marginTop: 5, paddingLeft: 20 }} >

                            <View
                                style={
                                    styles.textBox

                                }
                            >
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={styles.input}
                                    placeholderTextColor='gray'
                                    placeholder='Name'
                                    keyboardType="default"
                                    returnKeyType="done"

                                    value={name}
                                    onChangeText={setName}

                                />
                            </View>
                            <View
                                style={
                                    styles.textBox

                                }
                            >
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={styles.input}
                                    placeholderTextColor='gray'
                                    placeholder='Email'
                                    keyboardType="default"
                                    returnKeyType="done"

                                    value={email}
                                    onChangeText={setEmail}

                                />
                            </View>
                            <View
                                style={
                                    styles.textBox

                                }
                            >
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={styles.input}
                                    placeholderTextColor='gray'
                                    placeholder='Password'
                                    keyboardType="default"
                                    returnKeyType="done"

                                    value={password}
                                    onChangeText={setPassword}

                                />
                            </View>
                            <View
                                style={
                                    styles.textBox

                                }
                            >
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={styles.input}
                                    placeholderTextColor='gray'
                                    placeholder='Contact Number'
                                    keyboardType="default"
                                    returnKeyType="done"

                                    value={number}
                                    onChangeText={setNumber}

                                />
                            </View>
                            <View
                                style={
                                    styles.textBox

                                }
                            >
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={styles.input}
                                    placeholderTextColor='gray'
                                    placeholder='Address'
                                    keyboardType="default"
                                    returnKeyType="done"

                                    value={address}
                                    onChangeText={setAddress}

                                />
                            </View>
                        </View>

                    </View>




                </View>
                <TouchableOpacity
                    onPress={() => save()}
                    style={{ marginTop: 5, alignSelf: 'center', backgroundColor: 'gray', width: 80, height: 30, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Text style={{ alignSelf: "center", color: 'white', color: 'white', fontSize: 14, fontWeight: '800' }} >save</Text>

                </TouchableOpacity>

                <View style={{ position: 'absolute', top: 10 }}>

                    <Modal
                        transparent={true}
                        visible={model}
                        animationType="slide"
                        style={{
                            color: 'black',
                            marginTop: 0,
                            flex: 1
                        }}

                    >
                        <View style={{backgroundColor: 'gray', position: 'absolute', top: 20, width: width / 1.5, height: height / 1.5, alignSelf: 'center', borderRadius: 5 }}>
                            <TouchableOpacity
                                onPress={() => setModel(false)}
                                style={{ alignSelf: 'flex-end' }}

                            >
                                <Text style={{color:'white'}}>close</Text>

                            </TouchableOpacity>


                            <View style={{marginTop:30}} >


                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ }}
                                    data={imageframe}
                                    keyExtractor={(data) => data}
                                    renderItem={(item) => {


                                        console.log(item.item)
                                        return (
                                            <View style={{margin:5,justifyContent:'center',alignItems:'center'}}>
                                                <Image
                                                    resizeMode="contain"
                                                    style={{ width: 100, height: 100 }}
                                                    source={item.item}
                                                />
                                                <TouchableOpacity
                                                    style= {{}}
                                                    onPress={() => selectFrame(item.item)}
                                                >
                                                    <Text style={{color:'white',fontSize:16,fontWeight:'500'}}>select</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )

                                    }}



                                />



                            </View>

                        </View>



                    </Modal>
                </View>


            </ScrollView>




        </View>



    );
}

const styles = StyleSheet.create({
    box: {
        height: 90,
        width: 85,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 0.5
    },
    textBox: {
        height: 23,
        width: "90%",

        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 9,
        backgroundColor: 'white',

    },
    input: {
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
    },
    detailContainer: {

        borderRightWidth: 1,
        borderRightColor: 'gray'
    },
    detailText: {

        fontWeight: '700',
        fontSize: 15



    }




});


const mapStateToProps = (state) => {

    const { logindetail } = state

    return {
        logindetail: logindetail
    }
}

export default connect(mapStateToProps, null)(AddUser)

