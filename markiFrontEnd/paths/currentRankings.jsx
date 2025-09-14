import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../colors";
import TopBar from "../components/topBar";
import StockList from "../components/stockList";
import { ScrollView } from "react-native";

function CurRank() {
  return (
    <View>
      <TopBar></TopBar>
      {/* <ScrollView> */}
      <LinearGradient
        colors={["#2f4471ff", "#051030ff"]} // Array of colors for the gradient
        style={styles.gradientBox}
        start={{ x: 0, y: 0 }} // Start point of the gradient (top-left)
        end={{ x: 1, y: 1 }} // End point of the gradient (bottom-right)
      >
        <View>
          <Text style={styles.title}>Current Marki Rankings</Text>
        </View>
      </LinearGradient>

      {/* </ScrollView> */}
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    alignSelf: "center",
    fontWeight: 99,
    marginTop: 25,
  },
  gradientBox: {
    width: "100%",
    height: "100%",
  },
});
export default CurRank;
