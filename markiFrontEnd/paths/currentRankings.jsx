import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../colors";
import TopBar from "../components/topBar";
import StockList from "../components/stockList";
import { ScrollView } from "react-native";
import { readRemoteFile } from "react-native-csv";
import { useState, useEffect } from "react";

function CurRank() {
  const [csvData, setCsvData] = useState([]);
  const csvFileUrl = "https://benthebenno.github.io/jesse_score_rankings.csv"; // Replace with your actual URL

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

  const renderItem = ({ stock, rank }) => (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#ccc",
      }}
    >
      <Text>{item.Stock}</Text>
    </View>
  );
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
        <View style={{ flex: 1, paddingTop: 50 }}>
          {csvData.length > 0 ? (
            <FlatList
              data={csvData}
              renderItem={({ item }) => (
                <View style={{ flexDirection: "row" }}>
                  <Text>{item.Stock}</Text>
                  <Text>{item.Rank}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text>Loading CSV data...</Text>
          )}
        </View>
      </LinearGradient>
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
