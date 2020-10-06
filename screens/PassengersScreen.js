import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import PassengersListItem from "../components/PassengersListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { fetchPassengers, setSize } from "../actions-reducers/PassengerActions";

export default function PassengersScreen(props) {
  const passengerList = useSelector((state) => state.passengers.passengerList);
  const size = useSelector((state) => state.passengers.size);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPassengers(size));
  }, [size]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.header}>Passenger List</Text>

      <SafeAreaView style={styles.container}>
        <FlatList
          data={passengerList}
          keyExtractor={(item) => item._id}
          renderItem={(itemData) => (
            <PassengersListItem
              key={itemData.item._id}
              handleViewDetails={() =>
                props.navigation.navigate("PassengerDetails", {
                  passengerId: itemData.item._id,
                  size: size,
                })
              }
              item={itemData.item}
            />
          )}
        />
      </SafeAreaView>
      <Button title="Show More" onPress={() => dispatch(setSize(size + 10))} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  header: {
    fontSize: 25,
    marginTop: 10,
  },
});
