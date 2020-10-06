import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PassengersScreen from "./screens/PassengersScreen";
import PassengerDetailsScreen from "./screens/PassengerDetailsScreen";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import PassengerReducer from "./actions-reducers/PassengerReducer";

const rootReducer = combineReducers({
  passengers: PassengerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "blue",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          initialRouteName="Passengers"
        >
          <Stack.Screen name="Passengers" component={PassengersScreen} />
          <Stack.Screen
            name="PassengerDetails"
            component={PassengerDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
