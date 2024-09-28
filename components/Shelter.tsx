import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, List, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons"; // Make sure to install this package

const Shelter = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/shelter.jpg")}
        style={{ width: "100%", height: 160 }}
      />

      <View style={{ padding: 20, gap: 0 }}>
        <View style={{ gap: 5 }}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Text
              style={{ fontWeight: "bold" }}
              variant="titleLarge"
            >
              The Shepherd's Inn
            </Text>
            <View
              style={{
                backgroundColor: "#45b7ff",
                padding: 4,
                borderRadius: 50,
              }}
            >
              <Icon
                color="white"
                name="check"
              />
            </View>
          </View>

          <Text style={{ color: "#707070" }}>0.7 mi from your location</Text>
        </View>

        <View style={{ gap: 0, marginTop: 15 }}>
          <Text
            variant="titleMedium"
            style={{ fontWeight: "bold" }}
          >
            Resources available
          </Text>

          <Text
            variant="bodySmall"
            style={{ color: "#707070" }}
          >
            Last updated: 55 min ago
          </Text>
        </View>

        <View style={{ gap: 0, marginTop: 10 }}>
          <List.Item
            title="Food"
            titleStyle={{ fontSize: 14 }}
            //   description="..."
            left={(props) => (
              <List.Icon
                {...props}
                icon="food"
              />
            )}
          />
          <List.Item
            title="4 Beds"
            titleStyle={{ fontSize: 14 }}
            //   description="..."
            left={(props) => (
              <List.Icon
                {...props}
                icon="bed"
              />
            )}
          />
          <List.Item
            title="Water"
            titleStyle={{ fontSize: 14 }}
            //   description="..."
            left={(props) => (
              <List.Icon
                {...props}
                icon="water"
              />
            )}
          />
          <List.Item
            title="Electricity"
            titleStyle={{ fontSize: 14 }}
            //   description="..."
            left={(props) => (
              <List.Icon
                {...props}
                icon="power-plug"
              />
            )}
          />
          <List.Item
            title="First Aid"
            titleStyle={{ fontSize: 14 }}
            //   description="..."
            left={(props) => (
              <List.Icon
                {...props}
                icon="pill"
              />
            )}
          />
        </View>

        <Text
          variant="titleMedium"
          style={{ fontWeight: "bold", marginTop: 15 }}
        >
          Contact Info
        </Text>

        <View style={{ marginTop: 6, gap: 6 }}>
          <Text>Email: exampleshelter@gmail.com</Text>
          <Text>Phone: +1 (123) 456-7890</Text>
        </View>

        <Button
          style={{ backgroundColor: "#FFB248", marginTop: 20, borderRadius: 5 }}
          labelStyle={{ color: "white", paddingVertical: 3 }}
          onPress={() => {}}
        >
          Navigate to Shelter
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Shelter;
