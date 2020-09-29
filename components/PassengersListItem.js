import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PassengersListItem(props) {
  const { name, trips } = props.item;
  return (
    <TouchableOpacity onPress={props.handleViewDetails}>
      <View style={styles.item}>
        <View style={styles.itemPart}>
          <Text>Passenger Name</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.itemPart}>
          <Text>Passenger's Trips Count</Text>
          <Text style={styles.trips}>{trips}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    height: 100,
    width: "90%",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  trips: {
    fontSize: 20,
    padding: 10,
  },
  name: {
    fontSize: 20,
    padding: 10,
  },
});
