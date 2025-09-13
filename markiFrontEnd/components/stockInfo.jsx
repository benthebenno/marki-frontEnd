import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../colors";
import { LinearGradient } from "expo-linear-gradient";
import TopBar from "./topBar";
import { Pressable } from "react-native";
import { save } from "../paths/addNewScreen";
import { useNavigation } from "@react-navigation/native";
function DetailScreen({ route }) {
  const { pageTitle, pageContent, pageId } = route.params;
  const navigation = useNavigation();
  return (
    <View>
      <TopBar></TopBar>
      <LinearGradient
        colors={["#2f4471ff", "#051030ff"]} // Array of colors for the gradient
        style={styles.gradientBox}
        start={{ x: 0, y: 0 }} // Start point of the gradient (top-left)
        end={{ x: 1, y: 1 }} // End point of the gradient (bottom-right)
      >
        <View style={styles.titleBox}>
          <Text style={styles.title}>{pageTitle}</Text>
        </View>
        <Text>{pageContent}</Text>
        <Pressable
          style={styles.removeButton}
          onPress={() => {
            save(pageId, "false");
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonText}>Remove This Stock</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 45,
  },
  titleBox: {
    marginTop: 40,
  },
  gradientBox: {
    width: "100%",
    height: "100%",
    // justifyContent: "center",
    alignItems: "center",
    // borderRadius: 10,
  },
  removeButton: {
    width: 250,
    height: 35,
    backgroundColor: "#C82323",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginLeft: 20,
    marginTop: 20,
    // : "flex-end",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "500",
  },
});
export default DetailScreen;
