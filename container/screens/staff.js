
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from "moment";
import {

    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ScrollView,
    Alert,
    TextInput,

} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as actions from "../redux/action/action"
import { connect } from 'react-redux';
import { getActionFromState } from '@react-navigation/core';
import Feather from 'react-native-vector-icons/Feather'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width



const Staff = (props) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState("")
    const [list, setList] = useState([])

    useEffect(() => {

        getComment()



        return () => {

        }
    }, []


    )


    const getComment = async () => {

        const loginFormData = new FormData();
        loginFormData.append("managerid", props.route.params.manaid)
        loginFormData.append("empid", props.route.params.emplid)





        /** login credential in form of formdata  */
        let response = await axios({
            method: "post",
            url: "http://hotel.quloe.info/apigetcomment-manager-with-employee",
            data: loginFormData,
            headers: { "Content-Type": "multipart/form-data" }, /** headers is given to give credential in formdata */
        })

        if (response.data.success == "true") {
            setList(response.data.data)
        }
        console.log(response.data)

    }



    console.log("dafaafafafafaf", props)



    const Submit = async () => {
        console.log("entered in",)
        if (value != "") {
            const loginFormData = new FormData();
            loginFormData.append("managerid", props.route.params.manaid)
            loginFormData.append("empid", props.route.params.emplid)
            loginFormData.append("comment", value)
            if (props.logindetail.type == "manager") {
                loginFormData.append("comment_by", "Manager")
            } else {
                loginFormData.append("comment_by", `${props.route.params.name}`)
            }




            /** login credential in form of formdata  */
            let response = await axios({
                method: "post",
                url: "http://hotel.quloe.info/apicomment-manager-with-employee",
                data: loginFormData,
                headers: { "Content-Type": "multipart/form-data" }, /** headers is given to give credential in formdata */
            })
            console.log(response.data.success)
            if (response.data.success == "true") {
                getComment()
            }

        }

    }


    const getTime = (time) => {


        let dates = time
        let date = new Date(dates);




        return moment(date).fromNow()


    }

    const getDays = (day) => {
        const d = new Date(day);

        const weekday = new Array(7);
        weekday[0] = "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tue";
        weekday[3] = "Wed";
        weekday[4] = "Thu";
        weekday[5] = "Fri";
        weekday[6] = "Sat";

        return weekday[d.getDay()]

    }

    const getMonth = (months) => {

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

        const d = new Date(months);
        return month[d.getMonth()]


    }



    console.log("cccccccc", props.route.params)
    var c = 0

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ width: width }} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, width: width / 1.05, alignSelf: 'center', elevation: 0.5, height: 65, padding: 10, alignItems: 'center' }}>
                <View style={{ borderColor: 'black', borderWidth: 0.8, width: width / 1.3, height: 40 }}>
                    <TextInput
                        style={{ width: "80%" }}
                        placeholder="Write Here.."
                        value={value}
                        onChangeText={(value) => setValue(value)}

                    />
                </View>
                <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: 'brown', justifyContent: 'center', alignItems: 'center' }}>
                    <Feather name="upload" size={25} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => Submit()}
                    style={{ width: 40, height: 40, backgroundColor: 'brown', justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialIcons name="send" size={25} color="white" />
                </TouchableOpacity>

            </View>
            <View style={{ width: width / 1.05, elevation: 5, alignSelf: 'center', marginTop: 20, padding: 10 }}>
                {
                    list.map((item) => (
                        <View style={{ marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>

                                <Text style={{ fontSize: 17, fontWeight: '600' }} >
                                    {item.comment_by}

                                </Text>
                                <Text style={{ color: 'gray' }}> | {getDays(item.comment_date)}</Text><Text style={{ color: 'gray' }}>, {new Date(item.comment_date).getDate()}</Text>
                                <Text style={{ color: 'gray' }}> {getMonth(item.comment_date)}</Text>
                                <Text style={{ color: 'gray' }}> {new Date(item.comment_date).getFullYear()}</Text>
                                <Text style={{ color: 'gray' }}> | {getTime(item.comment_date)}</Text>

                            </View>
                            <Text style={{ marginLeft: 10 }} >
                                {item.comment}
                            </Text>
                        </View>

                    ))
                }

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
        color: 'white',
        fontSize: 18,
        fontWeight: '600'
    },
    box: {
        width: 100, height: 35, borderColor: 'black', borderWidth: 0.5, borderRadius: 3
    },
    header: {
        height: 30,
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingLeft: 5,
        paddingRight: 5,
        width: "100%",
        backgroundColor: "black",
        alignItems: 'center'


    },

    main: {
        height: 30,
        alignItems: 'center',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1

    }


});
const mapStateToProps = (state) => {

    const { logindetail } = state

    return {
        logindetail: logindetail
    }
}

export default connect(mapStateToProps, null)(Staff)
