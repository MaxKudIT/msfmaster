import React from 'react';
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {Bar} from "react-native-progress";
import {red} from "react-native-reanimated/lib/typescript/Colors";

type Progresstype = {
    value: string,
    progress: number
}

const Progressbarn = ({value, progress}:Progresstype) => {
    const steps = 3
    return (
      <View style={styles.containter}>
          <Bar width={300} color={"#FF0C69"} progress={progress} style={styles.bar}/>
          <Text style={{color: "white", fontSize: 18}}>{value}/{steps}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
    containter: {
        width: "100%",
        height: 45,
        alignItems: "center",
        top: Dimensions.get("window").height - 40,
        justifyContent: "space-between",
        position: "absolute",
        alignSelf: "center"

    },
    bar: {
        borderColor: "#FF0C69",
    }
})
export default Progressbarn;