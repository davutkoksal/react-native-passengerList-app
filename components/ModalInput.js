import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Modal, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  changeName,
  fetchPassengers,
} from "../actions-reducers/PassengerActions";

export default function ModalInput(props) {
  const dispatch = useDispatch();
  const size = useSelector((state) => state.passengers.size);
  const initialName = props.initialName;
  const passengerId = props.passengerId;
  const [newName, setNewName] = useState(initialName);

  const handleNameChange = () => {
    dispatch(changeName(passengerId, newName));
    dispatch(fetchPassengers(size));
    props.onCancel();
  };

  return (
    <Modal visible={props.isVisible} animationType="slide">
      <View style={styles.container}>
        <TextInput
          value={newName}
          style={styles.nameInput}
          onChangeText={(text) => setNewName(text)}
        ></TextInput>
        <View style={styles.btnContainer}>
          <Button onPress={props.onCancel} title="Cancel" />
          <Button title="Edit" onPress={handleNameChange} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nameInput: {
    width: "80%",
    textAlign: "center",
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
  },
  btnContainer: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

// async function patchData() {
//   try {
//     const response = await axios.patch(
//       `https://api.instantwebtools.net/v1/passenger/${passengerId}`,
//       { name: editedPassengerName }
//     );
//   } catch (err) {
//     Alert.alert("Alert Title", "My Alert Msg", [
//       {
//         text: "Ask me later",
//         onPress: () => console.log("Ask me later pressed"),
//       },
//     ]);
//   }
// }
