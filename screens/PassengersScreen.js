import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import PassengersListItem from "../components/PassengersListItem";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PassengersScreen(props) {
  const [passengerList, setPassengerList] = useState([]);
  const [size, setSize] = useState(10);

  useEffect(() => {
    let source = axios.CancelToken.source();
    const fetchData = async () => {
      const response = await axios(
        `https://api.instantwebtools.net/v1/passenger?page=0&size=${size}`,
        {
          cancelToken: source.token,
        }
      );
      setPassengerList(response.data.data);
    };
    fetchData();
    return () => {
      source.cancel("Cancelling in cleanup");
    };
  }, [size, setPassengerList]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.header}>Passenger List</Text>

      <SafeAreaView style={styles.container}>
        <FlatList
          data={passengerList}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <PassengersListItem
              key={itemData.item._id}
              handleViewDetails={() =>
                props.navigation.navigate("PassengerDetails", {
                  passengerId: itemData.item._id,
                })
              }
              item={itemData.item}
            />
          )}
        />
      </SafeAreaView>
      <Button
        title="More Passengers"
        onPress={() => setSize((pre) => pre + 10)}
      />
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
