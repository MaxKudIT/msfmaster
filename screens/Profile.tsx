import React from 'react';
import {StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const Profile = () => {
    return (
        <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#3B3B3B'
    },
})

export default Profile;