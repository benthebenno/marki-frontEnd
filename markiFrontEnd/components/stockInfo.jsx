import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../colors";
import { LinearGradient } from "expo-linear-gradient";
import TopBar from "./topBar";
import { Pressable } from "react-native";
import { save } from "../paths/addNewScreen";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
function DetailScreen({ route }) {
  const {
    pageTitle,
    pageContent,
    pageId,
    imagePath2Weeks,
    imagePath1Month,
    imagePathAll,
  } = route.params;
  const navigation = useNavigation();
  return (
    <View>
      <TopBar></TopBar>
      <ScrollView>
        <LinearGradient
          colors={["#2f4471ff", "#051030ff"]} // Array of colors for the gradient
          style={styles.gradientBox}
          start={{ x: 0, y: 0 }} // Start point of the gradient (top-left)
          end={{ x: 1, y: 1 }} // End point of the gradient (bottom-right)
        >
          <View style={styles.titleBox}>
            <Text style={styles.title}>{pageTitle}</Text>
          </View>
          <View>
            <Text style={styles.subheading}>All Data</Text>
            <Image
              source={{ uri: imagePathAll }}
              style={styles.image}
              resizeMode="contain"
            ></Image>
          </View>
          <View>
            <Text style={styles.subheading}>Last Month</Text>
            <Image
              source={{ uri: imagePath1Month }}
              style={styles.image}
              resizeMode="contain"
            ></Image>
          </View>
          <View>
            <Text style={styles.subheading}>Two Weeks</Text>
            <Image
              source={{ uri: imagePath2Weeks }}
              style={styles.image}
              resizeMode="contain"
            ></Image>
          </View>
          <Text>{pageContent}</Text>
          <Pressable
            style={styles.removeButton}
            onPress={() => {
              save(pageId, "false");

              // This is not a permanant fix you shuld update it so it saves, then removes a test stock
              // which does not exist
              save(1, "true");
              save(1, "false");
              // this.forceUpdate();
              navigation.navigate("Main");
            }}
          >
            <Text style={styles.buttonText}>Remove This Stock</Text>
          </Pressable>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 45,
  },
  titleBox: {
    marginTop: 40,
    alignSelf: "center",
  },
  gradientBox: {
    width: "100%",
    height: "100%",
    // justifyContent: "center",
    // alignItems: "center",
    // borderRadius: 10,
  },
  removeButton: {
    alignSelf: "center",
    width: 250,
    height: 35,
    backgroundColor: "#C82323",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 200,
    // : "flex-end",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "500",
  },
  subheading: {
    alignItems: "flex-start",
    fontSize: 24,
  },
  image: {
    width: 350,
    height: 350,
    // borderRadius: 20,
    alignSelf: "center",
  },
});
export default DetailScreen;
