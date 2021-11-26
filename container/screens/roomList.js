
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import {

    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ScrollView,
    Alert,

} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as actions from "../redux/action/action"
import { connect } from 'react-redux';


const height = Dimensions.get('window').height
const width = Dimensions.get('window').width



const RoomList = (props) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

     useEffect(()=>{


        axios.get(`http://hotel.quloe.info/apimanager-room-lists`).then((res)=>{
            console.log("this is data",res.data)
    
        if(res.data.success=="true"){
           
            setData(res.data.data)
            setLoading(false)
        }else{
            Alert.alert(
                "Empty Floor List",
                "Add Floor First",
                [

                    { text: "Back", onPress: () => props.navigation.goBack() }
                ]
            )
        }
    })
        return ()=>{
            setData()
            setLoading(false)
        }
    },[]


    )
 


    const delet = (id) => {
        setData(data.filter((item) => item.room_id != id))


        axios.get(`http://hotel.quloe.info/api/apiManagerDeleteRoom/${id}`).then((res) => {
            console.log("deleteeeeeee", res.data)
        })

    }




    var c = 0

    return (
        <ScrollView showsHorizontalScrollIndicator={false}  >
            {loading == true ? (
                <Text>loading</Text>

            ) : (

                <View style={{ width: width - 100, alignSelf: 'center', paddingTop: 40 }}>

                    <View style={{ flexDirection: 'row' }}>


                        <Text>
                            Home
                        </Text>
                        <Text style={{ marginLeft: 10 }}>
                            Room List
                        </Text>


                    </View>
                    <View style={{ backgroundColor: 'gray', width: '100%', height: 1 }} />

                    <View style={{ height: 40, width: "100%", backgroundColor: '#E8E8E8', justifyContent: 'center', paddingLeft: 10, marginTop: 20, marginBottom: 20, borderRadius: 5 }}>
                        <Text>Home  <Text style={{ color: 'gray' }}>/ Room List</Text> </Text>
                    </View>

                    <View style={{ backgroundColor: 'gray', width: '100%', height: 1 }} />

                    <View style={{ marginTop: 20, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between' }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ marginRight: 5 }}>
                                Show
                            </Text>
                            <View style={[styles.box, { marginRight: 5 }]} >

                            </View>
                            <Text>
                                Entries
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ marginRight: 5 }}>
                                Search:

                            </Text>
                            <View style={[styles.box, { width: 200 }]}>

                            </View>

                        </View>
                    </View>

                    <View style={{ width: "100%", flexDirection: 'row' }}>
                        <View style={{ width: "10%", borderColor: 'lightgray', borderWidth: 1 }}>
                            <View style={styles.header}>
                                <Text style={styles.text}>#</Text>
                                <Text style={styles.text}>#</Text>


                            </View>




                            {
                                data.map((item, key) => {

                                    c++
                                    return (
                                        <View
                                            key={item.room_id}
                                            style={styles.main}>
                                            <Text>
                                                {c}
                                            </Text>

                                        </View>
                                    )

                                })
                            }

                            <View style={styles.header}>
                                <Text style={styles.text}>#</Text>
                                <Text style={styles.text}>#</Text>


                            </View>



                        </View>
                        <View style={{ width: "30%", borderColor: 'lightgray', borderWidth: 1 }}>
                            <View style={[styles.header]}>
                                <Text style={styles.text}>floor</Text>
                                <Text style={styles.text}>#</Text>


                            </View>
                            {
                                data.map((item, key) => {

                                    return (
                                        <View
                                            key={item.room_id}
                                            style={styles.main}>
                                            <Text>
                                                {item.floor_name}
                                            </Text>

                                        </View>
                                    )

                                })
                            }
                            <View style={styles.header}>
                                <Text style={styles.text}>#</Text>
                                <Text style={styles.text}>#</Text>


                            </View>


                        </View>
                        <View style={{ width: "30%", borderColor: 'lightgray', borderWidth: 1 }}>

                            <View style={styles.header}>
                                <Text style={styles.text}>room</Text>
                                <Text style={styles.text}>#</Text>


                            </View>
                             {
                                data.map((item, key) => {


                                    return (
                                        <View
                                          
                                            key={item.room_id}
                                            style={styles.main}>
                                            <Text>
                                                {item.room_name}
                                            </Text>

                                        </View>
                                    )

                                })
                            } 
                            <View style={styles.header}>
                                <Text style={styles.text}>#</Text>
                                <Text style={styles.text}>#</Text>


                            </View>


                        </View>

                        <View style={{ width: "30%", borderColor: 'lightgray', borderWidth: 1 }}>

                            <View style={styles.header}>
                                <Text style={styles.text}>action</Text>
                                <Text style={styles.text}>#</Text>


                            </View>
                            {
                                data.map((item, key) => {


                                    return (
                                        <TouchableOpacity
                                            onPress={() => delet(item.room_id)}
                                            key={item.room_id}
                                            style={styles.main}>
                                            <MaterialIcons name="delete" size={25} color="orange" />
                                        </TouchableOpacity>
                                    )

                                })
                            }
                            <View style={styles.header}>
                                <Text style={styles.text}>#</Text>
                                <Text style={styles.text}>#</Text>


                            </View>


                        </View>


                    </View>


                </View>

            )}




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
        alignItems:'center',
        borderBottomColor:'lightgrey',
        borderBottomWidth:1

    }


});
const mapStateToProps = (state) => {

    const { logindetail } = state

    return {
        logindetail: logindetail
    }
}

export default connect(mapStateToProps, null)(RoomList)
