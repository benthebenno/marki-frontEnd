import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../colors";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

function TopBar() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Menu</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close Menu</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => navigation.navigate("Main")}>
        <Image
          source={require("C:/Users/benra/marki-frontEnd/markiFrontEnd/images/MarkyLogo.png")}
          style={styles.image}
        ></Image>
      </Pressable>
      <Pressable onPress={() => setModalVisible(true)}>
        <AntDesign name="menufold" size={45} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "12%",
    backgroundColor: colors.topBar,
    paddingTop: 35,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  image: { width: 60, height: 60, resizeMode: "contain" },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#1d2121ff",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  textStyle: {
    color: colors.text,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    // marginBottom: 15,
    fontSize: 30,
    textAlign: "center",
    color: colors.text,
    fontWeight: "bold",
  },
});

export default TopBar;
