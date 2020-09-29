import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import ModalInput from "../components/ModalInput";

export default function PassengerDetailsScreen(props) {
  const [isVisible, setIsvisible] = useState(false);
  const { passengerId } = props.route.params;
  const [passengerName, setPassengerName] = useState("");
  const [passengerTrips, setPassengerTrips] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [editedPassengerName, setEditedPassengerName] = useState("");

  const handleCancelModalVisibility = () => {
    setIsvisible(false);
  };

  useEffect(() => {
    let source = axios.CancelToken.source();
    const unsubscribe = async () => {
      const response = await axios(
        `https://api.instantwebtools.net/v1/passenger/${passengerId}`,
        {
          cancelToken: source.token,
        }
      );
      setPassengerName(response.data.name);
      setPassengerTrips(response.data.trips);
      setSelectedId(response.data._id);
    };
    unsubscribe();
    console.log("hi");

    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [passengerId, setPassengerName]);

  const editName = (nameVal) => {
    setPassengerName(nameVal);
  };

  return (
    <View style={styles.container}>
      <View style={styles.edit}>
        <Text style={styles.text}>Passenger Name : {passengerName}</Text>
        <Button
          style={styles.btn}
          title="Edit"
          onPress={() => setIsvisible(true)}
        />
      </View>
      <View style={styles.trip}>
        <Text style={styles.text}>
          Passenger's Trips Count : {passengerTrips}
        </Text>
      </View>
      <ModalInput
        onCancel={handleCancelModalVisibility}
        name={passengerName}
        passengerId={selectedId}
        isVisible={isVisible}
        editName={editName}
      />
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
