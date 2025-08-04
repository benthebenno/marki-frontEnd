import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./paths/homeScreen";
import MainScreen from "./paths/mainScreen";
import AddNew from "./paths/addNewScreen";
import save from "./helpers/storage";

export default function App() {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    save("listNum", 0);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add"
          component={AddNew}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
