import React from "react";

import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';


export default function WelcomePage({navigation}) {
    return(
        <View style= {styles.container}>
            <View style={styles.background}></View>
            <Image
                style={styles.image}
                source={require('./footballImage.jpg')}
            />
            <Text style={styles.bigText}>7 Aside foot field platform</Text>
            <TouchableOpacity style={styles.continue} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.continueText}>continue</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        height: '100%', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    image: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    bigText: {
        width: 300,
        position: 'absolute',
        fontSize: 60,
        textAlign: 'center',
        color: '#ffffff',
        marginTop: 180,
        zIndex: 2,
    },
    continue: {
        marginTop: 500,
        position: 'absolute',
        zIndex: 2,
        width: 200,
        height: 50,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    continueText: {
        color: '#000000'

    },
});