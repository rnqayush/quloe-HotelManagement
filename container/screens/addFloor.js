
import React, { useState } from 'react';

import {

    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ScrollView,
    TextInput,

} from 'react-native';

import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import * as actions from "../redux/action/action"
import { connect } from 'react-redux';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width



const AddFloor = (props) => {

    const [floor, setFloor] = useState("")

    console.log("props for add floor", props.logindetail.data.managerid)




    const submit = async () => {
        console.log("floor", floor)

        const loginFormData = new FormData();
        loginFormData.append("managerid", props.logindetail.data.managerid)
        loginFormData.append("floor_name", floor)

        /** login credential in form of formdata  */
        let response = await axios({
            method: "post",
            url: "http://hotel.quloe.info/apimanager-add-floor",
            data: loginFormData,
            headers: { "Content-Type": "multipart/form-data" }, /** headers is given to give credential in formdata */
        })
        if (response.data.success == "true") {
            props.navigation.goBack()
        }
        console.log(response.data.success)




    }

    return (
        <ScrollView showsHorizontalScrollIndicator={false}  >



            <View style={{ width: width - 100, alignSelf: 'center', paddingTop: 40 }}>

                <View style={{ flexDirection: 'row' }}>


                    <Text>
                        Home
                    </Text>
                    <Text style={{ marginLeft: 10 }}>
                        Add Floor
                    </Text>


                </View>
                <View style={{ backgroundColor: 'gray', width: '100%', height: 1 }} />

                <View style={{ height: 40, width: "100%", backgroundColor: '#E8E8E8', justifyContent: 'center', paddingLeft: 10, marginTop: 20, marginBottom: 20, borderRadius: 5 }}>
                    <Text>Home  <Text style={{ color: 'gray' }}>/ Add Floor</Text> </Text>
                </View>

                <View style={{ backgroundColor: 'gray', width: '100%', height: 1 }} />

                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                    <Text style={styles.text}>
                        Floor Name
                    </Text>
                    <View style={{ width: width / 1.5, borderColor: 'gray', borderWidth: 0.5, borderRadius: 5 }}>
                        <TextInput
                            placeholder="1st Floor"
                            value={floor}
                            onChangeText={setFloor}
                            returnKeyType="done"
                            returnKeyLabel="done"
                        />
                    </View>

                </View>
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
export default connect(mapStateToProps, null)(AddFloor)

