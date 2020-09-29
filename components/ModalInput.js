import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";

const patchData = async (passengerId, editedPassengerName) => {
  try {
    const response = await axios.patch(
      `https://api.instantwebtools.net/v1/passenger/${passengerId}`,
      { name: editedPassengerName }
    );
  } catch (err) {
    Alert.alert("Editing Failed", "Sorry!Something Went Wrong While Editing", [
      {
        text: "Close",
      },
    ]);
  }
};

export default function ModalInput(props) {
  const passengerId = props.passengerId;
  const editName = props.editName;
  const [nameVal, setNameVal] = useState("");
  const [newName, setNewName] = useState("");
  useEffect(() => {
    setNameVal(props.name);
  }, [props.name]);

  useEffect(() => {
    if (passengerId) {
      patchData(passengerId, newName);
    }
  }, [newName]);

  const handleAll = () => {
    setNewName(nameVal);
    props.onCancel();
    editName(nameVal);
    setNameVal(" ");
  };

  return (
    <Modal visible={props.isVisible} animationType="slide">
      <View style={styles.container}>
        <TextInput
          value={nameVal}
          style={styles.nameInput}
          onChangeText={(text) => setNameVal(text)}
        ></TextInput>
        <View style={styles.btnContainer}>
          <Button onPress={props.onCancel} title="Cancel" />
          <Button title="Edit" onPress={handleAll} />
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
