import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons"; // Make sure to install this package
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [disaster, setDisaster] = useState<{
    name: string;
    recentUpdate: string;
  } | null>({
    name: "Hurricane Helene",
    recentUpdate: "Category 4 as of Sep 27 4:05 pm",
  });

  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let locationData = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Your Location"
              pinColor="#af3131"
            />
          </MapView>

          {disaster && (
            <View style={styles.card}>
              <View>
                <Text style={styles.cardTitle}>{disaster.name}</Text>
                <Text style={styles.cardUpdate}>{disaster.recentUpdate}</Text>
              </View>
              <TouchableOpacity
                style={styles.infoButton}
                onPress={() => {
                  alert("More information about " + disaster.name);
                }}
              >
                <Text style={styles.infoButtonText}>i</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.bottomCard}>
            <View style={{ width: "100%", gap: 10 }}>
              <Button
                labelStyle={{ color: "black", paddingVertical: 4 }}
                style={{
                  backgroundColor: "#FFB248",
                  borderRadius: 5,
                }}
                onPress={() => {}}
              >
                Call for help
              </Button>
              <Button
                style={{
                  borderColor: "#DDDDDD",
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                labelStyle={{ color: "black", paddingVertical: 4 }}
                onPress={() => {}}
              >
                Find resources
              </Button>
              <Button
                style={{
                  borderColor: "#DDDDDD",
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                labelStyle={{ color: "black", paddingVertical: 4 }}
                onPress={() => navigation.navigate("Shelter")}
              >
                Add your shelter
              </Button>
            </View>
          </View>

          {/* Floating Button */}
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => setModalVisible(true)}
          >
            <Icon
              name="chat"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          {/* Chatbot Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <Pressable
              style={styles.modalBackdrop}
              // onPress={() => setModalVisible(false)}
            >
              <View style={styles.modalView}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.modalText}>AI Help</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Icon
                      name="close"
                      size={16}
                      color="#000"
                    />
                  </Pressable>
                </View>
              </View>
            </Pressable>
          </Modal>
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="small"
            color="#6E633D"
          />
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 15,
    paddingVertical: 25,
    backgroundColor: "#882222",
    elevation: 10,
    shadowColor: "#ddd",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    zIndex: 1000,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    paddingVertical: 20,
    backgroundColor: "white",
    elevation: 10,
    shadowColor: "#ddd",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      height: -5,
      width: -5,
    },
    zIndex: 1000,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  cardUpdate: {
    color: "white",
    fontSize: 14,
    marginVertical: 5,
  },
  infoButton: {
    backgroundColor: "white",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  infoButtonText: {
    color: "#af3131",
    fontWeight: "bold",
  },
  floatingButton: {
    position: "absolute",
    bottom: 220,
    right: 15,
    backgroundColor: "#FFB248",
    borderRadius: 100,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    // elevation: 15,
    shadowColor: "#494949",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,

    shadowRadius: 4,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Optional: Darken the background
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    height: "70%",
    margin: 20,
    marginTop: 50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    // marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 100,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#FFB248",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
