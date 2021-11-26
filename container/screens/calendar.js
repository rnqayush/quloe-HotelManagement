import React, { useEffect, useState } from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Button,
    ScrollView,
    FlatList,
    Modal,
    ActivityIndicator
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as actions from "../redux/action/action"
import { connect } from 'react-redux';
import axios from 'axios';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Calendar = (props) => {



    const [loginModal, setLoginModal] = useState(false)
    const [attlist, setAttlist] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        Attendance()


    }, [])



    const punchin = async () => {


        let d = new Date().getDate()
        console.log(d)

        const month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sept";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";

        let m = month[new Date().getMonth()]
        let year = new Date().getFullYear()

        let date = `${d}-${m}-${year}`

        let time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
        console.log(time)
        console.log(date)

        const loginData = new FormData();
        loginData.append("emp_id", props.logindetail.data.employeeid)
        loginData.append("managerid", props.logindetail.data.managerid)
        loginData.append("attendance_date", date)
        loginData.append("punch_in_time", time)


        let response = await axios({
            method: "post",
            url: "http://hotel.quloe.info/apiemployee-punch-in",
            data: loginData,
            headers: { "Content-Type": "multipart/form-data" }, /** headers is given to give credential in formdata */
        })


        if (response.data.success == "true") {
            console.log(response.data)
            props.navigation.goBack()
        }






    }
    const punchout = async () => {

        let d = new Date().getDate()
        console.log(d)

        const month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sept";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";

        let m = month[new Date().getMonth()]
        let year = new Date().getFullYear()

        let date = `${d}-${m}-${year}`

        let time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
        console.log(time)
        console.log(date)

        const loginData = new FormData();
        loginData.append("emp_id", props.logindetail.data.employeeid)
        loginData.append("managerid", props.logindetail.data.managerid)
        loginData.append("attendance_date", date)
        loginData.append("punch_out_time", time)


        let response = await axios({
            method: "post",
            url: "http://hotel.quloe.info/apiemployee-punch-out",
            data: loginData,
            headers: { "Content-Type": "multipart/form-data" }, /** headers is given to give credential in formdata */
        })


        if (response.data.success == "true") {
            console.log(response.data)
            props.navigation.goBack()
        }







    }


    const Attendance = async () => {


        const loginData = new FormData();
        if (props.logindetail.type == "manager") {
            loginData.append("emp_id",props.route.params.employeeid)
        
        }else{
            loginData.append("emp_id", props.logindetail.data.employeeid)
        }


        let response = await axios({
            method: "post",
            url: "http://hotel.quloe.info/apiemployee-all-attendance",
            data: loginData,
            headers: { "Content-Type": "multipart/form-data" }, /** headers is given to give credential in formdata */
        })

        console.log(response.data.data)
        setAttlist(response.data.data)
        setLoading(false)

    }



    console.log("this is logindetail",props)
    return (

        loading == true ?

            <ActivityIndicator style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} size='large' color="gray" />

            :

            <View style={{ backgroundColor: 'white' }}>
                <View style={{
                    width: width, alignItems: 'center', backgroundColor: 'black', height: 40, justifyContent: 'space-between', flexDirection: 'row', paddingLeft: 20, paddingRight: 20
                }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.goBack()}
                    >
                        <Text style={{ color: 'white' }}>
                            back
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={{ color: 'white',position:'absolute',alignSelf:'center',top:10,left:width/2 }}>
                        LEAVE APPROVAL
                    </Text>

                    {props.logindetail.type != "manager" ? <TouchableOpacity onPress={() => setLoginModal(true)}>

                        {
                            attlist[0].attendance_type == "IN" ? <Text style={{ color: 'white' }}>
                                Log Out
                            </Text> : <Text style={{ color: 'white' }}>
                                Login
                            </Text>
                        }


                    </TouchableOpacity>:null}



                </View>



                <FlatList
                    contentContainerStyle={{ paddingBottom: 50 }}
                    data={attlist}
                    keyExtractor={(data) => data.attendance_id}
                    renderItem={({ item }) => {

                        console.log(item)

                        return (
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    width: width - 50,

                                    alignSelf: 'center',


                                }}>


                                <View
                                    style={{
                                        marginTop: 20,
                                        padding: 20,

                                        borderColor: 'black',
                                        borderRadius: 10,
                                        borderWidth: 1,


                                    }}>
                                    <View>
                                        <Text style={{ fontWeight: '700' }}>From Date</Text>
                                        <Text style={{}} >{item.attendance_date}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ width: 300 }}>
                                            <Text style={{ fontWeight: '700' }}>Sign In Time</Text>
                                            <Text>{item.punch_in_time}</Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontWeight: '700' }}>Sign Out Time</Text>
                                            <Text>{item.punch_out_time}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: '700' }}>Address</Text>
                                        <Text>API</Text>
                                    </View>
                                </View>
                            </View>

                        )

                    }}

                />






                <View style={styles.centeredView}>
                    <Modal

                        animationType="slide"
                        statusBarTranslucent={true}
                        transparent={true}
                        visible={loginModal}
                        onRequestClose={() => {

                            setLoginModal(!loginModal);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Attendance</Text>
                                <Text style={{ marginBottom: 15, alignSelf: 'flex-start' }}>Working Hours</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%" }}>
                                    <TouchableOpacity
                                        onPress={() => punchin()}
                                        style={{ borderRadius: 5, width: 100, height: 30, backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>Punch In</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => punchout()}
                                        style={{ borderRadius: 5, width: 100, height: 30, backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text>Punch Out</Text>
                                    </TouchableOpacity>

                                </View>

                            </View>


                        </View>
                    </Modal>

                </View>





            </View>
    );
};




const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'

    },
    modalView: {

        width: width / 2,
        height: height / 2.5,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 20,
        textAlign: "center"
    }
})
const mapStateToProps = (state) => {

    const { logindetail } = state

    return {
        logindetail: logindetail
    }
}

export default connect(mapStateToProps, null)(Calendar)

