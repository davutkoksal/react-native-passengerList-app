export const FETCH_PASSENGERS = "FETCH_PASSENGERS";
export const SET_SİZE = "SET_SİZE";
import axios from "axios";
import { Alert } from "react-native";

export function setSize(size) {
  return { type: SET_SİZE, payload: size };
}

export function fetchPassengers(size) {
  return async (dispatch) => {
    try {
      const response = await axios(
        `https://api.instantwebtools.net/v1/passenger?page=0&size=${size}`
      );
      const data = response.data.data;
      dispatch({ type: FETCH_PASSENGERS, payload: data });
    } catch (error) {
      throw error;
    }
  };
}

export function changeName(passengerId, newName, size) {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `https://api.instantwebtools.net/v1/passenger/${passengerId}`,
        { name: newName }
      );
      const data = response.data.data;
    } catch (error) {
      Alert.alert("Error", "Something went wrong", [
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    }
  };
}
