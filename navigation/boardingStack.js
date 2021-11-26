import * as React from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../container/screens/login';
import ManagerHome from '../container/screens/managerHome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddUser from '../container/screens/addUser';
import Settings from '../container/screens/settings';
import UserScreen from '../container/screens/userScreen';
import Calendar from '../container/screens/calendar';
import SettingUser from '../container/screens/settingUser';
import AddFloor from '../container/screens/addFloor';
import FloorList from '../container/screens/floorList';
import AddRoom from '../container/screens/addRoom';
import RoomList from '../container/screens/roomList';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import staff from '../container/screens/staff';
import sugestion from '../container/screens/sugestion';
import * as actions from "../container/redux/action/action"
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Stack = createNativeStackNavigator();

function BoardingStack(props) {

  const [loading, setLoading] = React.useState(true)
  const values1 = React.useRef(null)
  const values2 = React.useRef(null)
  const type = React.useRef("")

  React.useEffect(() => {

    getDatas()


  }, [])

  const Tab = createMaterialTopTabNavigator();

  function MyTabs(props) {
    let id = props.route.params.emplid
    let manid = props.route.params.manaid
    let name = props.route.params.emp_name

    return (
      <Tab.Navigator
        screenOptions={
          {
            tabBarStyle: { backgroundColor: 'black' },
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: 'gray',
          }
        }
      >
        <Tab.Screen name="staff" component={staff} initialParams={{ emplid: id, manaid: manid, name: name }} />
        <Tab.Screen name="sugestion" component={sugestion} initialParams={{ emplid: id, manaid: manid, name: name }} />
      </Tab.Navigator>
    );



  }




  const loginCheck = async () => {

    // >>> checking username



    /** login credential in form of formdata  */

    const loginFormData = new FormData();
    loginFormData.append("company_email", values1.current)
    loginFormData.append("password", values2.current)
    console.log(loginFormData)
    /** login credential in form of formdata  */
    let response = await axios({
      method: "post",
      url: "http://hotel.quloe.info/apimanager-login",
      data: loginFormData,
      headers: { "Content-Type": "multipart/form-data" }, /** headers is given to give credential in formdata */
    })
    console.log("this is ayush")
    console.log(response)

    if (response.data.success == "true") {
      if (!response.data.type) {
        response.data.type = "manager"
        type.current = "manager"
      }

      props.login(response.data)  // saving data to props with reducers 
      setLoading(false)



    }
    else {
      // if user is not valid 
      const loginData = new FormData();
      loginData.append("emp_email", values1.current)
      loginData.append("password", values2.current)


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
        setLoading(false)






      }
      else {
        setLoading(false)

      }




    }


  }



  const getDatas = async () => {



    try {

      const value1 = await AsyncStorage.getItem('email')
      const value2 = await AsyncStorage.getItem('password')
      console.log(value1);
      if (value1 != null && value2 != null) {

        values1.current = value1
        values2.current = value2
        type.current
        console.log(values1.current);

        loginCheck()



      }
      else {
        setLoading(false)
      }
    } catch (e) {

      console.log("this is error", e)
      // error reading value
    }


  }



  console.log(props.logindetail)



  return (
    loading ? (
      <ActivityIndicator style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} size='large' color="black" />

    ) : (
      <Stack.Navigator screenOptions={{
        headerShown: false,
        animationEnabled: false
      }}

        initialRouteName={values1.current != null && values2.current != null ? type.current == "manager" ? ("managerHome") : ("userScreen") : ("login")}
      >


        <Stack.Screen name="managerHome" component={ManagerHome} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="addUser" component={AddUser} />
        <Stack.Screen name="settings" component={Settings} />
        <Stack.Screen name="userScreen" component={UserScreen} />
        <Stack.Screen name="calendar" component={Calendar} />
        <Stack.Screen name="settingUser" component={SettingUser} />
        <Stack.Screen name="addFloor" component={AddFloor} />
        <Stack.Screen name="floorList" component={FloorList} />
        <Stack.Screen name="addRoom" component={AddRoom} />
        <Stack.Screen name="roomList" component={RoomList} />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white'
          }
          }
          name="comment" component={MyTabs} />
      </Stack.Navigator>


    )


  );
}
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
export default connect(mapStateToProps, mapDispatchToProps)(BoardingStack)