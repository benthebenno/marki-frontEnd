import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Modal,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../colors";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function StockList() {
  const checkAndSaveTrueKeys = async () => {
    console.log("Key started");
    inputKeys = [1, 2, 3];
    const result = {};

    for (const key of inputKeys) {
      console.log(key);
      const value = await SecureStore.getItemAsync(key);
      console.log(value);
      if (value) {
        result[key] = true;
      }
    }

    const jsonContent = JSON.stringify(result, null, 2);

    // Save JSON to file
    const fileUri = FileSystem.documentDirectory + "currentStock.json";

    await FileSystem.writeAsStringAsync(fileUri, jsonContent);

    console.log("True keys saved to:", fileUri);
  };

  useEffect(() => {
    console.log("happened");
    checkAndSaveTrueKeys();
  }, []);
  const DATA = require("./currentStock.json");

  const Item = ({ title }) => (
    <View style={styles.itemContainer}>
      <View style={styles.imageBox}>
        <Image
          style={styles.image}
          source={require("../images/testStock.png")}
        ></Image>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.title}>{title}</Text>
        <Pressable
          style={styles.buttonBack}
          onPress={() => console.log("Pressed")}
        >
          <FontAwesome name="long-arrow-right" size={45} color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => <Item title={item.title} />}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonBack: {
    // width: 100,
    // height: 100,
    backgroundColor: "#000000ff",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30,
  },
  itemContainer: {
    backgroundColor: "#D5E2F4",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  imageBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    color: colors.text,
    fontWeight: "heavy",
  },
});

export default StockList;
