
import React from 'react';

import {

    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ScrollView,
    StatusBar,

} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width



const Settings = (props) => {

    return (
        <ScrollView showsHorizontalScrollIndicator={false} >
            
            <View style={{ backgroundColor: 'black', width: width, height: height,justifyContent:"center",alignItems:"flex-start",paddingLeft:30}}>
                <TouchableOpacity 
                onPress={()=>props.navigation.navigate("addFloor")}
                style={styles.add} >
                    <Entypo name="arrow-right" size={30} color="white" />
                    <Text style={styles.text}>
                        Add Floor
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>props.navigation.navigate("floorList")}
                style={styles.add}>
                <Entypo name="arrow-right" size={30} color="white" />
                    <Text style={styles.text}>
                        Floor List
                    </Text>

                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>props.navigation.navigate("addRoom")}
                style={styles.add}>
                <Entypo name="arrow-right" size={30} color="white" />
                    <Text style={styles.text}>
                        Add Room
                    </Text>

                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>props.navigation.navigate("roomList")}
                style={styles.add}>
                <Entypo name="arrow-right" size={30} color="white" />
                    <Text style={styles.text}>
                        Room List
                    </Text>

                </TouchableOpacity>
            </View>


        </ScrollView>




    );
}

const styles = StyleSheet.create({
    add:{
        flexDirection:'row',
        width:width/3,
        height:height/5,
        justifyContent:'space-evenly',alignItems:'center',
    /*     borderBottomWidth:0.2,
        borderBottomColor:"gray" */

    },
    text:{
        color:'white',
        fontSize:18,
        fontWeight:'600'
    }


});

export default Settings
