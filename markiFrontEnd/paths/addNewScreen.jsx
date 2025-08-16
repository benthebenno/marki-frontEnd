import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../colors";
import { useNavigation } from "@react-navigation/native";
import TopBar from "../components/topBar";
import * as SecureStore from "expo-secure-store";
import FontAwesome from "@expo/vector-icons/FontAwesome";
export async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}
export async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

function AddNew() {
  const DATA = require("../data/stocks_cleaned.json");
  const [searchQ, setSearchQ] = useState("");
  const Item = ({ id, title, searchVal }) => {
    // console.log("start");
    // console.log(title);
    // console.log(searchVal);
    if (title.includes(searchVal)) {
      return (
        <View style={styles.itemContainer}>
          <Text style={styles.stockName}>{title}</Text>
          <Pressable
            style={styles.addButton}
            onPress={() => {
              console.log(id);
              save(id, "true");
            }}
          >
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
          <Pressable
            style={styles.removeButton}
            onPress={() => {
              console.log(id);
              save(id, "false");
            }}
          >
            <Text style={styles.buttonText}>Remove</Text>
          </Pressable>
        </View>
      );
    }
  };
  [optionsList, setOptionList] = useState(
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <Item id={item.id} title={item.title} searchVal={searchQ} />
      )}
      keyExtractor={(item) => item.id}
    />
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
        <Text style={styles.header}>Add New Stocks</Text>
        <View style={styles.searchBox}>
          <FontAwesome name="search" size={24} color="black" />
          <TextInput
            placeholder="Search"
            style={styles.textBox}
            value={searchQ}
            onChangeText={setSearchQ}
            onSubmitEditing={() => {
              // console.log("clicked sumbit");
              setOptionList(
                <FlatList
                  data={DATA}
                  renderItem={({ item }) => (
                    <Item id={item.id} title={item.title} searchVal={searchQ} />
                  )}
                  keyExtractor={(item) => item.id}
                />
              );
            }}
          ></TextInput>
        </View>
        {optionsList}
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
  searchBox: {
    backgroundColor: colors.box,
    borderRadius: 10,
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginBottom: 50,
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
  textBox: {
    backgroundColor: colors.box,
    paddingLeft: 5,
    width: "60%",
    height: "100%",
  },
});
export default AddNew;
