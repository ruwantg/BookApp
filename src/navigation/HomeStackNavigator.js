// navigation/HomeStackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import BookDetailScreen from "../screens/BookDetailScreen";

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Books List" component={HomeScreen} />
      <Stack.Screen name="Book Detail" component={BookDetailScreen} />
    </Stack.Navigator>
  );
}
