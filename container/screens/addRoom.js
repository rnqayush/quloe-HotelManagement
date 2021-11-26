
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {

    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ScrollView,
    TextInput,
    Alert

} from 'react-native';

import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import * as actions from "../redux/action/action"
import { connect } from 'react-redux';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width



const AddRoom = (props) => {

    const [room, setRoom] = useState("")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([])
    const [no, setNo] = useState([])
        /*   { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' } */
        ;
    console.log("props for add room", props.logindetail.data.managerid)

    useEffect(() => {
        axios.get(`http://hotel.quloe.info/api/apiManagerFloorList/${props.logindetail.data.managerid}`).then((res) => {
            console.log(res.data)

            if (res.data.success == "true") {
                setData(res.data.data)
            } else {
                Alert.alert(
                    "Empty Floor List",
                    "Add Floor First",
                    [

                        { text: "Back", onPress: () => props.navigation.goBack() }
                    ]
                )
            }
        })

        return () => {
            setData()
            setLoading(false)
        }
    }, []
    )







    console.log("open", open);
    console.log("value", value);
    console.log("item", items);
    console.log("data", data)
    data.map((item) => {
        if (!item.label) {
            item.label = item.floor_name
        }
        if (!item.value) {
            item.value = item.floor_id
        }

    })


    const submit = async () => {

        const loginFormData = new FormData();
        loginFormData.append("managerid", props.logindetail.data.managerid)
        loginFormData.append("floor_id", value)
        loginFormData.append("room_name", room)

        /** login credential in form of formdata  */
        let response = await axios({
            method: "post",
            url: "http://hotel.quloe.info/apimanager-add-room",
            data: loginFormData,
            headers: { "Content-Type": "multipart/form-data" }, /** headers is given to give credential in formdata */
        })
        if (response.data.success == "true") {
            Alert.alert(
                "Success",
                "Room Added",
                [

                    { text: "Ok", onPress: () => setRoom("") }
                ]
            )
        }


    }


    return (


        <ScrollView>

            <View style={{ width: width - 100, alignSelf: 'center', paddingTop: 40 }}>

                <View style={{ flexDirection: 'row' }}>


                    <Text>
                        Home
                    </Text>
                    <Text style={{ marginLeft: 10 }}>
                        Add Room
                    </Text>


                </View>
                <View style={{ backgroundColor: 'gray', width: '100%', height: 1 }} />

                <View style={{ height: 40, width: "100%", backgroundColor: '#E8E8E8', justifyContent: 'center', paddingLeft: 10, marginTop: 20, marginBottom: 20, borderRadius: 5 }}>
                    <Text>Home  <Text style={{ color: 'gray' }}>/ Add Room</Text> </Text>
                </View>

                <View style={{ backgroundColor: 'gray', width: '100%', height: 1 }} />

                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <Text style={styles.text}>
                        Select Floor
                    </Text>
                    <View>

                        <DropDownPicker
                            style={{ width: width / 1.5, borderColor: 'gray', borderWidth: 0.5 }}
                            dropDownContainerStyle={{ width: width / 1.5, borderColor: 'gray', borderWidth: 0.5, backgroundColor: 'lightgrey', height: height / 3 }}
                            dropDownDirection="BOTTOM"

                            open={open}
                            value={value}
                            items={data}
                            setOpen={setOpen}
                            setValue={setValue}
                        />
                    </View>
                </View>



                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
                    <Text style={styles.text}>
                        Room Name
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width / 1.5, borderColor: 'gray', borderWidth: 0.5, borderRadius: 5 }}>
                        <TextInput
                            placeholder="Room Name"
                            value={room}
                            onChangeText={setRoom}
                            returnKeyType="done"
                            returnKeyLabel="done"
                        />
                        {/* <TouchableOpacity
                            onPress={() => addRoom()}
                            style={{
                                height: 48, width: 48, alignSelf: 'flex-end', backgroundColor: '#0088cc', justifyContent
                                    : 'center', alignItems: 'center', borderRadius: 5
                            }} >
                            <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>
                                +
                            </Text>
                        </TouchableOpacity> */}

                    </View>

                </View>

                {/* 
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width / 1.5, borderColor: 'gray', borderWidth: 0.5, borderRadius: 5,alignSelf:'flex-end' }}>
                    <TextInput
                        placeholder="Room Name"
                        value={room}
                        onChangeText={setRoom}
                        returnKeyType="done"
                        returnKeyLabel="done"
                    />
                    <TouchableOpacity
                        onPress={() => addRoom()}
                        style={{
                            height: 48, width: 48, alignSelf: 'flex-end', backgroundColor: '#0088cc', justifyContent
                                : 'center', alignItems: 'center', borderRadius: 5
                        }} >
                        <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>
                            +
                        </Text>
                    </TouchableOpacity>

                </View> */}
                <TouchableOpacity
                    onPress={() => submit()}
                    style={{
                        height: 35, width: 100, alignSelf: 'flex-end', backgroundColor: '#0088cc', justifyContent
                            : 'center', alignItems: 'center', borderRadius: 5
                    }} >
                    <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>



        </ScrollView>


    );
}

const styles = StyleSheet.create({
    add: {
        flexDirection: 'row',
        width: width / 3,
        height: height / 5,
        justifyContent: 'space-evenly', alignItems: 'center',
        /*     borderBottomWidth:0.2,
            borderBottomColor:"gray" */

    },
    text: {

        fontSize: 18,
        fontWeight: '600'
    }


});
const mapStateToProps = (state) => {

    const { logindetail } = state

    return {
        logindetail: logindetail
    }
}
export default connect(mapStateToProps, null)(AddRoom)

