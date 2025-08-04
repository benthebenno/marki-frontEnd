import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../colors";
import { useNavigation } from "@react-navigation/native";
import TopBar from "../components/topBar";
import save from "../helpers/storage";
import getValueFor from "../helpers/storage";

function AddNew() {
  const DATA = require("../data/stocks.json");

  const Item = ({ id, title }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.stockName}>{title}</Text>
      <Pressable
        style={styles.addButton}
        onPress={() => {
          save(getValueFor("listNum"), id);
          save("listNum", getValueFor("listNum") + 1);
        }}
      >
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
      <Pressable
        style={styles.removeButton}
        onPress={() => console.log({ title })}
      >
        <Text style={styles.buttonText}>Remove</Text>
      </Pressable>
    </View>
  );
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2f4471ff", "#051030ff"]} // Array of colors for the gradient
        style={styles.gradientBox}
        start={{ x: 0, y: 0 }} // Start point of the gradient (top-left)
        end={{ x: 1, y: 1 }} // End point of the gradient (bottom-right)
      >
        <TopBar></TopBar>
        <Text style={styles.header}>Add New Stuff</Text>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item id={item.id} title={item.title} />}
          keyExtractor={(item) => item.id}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    width: 70,
    height: 35,
    backgroundColor: "#227748",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginLeft: 20,
  },
  removeButton: {
    width: 85,
    height: 35,
    backgroundColor: "#C82323",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginLeft: 20,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "500",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gradientBox: {
    width: "100%",
    height: "100%",
    // justifyContent: "center",
    alignItems: "center",
    // borderRadius: 10,
    // paddingTop: 30,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 15,
  },
  stockName: {
    fontSize: 30,
    color: colors.text,
    fontWeight: "670",
  },
  header: {
    fontSize: 40,
    color: colors.text,
    fontWeight: "bold",
    paddingTop: 20,
    marginBottom: 10,
  },
});
export default AddNew;
