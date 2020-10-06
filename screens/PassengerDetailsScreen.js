import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ModalInput from "../components/ModalInput";
import {
  changeName,
  fetchPassenger,
  fetchPassengers,
} from "../actions-reducers/PassengerActions";

export default function PassengerDetailsScreen(props) {
  const dispatch = useDispatch();
  const [isVisible, setIsvisible] = useState(false);
  const { passengerId, size } = props.route.params;
  const selectedPassenger = useSelector((state) =>
    state.passengers.passengerList.find((p) => p._id === passengerId)
  );

  useEffect(() => {
    dispatch(fetchPassengers(size));
  }, [dispatch]);

  const handleCancelModalVisibility = () => {
    setIsvisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.edit}>
        <Text style={styles.text}>
          Passenger Name :{selectedPassenger?.name}
        </Text>
        <Button
          style={styles.btn}
          title="Edit"
          onPress={() => setIsvisible(true)}
        />
      </View>
      <View style={styles.trip}>
        <Text style={styles.text}>
          Passenger's Trips Count :{selectedPassenger?.trips}
        </Text>
      </View>
      {isVisible && (
        <ModalInput
          onCancel={handleCancelModalVisibility}
          initialName={selectedPassenger?.name}
          passengerId={passengerId}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    height: 150,
    width: "90%",
    margin: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  edit: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  trip: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: { fontSize: 20 },
  btn: { borderRadius: 10, width: 20, height: 50 },
});
