
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


const height = Dimensions.get('window').height
const width = Dimensions.get('window').width



const Sugestion = (props) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState("")
    const [list, setList] = useState([])
    useEffect(() => {


        axios.get(`http://hotel.quloe.info/apimanager-room-lists`).then((res) => {
            console.log("this is data", res.data)

            if (res.data.success == "true") {

                setData(res.data.data)
                setLoading(false)
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




    const Submit = () => {
        console.log("entered in",)
        setList([...list, value])
        
    }

    let d=new Date()
    console.log(moment(d).fromNow())
 
    var c = 0

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ width: width }} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, width: width / 1.05, alignSelf: 'center', elevation: 0.5, height: 65, padding: 10, alignItems: 'center' }}>
                <View style={{ borderColor: 'black', borderWidth: 0.8, width: width / 1.3, height: 40 }}>
                    <TextInput
                        style={{ width: "80%" }}
                        placeholder="Write Here.."
                        value={value}
                        onChangeText={(value)=>setValue(value)}

                    />
                </View>
                <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: 'brown' }}>

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => Submit()}
                    style={{ width: 40, height: 40, backgroundColor: 'brown' }}>
                    
                </TouchableOpacity>

            </View>
            <View style={{ width: width / 1.05, height: height, elevation: 0.5, alignSelf: 'center', marginTop: 20, padding: 10 }}>
                {
                    list.map((item) => (
                        <Text >
                            {item}
                        </Text>
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

export default connect(mapStateToProps, null)(Sugestion)
