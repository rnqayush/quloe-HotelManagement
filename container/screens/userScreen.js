
import React, { useEffect, useRef, useState } from 'react';

import {

  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  FlatList,
  StatusBar,
  Modal,
  Alert

} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

import * as actions from "../redux/action/action"
import { connect } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';


const UserScreen = (props) => {


  const [date, setDate] = useState(new Date());
  const [dateShow, setDateShow] = useState(null);
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState();
  const [floorlist, setFloorlist] = useState([]);
  const [roomlist, setRooomlist] = useState([]);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(1);
  const [role, setRole] = useState("")
  const [rolelist, setRoleList] = useState([])
  const [roleSave, setRoleSave] = useState(false)
  const [savedRole, setSavedRole] = useState()
  /* const [item, setItem] = useState([{ label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' }]) */


  useEffect(() => {


    savedUserRole()

    empdetails()
    /*  rooms(floorlist[0].value)
     setValue(floorlist[0].value) */

    return (() => {
      setData()
      setRoleList([])

    })



  }

    , [])




  const empdetails = async () => {
    if (props.logindetail.type == "manager") {
      await axios.post(`http://hotel.quloe.info/api/apiManagerEmployeeDetails/${props.route.params.item.item.employeeid}`)
        .then((res) => {

          if (res.data.success == "true")
            //console.log("this is details from api", res.data.data);
            setData(res.data.data)
          florlist(props.route.params.item.item.managerid)

        })

    }
    else {

      await axios.post(`http://hotel.quloe.info/api/apiManagerEmployeeDetails/${props.logindetail.data.employeeid}`)
        .then((res) => {

          if (res.data.success == "true")
            //console.log("this is details from api", res.data.data);
            setData(res.data.data)
          florlist(props.logindetail.data.managerid)

        })

    }
  }



  const florlist = async (id) => {
    await axios.get(`http://hotel.quloe.info/api/apiManagerFloorList/${id}`).then(async (res) => {

      if (res.data.success == "true") {
        res.data.data.map((item) => {
          if (!item.label) {
            item.label = item.floor_name
          }
          if (!item.value) {
            item.value = item.floor_id
          }
        })
        let v = res.data.data[0]
        setValue(res.data.data[0].value)

        setFloorlist(res.data.data)
        const loginFormData = new FormData();
        loginFormData.append("managerid", v.managerid)
        loginFormData.append("floor_id", v.floor_id)


        /** login credential in form of formdata  */
        let response = await axios({
          method: "post",
          url: "http://hotel.quloe.info/apimanager-room-list",
          data: loginFormData,
          headers: { "Content-Type": "multipart/form-data" }, /** headers is given to give credential in formdata */
        })
        //console.log("this is room list", response.data)
        setRooomlist(response.data.data)
        setLoading(false)

      }
    }
    )
  }


  //console.log(floorlist)



  const rooms = async (v) => {



    //console.log("this is value", v)
    let toSend = floorlist.filter((ite) => ite.value == v)

    //console.log("this is to send", toSend)

    const loginFormData = new FormData();
    loginFormData.append("managerid", toSend[0].managerid)
    loginFormData.append("floor_id", toSend[0].floor_id)


    /** login credential in form of formdata  */
    let response = await axios({
      method: "post",
      url: "http://hotel.quloe.info/apimanager-room-list",
      data: loginFormData,
      headers: { "Content-Type": "multipart/form-data" }, /** headers is given to give credential in formdata */
    })
    //console.log("this is room list", response.data)
    setRooomlist(response.data.data)





  }


  const saveRole = async () => {


    setRoleSave(true)


    let room_id = rolelist.map((item) => item.room_id)
    var today = new Date();
    var dateT = dateShow == null ? today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() : dateShow
    let manager_id
    let employee_id
    if (props.logindetail.type == "manager") {
      manager_id = props.route.params.item.item.managerid
      employee_id = props.route.params.item.item.employeeid
    }
    else {
      manager_id = props.logindetail.data.managerid
      employee_id = props.logindetail.data.employeeid
    }


    let button_name = role
    let button_color = ""
    let floor_id = value


    const loginFormData = new FormData();
    let c = -1
    rolelist.forEach((item) => {
      console.log(item)
      c = c + 1
      loginFormData.append(`room_id[${c}]`, item.room_id)
      loginFormData.append(`button_name[${c}]`, item.role)
      loginFormData.append(`button_color[${c}]`, "button_color")

    })

    loginFormData.append("manger_id", manager_id)
    loginFormData.append("working_date", dateT)
    loginFormData.append("employee_id", employee_id)

    loginFormData.append("floor_id", floor_id)
    console.log(loginFormData)
    let response = await axios({
      method: "post",
      url: "http://hotel.quloe.info/apiroomassign-manager-with-employee",
      data: loginFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })

    if (response.data.success == "true") {
      setRoleSave(false)
      /* Alert.alert(
        "Oops ",
        "Invalid user name or password",
        [

            { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    ) */

    }

  }


  const savedUserRole = async () => {
    var today = new Date();
    var dateT = dateShow == null ? today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() : dateShow
    let manager_id
    let employee_id
    if (props.logindetail.type == "manager") {
      manager_id = props.route.params.item.item.managerid
      employee_id = props.route.params.item.item.employeeid
    }
    else {
      manager_id = props.logindetail.data.managerid
      employee_id = props.logindetail.data.employeeid
    }


    /*     let button_name = role
        let button_color = ""
        let floor_id = value
     */

    const loginFormData = new FormData();
    /* let c = -1
    rolelist.forEach((item) => {
      c = c + 1
      loginFormData.append(`room_id[${c}]`, JSON.stringify(item))
    })
 */
    loginFormData.append("manger_id", manager_id)
    loginFormData.append("working_date", dateT)
    loginFormData.append("employee_id", employee_id)
    /*   loginFormData.append("button_name", button_name)
      loginFormData.append("button_color", "button_color")
      loginFormData.append("floor_id", floor_id) */
    console.log("this is login for data", loginFormData)
    let response = await axios({
      method: "post",
      url: "http://hotel.quloe.info/apigetroomassign-manager-with-employee",
      data: loginFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
    console.log("this is saved role gcggcgcgcgcgcgc", response.data)
    if (response.data.success == "true") {

      console.log("this is saved role gcggcgcgcgcgcgc", response.data.data)
      setSavedRole(response.data.data)

      /* Alert.alert(
        "Oops ",
        "Invalid user name or password",
        [

            { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    ) */

    }

  }





  const onChange =async (event, selectedDate) => {
    const currentDate = selectedDate || date;

    let tempDate = new Date(currentDate)
    setShow(false);
    var dateS = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate()
    setDateShow(dateS)
    var dateT = dateS
    let manager_id
    let employee_id
    if (props.logindetail.type == "manager") {
      manager_id = props.route.params.item.item.managerid
      employee_id = props.route.params.item.item.employeeid
    }
    else {
      manager_id = props.logindetail.data.managerid
      employee_id = props.logindetail.data.employeeid
    }
    const loginFormData = new FormData();
    loginFormData.append("manger_id", manager_id)
    loginFormData.append("working_date", dateT)
    loginFormData.append("employee_id", employee_id)
    console.log("this is login for data", loginFormData)
    let response = await axios({
      method: "post",
      url: "http://hotel.quloe.info/apigetroomassign-manager-with-employee",
      data: loginFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
    console.log("this is saved role gcggcgcgcgcgcgc", response.data)
    if (response.data.success == "true") {

      console.log("this is saved role gcggcgcgcgcgcgc", response.data.data)
      setSavedRole(response.data.data)

    }

  };






  let emplid = props.route.params != undefined ? props.route.params.item.item.employeeid : props.logindetail.data.employeeid
  let manaid = props.route.params != undefined ? props.route.params.item.item.managerid : props.logindetail.data.managerid

  //console.log("aaaaaaaaaaaaaaaaaaaaa", emplid)


  var today = new Date();
  var dateT = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()


  //console.log("this is date T", dateT)
  return (

    <>

      <View style={{ backgroundColor: '#545B6B', height: height }}>
        {
          loading == true ? (
            <ActivityIndicator style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} size='large' color="white" />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}

              translucent={false}
            >
              <StatusBar hidden={true} />

              <View style={{ width: width - 50, alignSelf: 'center', flexDirection: "row", paddingTop: 10 }}>
                <View style={{ alignItems: 'center', marginTop: 5 }}>
                  <View style={{ backgroundColor: 'white', height: 90, width: 100, borderRadius: 5 }}>


                  </View>
                  <View style={{ backgroundColor: '#153D74', height: 22, width: 100, borderRadius: 4, marginTop: 2, justifyContent: 'center', alignItems: "center" }}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>{data.emp_name}</Text>
                  </View>
                </View>


                <View style={{ backgroundColor: 'white', alignSelf: 'center', height: 35, width: width / 3.5, borderRadius: 10, flexDirection: 'row', marginLeft: 50 }}>
                  <View style={{ height: 35, width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '900' }}>DAY</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setShow(true)}
                    style={{ height: 35, justifyContent: 'center' }}>
                    {dateShow == null ? (

                      <Text style={{ fontSize: 16, marginLeft: 10, fontWeight: '900' }}>{dateT}</Text>

                    ) : (
                      <Text style={{ fontSize: 16, marginLeft: 10, fontWeight: '900' }}>{dateShow}</Text>
                    )
                    }


                  </TouchableOpacity>
                </View>
                {
                  show == true ? (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode="date"

                      display="default"
                      onChange={onChange}
                    />
                  ) : null
                }




              </View>

              <DropDownPicker

                style={{ width: 170, borderColor: 'gray', borderWidth: 0.5, height: 40, alignSelf: 'center', position: "absolute" }}
                dropDownContainerStyle={{ width: 150, borderColor: 'gray', borderWidth: 0.5, height: 150, alignSelf: 'center' }}
                dropDownDirection="BOTTOM"
                placeholder="floor"
                open={open}
                labelStyle={{ fontSize: 16, fontWeight: '700' }}
                value={value}
                items={floorlist}
                setOpen={setOpen}
                setValue={setValue}
                onChangeValue={(value) => rooms(value)}

              />

              <View style={{ backgroundColor: '#727886', marginTop: 15 }}>
                <View style={{ height: height / 1.8, width: width - 100, alignSelf: 'center' }}>
                  {
                    props.logindetail.type == "manager" ? (
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        contentContainerStyle={{ paddingTop: 40 }}
                        numColumns={5}
                        nestedScrollEnabled={true}
                        data={roomlist}
                        keyExtractor={(data) => data.room_id}
                        renderItem={(item) => {
                          //console.log(item.item.room_name)
                          return (
                            <TouchableOpacity
                              onPress={() => {


                                item.item.role = role
                                setRoleList([...rolelist, item.item])
                              }}
                              style={{ marginRight: 80, marginBottom: 30, alignItems: 'center', height: 63 }}>
                              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ height: 45, width: 19, backgroundColor: 'white', marginRight: 0.2, borderRadius: 2.8, borderColor: 'black', borderWidth: 1 }}>

                                </View>

                                <View style={{ width: 60, height: 42, backgroundColor: 'darkgrey', justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderWidth: 1.3, borderRadius: 3.5 }}>

                                  <Text style={{ fontSize: 25, fontWeight: '900' }}>
                                    {item.item.room_name}

                                  </Text>
                                </View>

                              </View>
                              {rolelist.length != 0 ? rolelist.map((ite) => {
                                if (ite.room_id == item.item.room_id & ite.role != null) {
                                  return (

                                    <TouchableOpacity onPress={() => setRoleList(rolelist.filter((obj) => obj.room_id != item.item.room_id))} >
                                      <Text style={{ height: 20, color: 'white' }}>{ite.role}</Text>
                                    </TouchableOpacity>
                                  )

                                }


                              }) : null
                              }

                            </TouchableOpacity>
                          )
                        }}
                      />
                    ) : (
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        contentContainerStyle={{ paddingTop: 40 }}
                        numColumns={5}
                        nestedScrollEnabled={true}
                        data={roomlist}

                        renderItem={(item) => {
                          //console.log(item.item.room_name)
                          return (
                            <TouchableOpacity
                              style={{ marginRight: 80, marginBottom: 30, alignItems: 'center', height: 63 }}>
                              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ height: 45, width: 19, backgroundColor: 'white', marginRight: 0.2, borderRadius: 2.8, borderColor: 'black', borderWidth: 1 }}>

                                </View>

                                <View style={{ width: 60, height: 42, backgroundColor: 'darkgrey', justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderWidth: 1.3, borderRadius: 3.5 }}>

                                  <Text style={{ fontSize: 25, fontWeight: '900' }}>
                                    {item.item.room_name}
                                  </Text>
                                </View>

                              </View>

                              {savedRole.length != 0 ? savedRole.map((ite) => {
                                let c = -1
                                let name
                                ite.room_id.map((numb) => {
                                  c = c + 1
                                  if (numb == item.item.room_id) {
                                    name = ite.button_name[c]
                                  }
                                }
                                )
                                return (

                                  <TouchableOpacity onPress={() => setRoleList(rolelist.filter((obj) => obj.room_id != item.item.room_id))} >
                                    <Text style={{ height: 20, color: 'white' }}>{name}</Text>
                                  </TouchableOpacity>
                                )

                              }) : null
                              }

                            </TouchableOpacity>
                          )
                        }}
                      />

                    )
                  }

                </View>
              </View>
              <View style={{ width: width - 50, alignSelf: 'center', flexDirection: "row", paddingTop: 5, justifyContent: 'space-between', marginBottom: 5 }} >

                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                  <TouchableOpacity

                    onPress={() => {
                      setRoleList([])
                      props.navigation.navigate("login")

                    }}
                    style={{ width: 38, height: 38, backgroundColor: '#153D74', justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginRight: 10 }}>
                    <Entypo name="home" size={28} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("comment", { emplid: emplid, manaid: manaid, emp_name: data.emp_name })}
                    style={{ width: 38, height: 38, backgroundColor: '#153D74', justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginRight: 10 }}
                  >
                    <AntDesign name="message1" size={24} color="white" />
                  </TouchableOpacity>

                </View>

                {props.logindetail.type == "manager" ? (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', alignItems: 'center', }} >
                    <TouchableOpacity
                      onPress={() => setRole("check")}
                      style={[styles.clean, { backgroundColor: 'black', borderRadius: 5, borderColor: "black", borderWidth: 5 }]}

                    >
                      <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>CHECK</Text>


                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setRole("To Clean")}
                      style={[styles.clean, { backgroundColor: 'white', borderRadius: 5, borderColor: "black", borderWidth: 1.5 }]}

                    >
                      <Text style={{ fontSize: 15, fontWeight: '800' }}>TO CLEAN</Text>


                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setRole("Cleaned")}
                      style={[styles.clean, { backgroundColor: 'green', borderRadius: 5, borderColor: "black", borderWidth: 1.5 }]}

                    >
                      <Text style={{ fontSize: 15, fontWeight: '600', color: 'white' }}>CLEANED</Text>


                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setRoleList([])}
                      style={{ marginLeft: 5, width: 20, height: 70, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                    >
                      <Text style={{ fontSize: 10, fontWeight: "900" }}>
                        C
                      </Text>
                      <Text style={{ fontSize: 10, fontWeight: "900" }} >
                        L
                      </Text>
                      <Text style={{ fontSize: 10, fontWeight: "900" }}>
                        E
                      </Text>
                      <Text style={{ fontSize: 10, fontWeight: "900" }}>
                        A
                      </Text>
                      <Text style={{ fontSize: 10, fontWeight: "900" }}>
                        N
                      </Text>


                    </TouchableOpacity>

                  </View>
                ) : null}


                <View style={{ flexDirection: 'row', width: 150, justifyContent: 'space-evenly', marginTop: 20 }}>

                  {props.logindetail.type == "manager" ? <TouchableOpacity
                    onPress={() => saveRole()}
                    style={{ width: 38, height: 38, backgroundColor: '#153D74', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>

                    <Feather name='save' size={28} color="white" />


                  </TouchableOpacity> : null
                  }

                  {/* {props.logindetail.type != "employee" ? <TouchableOpacity
                    style={{ width: 38, height: 38, backgroundColor: '#153D74', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
                    onPress={() => props.navigation.navigate("settingUser")}
                  >

                    <FontAwesome name="gear" size={28} color="white" />


                  </TouchableOpacity>
                    : null
                  } */}


                  {props.logindetail.type != "manager" ?

                    <TouchableOpacity
                      style={{ width: 38, height: 38, backgroundColor: '#153D74', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
                      onPress={() => props.navigation.navigate("calendar")}
                    >

                      <Ionicons name='calendar' size={28} color="white" />


                    </TouchableOpacity> :
                    <TouchableOpacity
                      style={{ width: 38, height: 38, backgroundColor: '#153D74', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
                      onPress={() => props.navigation.navigate("calendar", { employeeid: props.route.params.item.item.employeeid })}
                    >

                      <Ionicons name='calendar' size={28} color="white" />


                    </TouchableOpacity>
                  }



                </View>






              </View>



            </ScrollView>

          )
        }




      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={roleSave}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ActivityIndicator size="large" color="black" style={{ justifyContent: 'center', alignItems: 'center' }} />
            </View>
          </View>
        </Modal>

      </View>

    </>



  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  modalView: {
    margin: 20,
    height: width / 4,
    width: width / 3,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: 'center'

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
    marginBottom: 15,
    textAlign: "center"
  },

  clean: { marginLeft: 5, width: 110, height: 40, justifyContent: 'center', alignItems: 'center' }
})



const mapStateToProps = (state) => {

  const { logindetail } = state

  return {
    logindetail: logindetail
  }
}

export default connect(mapStateToProps, null)(UserScreen)
