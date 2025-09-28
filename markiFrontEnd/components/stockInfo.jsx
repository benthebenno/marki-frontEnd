import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { colors } from "../colors";
import { LinearGradient } from "expo-linear-gradient";
import TopBar from "./topBar";
import { Pressable } from "react-native";
import { save } from "../paths/addNewScreen";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-web";
import { useState, useEffect } from "react";
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
  const csvFileUrl = "https://benthebenno.github.io/jesse_score_rankings.csv"; // Replace with your actual URL
  const [csvData, setCsvData] = useState([]);

  readRemoteFile(csvFileUrl, {
    complete: (results) => {
      console.log("Parsed CSV data:", results.data);
      // results.data will contain the parsed CSV data as an array of arrays or objects
    },
    error: (error) => {
      console.error("Error parsing CSV:", error);
    },
    // Optional: Add other configuration options like header: true if your CSV has a header row
  });

  useEffect(() => {
    readRemoteFile(csvFileUrl, {
      complete: (results) => {
        setCsvData(results.data);
        // console.log("csv parsed");
        // console.log(csvData);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
      header: true, // If your CSV has a header row
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
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
          {csvData.length > 0 ? (
            <FlatList
              data={csvData}
              renderItem={({ item }) => (
                <View>
                  <Text style={{ color: "white" }}>{item.Rank}</Text>
                  <Text style={{ color: "white" }}>{item.Stock}</Text>
                  <Text style={{ color: "white" }}>
                    {item.Predicted_Change_Percent}
                  </Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text>Loading CSV data...</Text>
          )}
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
