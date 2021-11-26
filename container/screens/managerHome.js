
import axios from 'axios';
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
  StatusBar,

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';


import * as actions from "../redux/action/action"
import { connect } from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width



const ManagerHome = (props) => {

  const [allEmp, setAllEmp] = useState()


  useEffect(() => {

    getEmployee()

  }, [])


  
  const getEmployee = async () => {
    await axios.get(`http://hotel.quloe.info/api/apiGetAllEmployee/${props.logindetail.data.managerid}`)
      .then((res) => {


        setAllEmp(res.data.employee)


        console.log('this is all employees', res.data)
      })

  }
 


  




  return (
    <>

      <StatusBar hidden={true} />
      <View style={{ backgroundColor: 'black', width: width, height: height, paddingLeft: 50 }}>

        <Text style={{ color: 'white', position: 'absolute', top: 20, alignSelf: 'center',fontSize:16,fontWeight:'500' }}> Your Employee List</Text>
        <FlatList
          contentContainerStyle={{height:height/1.5}}
          data={allEmp}
          horizontal
          keyExtractor={(data) => Number(data.employeeid)}
          renderItem={
            (item) => {
              console.log(item)
              return (
                <TouchableOpacity
                onPress={()=>props.navigation.navigate("userScreen",{item:item})}
                style={{alignItems:'center'}}>

                  <View style={{ backgroundColor: 'gray', height: height / 3, width: height / 3, marginTop: height / 5, borderRadius: 5, marginRight: 10 }}>


                  </View>
                  <Text style={{color:'white',alignItems:'center'}}>{item.item.emp_name}</Text>
                </TouchableOpacity>

              )
            }



          }
        />


        <TouchableOpacity
        
          onPress={() => props.navigation.navigate('login')}
          style={{ bottom: 30, position: 'absolute', left: 60,width:38,height:38,backgroundColor:'white',justifyContent:'center',alignItems:'center',borderRadius:5,marginRight:10 }}
        >
          <MaterialIcons size={30} color="black" name="logout" />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', position: 'absolute', right: 60, bottom: 30, justifyContent: 'space-between', width: 100 }} >
          <TouchableOpacity
          style={{width:38,height:38,backgroundColor:'white',justifyContent:'center',alignItems:'center',borderRadius:5,marginRight:10}}
            onPress={() => props.navigation.replace("addUser")}
          >
            <Entypo name="add-user" size={28} color='black' />

          </TouchableOpacity>
          <TouchableOpacity
          style={{width:38,height:38,backgroundColor:'white',justifyContent:'center',alignItems:'center',borderRadius:5,marginRight:10}}
            onPress={() => props.navigation.navigate("settings")}
          >
            <Ionicons name="settings" size={28} color="black" />

          </TouchableOpacity>
        </View>

        

      </View>

    </>



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


export default connect(mapStateToProps, null)(ManagerHome)
