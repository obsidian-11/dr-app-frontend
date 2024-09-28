import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Import Stack Navigator
import HomeScreen from "./components/HomeScreen";
import Shelter from "./components/Shelter";

const RealTimeUpdatesScreen = () => (
  <View style={styles.screen}>
    <Text>Real Time Updates Screen</Text>
  </View>
);

const ResourceSharingScreen = () => (
  <View style={styles.screen}>
    <Text>Resource Sharing Screen</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={styles.screen}>
    <Text>Settings Screen</Text>
  </View>
);

// Create a Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const MapScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Real Time Updates":
              iconName = "timer";
              break;
            case "Resource Sharing":
              iconName = "folder";
              break;
            case "Settings":
              iconName = "settings";
              break;
            default:
              iconName = "home";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Real Time Updates"
        component={RealTimeUpdatesScreen}
      />
      <Tab.Screen
        name="Resource Sharing"
        component={ResourceSharingScreen}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: false }} // Optional: Hide header for HomeScreen
        />
        <Stack.Screen
          name="Shelter"
          component={Shelter}
          options={{ title: " Shelter" }} // Title for AddShelterScreen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
