
import React from 'react';

import {

    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ScrollView,

} from 'react-native';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width



const SettingUser = (props) => {

    return (
        <ScrollView showsHorizontalScrollIndicator={false}>

            <View style={{ width: width, backgroundColor: 'white' }}>
                <View style={{ width: width - 20, alignSelf: 'center' }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.goBack()}
                        style={{ alignSelf: 'flex-end', width: 30, height: 30, backgroundColor: 'lightgrey', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginTop: 3 }} >
                        <Text>X</Text>
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 16 }}>
                        Setting
                    </Text>
                    <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 16 }}>
                        1/2
                    </Text>
                    <Text style={{ fontWeight: '700', fontSize: 18 }}>Color Selection</Text>
                </View>
                <View style={{ borderColor: "black", borderWidth: 1 }} />
                <View style={{ width: width, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }} >
                    <View style={{ marginTop: 6, paddingTop: 6 }} >
                        <Text style={{ fontSize: 16, fontWeight: '500' }} >
                            Select Type
                        </Text>
                        <View style={{ borderColor: 'black', width: 180, height: 38, borderWidth: 1, borderRadius: 5, justifyContent: 'center', marginTop: 5, paddingLeft: 5, paddingRight: 5 }}>

                        </View>
                    </View>

                    <View style={{ borderColor: 'black',borderRadius:8, borderWidth: 1, width: height / 2, height: height / 3 }}>


                    </View>
                    <TouchableOpacity style={{ height: 32, width: 200, backgroundColor: 'gray', borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ alignSelf: "center", color: 'white', fontWeight: '800' }}>UPLOAD
                        </Text>
                    </TouchableOpacity>




                </View>

                <View style={{marginTop:10}}>


                    <View style={{ flexDirection: 'row', height: 40, justifyContent: 'space-between', paddingLeft: 20, marginBottom: 10, paddingRight: 20, alignItems: 'center', paddingBottom: 10, borderBottomColor: 'black', borderBottomWidth: 1, paddingBottom: 10 }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: '500' }}>
                                Background Color
                            </Text>
                        </View >
                        <View style={{ height: 40, borderColor: 'black', borderWidth: 1, width: 1, backgroundColor: 'green',position:'absolute',alignSelf:'center',left:width/2,bottom:5 }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, paddingRight: 40 }}>

                            <View style={{ width: 25, height: 25, backgroundColor: 'gray', marginRight: 10 }} />
                            <View style={{ width: 100, height: 25,borderColor:'gray',borderWidth:1 }} />
                            <View style={{ width: 25, height: 25, backgroundColor: 'gray', marginLeft: 10 }} />

                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', height: 40, justifyContent: 'space-between', paddingLeft: 20, marginBottom: 10, paddingRight: 20, alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1, paddingBottom: 10 }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: '500' }}>
                                Table Border Color
                            </Text>
                        </View >
                        <View style={{ height: 40, borderColor: 'black', borderWidth: 1, width: 1, backgroundColor: 'green',position:'absolute',alignSelf:'center',left:width/2,bottom:5 }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, paddingRight: 40 }}>

                            <View style={{ width: 25, height: 25, backgroundColor: 'gray', marginRight:10 }} />
                            <View style={{ width: 100, height: 25,borderColor:'gray',borderWidth:1  }} />
                            <View style={{ width: 25, height: 25, backgroundColor: 'gray', marginLeft: 10 }} />

                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', height: 40, justifyContent: 'space-between', paddingLeft: 20, marginBottom: 10, paddingRight: 20, alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1, paddingBottom: 10 }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: '500' }}>
                                Check Color
                            </Text>
                        </View >
                        <View style={{ height: 40, borderColor: 'black', borderWidth: 1, width: 1, backgroundColor: 'green',position:'absolute',alignSelf:'center',left:width/2,bottom:5 }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, paddingRight: 40 }}>

                            <View style={{ width: 25, height: 25, backgroundColor: 'gray', marginRight: 10 }} />
                            <View style={{ width: 100, height: 25,borderColor:'gray',borderWidth:1  }} />
                            <View style={{ width: 25, height: 25, backgroundColor: 'gray', marginLeft: 10 }} />

                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', height: 40, justifyContent: 'space-between', paddingLeft: 20, marginBottom: 10, paddingRight: 20, alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1, paddingBottom: 10 }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: '500' }}>
                                To Clean Color
                            </Text>
                        </View >
                        <View style={{ height: 40, borderColor: 'black', borderWidth: 1, width: 1, backgroundColor: 'green',position:'absolute',alignSelf:'center',left:width/2,bottom:5,position:'absolute',alignSelf:'center',left:width/2,bottom:5 }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, paddingRight: 40 }}>

                            <View style={{ width: 25, height: 25, backgroundColor: 'gray', marginRight: 10 }} />
                            <View style={{ width: 100, height: 25,borderColor:'gray',borderWidth:1  }} />
                            <View style={{ width: 25, height: 25, backgroundColor: 'gray', marginLeft: 10 }} />

                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', height: 40, justifyContent: 'space-between', paddingLeft: 20, marginBottom: 10, paddingRight: 20, alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1, paddingBottom: 10 }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: '500' }}>
                                Cleaned Color
                            </Text>
                        </View >
                        <View style={{ height: 40, borderColor: 'black', borderWidth: 1, width: 1, backgroundColor: 'green',position:'absolute',alignSelf:'center',left:width/2,bottom:5 }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, paddingRight: 40 }}>

                            <View style={{ width: 25, height: 25, backgroundColor: 'gray', marginRight: 10 }} />
                            <View style={{ width: 100, height: 25,borderColor:'gray',borderWidth:1  }} />
                            <View style={{ width: 25, height: 25, backgroundColor: 'gray', marginLeft: 10 }} />

                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', height: 40, justifyContent: 'space-between', paddingLeft: 20, marginBottom: 10, paddingRight: 20, alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1, paddingBottom: 10 }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: '500' }}>
                                Employee Name Box
                            </Text>
                        </View >
                        <View style={{ height: 40, borderColor: 'black', borderWidth: 1, width: 1, backgroundColor: 'green',position:'absolute',alignSelf:'center',left:width/2,bottom:5 }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, paddingRight: 40 }}>

                            <View style={{ width: 25, height: 25, backgroundColor: 'gray', marginRight: 10 }} />
                            <View style={{ width: 100, height: 25,borderColor:'gray',borderWidth:1 }} />
                            <View style={{ width: 25, height: 25, backgroundColor: 'gray', marginLeft: 10 }} />

                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', height: 40, justifyContent: 'space-between', paddingLeft: 20, marginBottom: 10, paddingRight: 20, alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1, paddingBottom: 10 }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: '500' }}>
                                Employee Name Text
                            </Text>
                        </View >
                        <View style={{ height: 40, borderColor: 'black', borderWidth: 1, width: 1, backgroundColor: 'green',position:'absolute',alignSelf:'center',left:width/2,bottom:5 }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, paddingRight: 40 }}>

                            <View style={{ width: 25, height: 25, backgroundColor: 'gray', marginRight: 10 }} />
                            <View style={{ width: 100, height: 25,borderColor:'gray',borderWidth:1  }} />
                            <View style={{ width: 25, height: 25, backgroundColor: 'gray', marginLeft: 10 }} />

                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', height: 40, justifyContent: 'space-between', paddingLeft: 20, marginBottom: 10, paddingRight: 20, alignItems: 'center', borderBottomColor: 'black', borderBottomWidth: 1, paddingBottom: 10 }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: '500' }}>
                                Icon Background Color
                            </Text>
                        </View >
                        <View style={{ height: 40, borderColor: 'black', borderWidth: 1, width: 1, backgroundColor: 'green',position:'absolute',alignSelf:'center',left:width/2,bottom:5 }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 200, paddingRight: 40 }}>

                            <View style={{ width: 25, height: 25, backgroundColor: 'gray', marginRight: 10 }} />
                            <View style={{ width: 100, height: 25,borderColor:'gray',borderWidth:1  }} />
                            <View style={{ width: 25, height: 25, backgroundColor: 'gray', marginLeft: 10 }} />

                        </View>
                    </View>





                </View>



                <View style={{ width: 100, height: 35, backgroundColor: 'gray', alignSelf: 'center', marginBottom: 20, marginTop: 10, justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={{ fontSize: 18, fontWeight: '600',color:'white'}}>save</Text>

                </View>




            </View>

        </ScrollView>




    );
}

const styles = StyleSheet.create({


});

export default SettingUser
