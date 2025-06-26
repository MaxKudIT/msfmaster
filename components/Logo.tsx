import Svg, {ClipPath, Defs, G, Line, Rect} from "react-native-svg";
import {View, Text, StyleSheet} from "react-native";


export const Logo = () => {
    return (
        <View style={styles.container}>
            <Svg width="60" height="60" viewBox="0 0 30 28" fill="none">
                <Defs>
                    <ClipPath id="clip0_14_143">
                        <Rect width="30" height="28" fill="white" />
                    </ClipPath>
                </Defs>
                <G clipPath="url(#clip0_14_143)">
                    <Rect width="30" height="28" fill="#222222" />
                    <Line
                        x1="13.304"
                        y1="26.94"
                        x2="28.304"
                        y2="2.94"
                        stroke="#9F0742"
                        strokeWidth="4"
                    />
                    <Line
                        x1="7.304"
                        y1="25.94"
                        x2="22.304"
                        y2="1.94"
                        stroke="#E50A5E"
                        strokeWidth="4"
                    />
                    <Line
                        x1="1.304"
                        y1="24.94"
                        x2="16.304"
                        y2="0.940002"
                        stroke="#3B3B3B"
                        strokeWidth="4"
                    />
                </G>
            </Svg>
            <Text style={{fontSize: 20, color: "#FF0C69", fontWeight: 600,}}>Messkud</Text>
        </View>



    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 20,

    }
})