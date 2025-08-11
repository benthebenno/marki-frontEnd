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
import * as SecureStore from "expo-secure-store";

export async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}
export async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    console.log(key + " does not exist");
  }
  return result;
}
function StockList() {
  //   useEffect(() => {
  //     SecureStore.setItemAsync("NVDA", "true");
  //   }, []);
  const DATA = require("../data/stocks.json");

  const AsyncStockItem = ({ item }) => {
    const [exists, setExists] = useState(false);

    useEffect(() => {
      let isMounted = true;

      const checkStoredValue = async () => {
        try {
          console.log(item.id);
          const value = await getValueFor(item.id);
          console.log(value);
          if (isMounted && value === "true") {
            setExists(true);
          }
        } catch (e) {
          console.warn(`Error checking item ${item.id}:`, e);
        }
      };

      checkStoredValue();

      return () => {
        isMounted = false;
      };
    }, [item.id]);

    if (!exists) return <Text>Nothing</Text>;

    return (
      <View style={{ padding: 10 }}>
        <Text>This exists {item.id}</Text>
        <Text>Heloooo</Text>
      </View>
    );
  };

  //   const Item = async ({ id, title }) => {
  //     const [returnVal, setReturnVal] = useState(
  //       <View>
  //         <Text>Hello</Text>
  //       </View>
  //     );
  //     if (await getValueFor(id)) {
  //       setReturnVal(
  //         <View style={styles.itemContainer}>
  //           <View style={styles.imageBox}>
  //             <Image
  //               style={styles.image}
  //               source={require("../images/testStock.png")}
  //             ></Image>
  //           </View>
  //           <View style={styles.bottomRow}>
  //             <Text style={styles.title}>{title}</Text>
  //             <Pressable
  //               style={styles.buttonBack}
  //               onPress={() => console.log("Pressed")}
  //             >
  //               <FontAwesome
  //                 name="long-arrow-right"
  //                 size={45}
  //                 color={colors.text}
  //               />
  //             </Pressable>
  //           </View>
  //         </View>
  //       );
  //     }
  //     return returnVal;

  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => <AsyncStockItem item={item} />}
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
