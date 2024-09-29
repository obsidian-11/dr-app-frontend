import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons"; // Make sure to install this package

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
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: string; text: string }>
  >([]);
  const [inputText, setInputText] = useState<string>("");

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

  const sendMessage = () => {
    if (inputText.trim()) {
      setChatMessages((prev) => [
        ...prev,
        { sender: "user", text: inputText.trim() },
        { sender: "bot", text: "I'm here to help! How can I assist you?" }, // Placeholder response
      ]);
      setInputText("");
    }
  };

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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Real Time Updates");
              }}
              style={styles.card}
            >
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
            </TouchableOpacity>
          )}

          <View style={styles.bottomCard}>
            <View style={{ width: "100%", gap: 10 }}>
              <Button
                labelStyle={{ color: "white", paddingVertical: 4 }}
                style={{
                  backgroundColor: "#FFB248",
                  borderRadius: 5,
                }}
                onPress={() => {
                  Linking.openURL(`tel:${911}`).catch((err) =>
                    console.error("Error making call:", err)
                  );
                }}
              >
                Send SOS
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
                Find nearest shelter
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
            <Pressable style={styles.modalBackdrop}>
              <View style={styles.modalView}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottomColor: "#e2e2e2",
                    borderBottomWidth: 1,
                    paddingBottom: 20,
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
                      color="#ffb248"
                    />
                  </Pressable>
                </View>

                {/* Chat Display */}
                <ScrollView style={styles.chatContainer}>
                  {chatMessages.map((msg, index) => (
                    <View
                      key={index}
                      style={[
                        styles.message,
                        msg.sender === "user"
                          ? styles.userMessage
                          : styles.botMessage,
                      ]}
                    >
                      <Text style={styles.messageText}>{msg.text}</Text>
                    </View>
                  ))}
                </ScrollView>

                {/* Chat Input */}
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Type your message..."
                    placeholderTextColor={"#00000040"}
                    value={inputText}
                    onChangeText={setInputText}
                  />
                  <TouchableOpacity
                    style={styles.sendButton}
                    onPress={sendMessage}
                  >
                    <Icon
                      name="send"
                      size={24}
                      color="#fff"
                    />
                  </TouchableOpacity>
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
    fontWeight: "bold",
    color: "#333",
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 10,
    padding: 8,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#ffb24830",
    borderRadius: 100,
  },
  chatContainer: {
    height: 250,
    width: "100%",
    padding: 5,
    marginTop: 10,
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#ffb24825",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#ECECEC60",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  textInput: {
    flex: 1,
    padding: 15,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#DDD",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#ffb248",
    padding: 10,
    borderRadius: 50,
  },
});

export default HomeScreen;
