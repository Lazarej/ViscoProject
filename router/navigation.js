import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import LoginScreen from "../pages/notConnected/Login";
import ForgotPasswordScreen from "../pages/notConnected/ForgotPassword";
import SignupScreen from "../pages/notConnected/Signup";
import GlobalStyles from "../style/GlobalStyles";
import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { UserContext } from "../store/User";
import { useEffect, useCallback } from "react";
import InterestScreen from "../pages/connected/UserInterest";
import BottomTab from "./BottomTab";
import Details from "../pages/connected/Details";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import Constants from "expo-constants";
import { View } from "react-native";
import SearchScreen from "../pages/connected/Search";
import DetailModule from "../pages/connected/videos/DetailsModule";

const Stack = createSharedElementStackNavigator();


export default function Navigation() {
  const { user } = useContext(UserContext);
  const [fontsLoaded] = useFonts({
    RobotoB: require("../assets/fonts/RobotoB.ttf"),
    RobotoN: require("../assets/fonts/RobotoN.ttf"),
    RobotoL: require("../assets/fonts/RobotoL.ttf"),
  });

  useEffect(() => {
    console.log('dfzazf',Constants.manifest.splash)
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          initialRouteName: "BottomTab",
          headerStatusBarHeight: 40,
          headerTintColor: GlobalStyles.primary.color,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {user.login ? (
          <>
            {user.interests ? (
              <Stack.Screen
                name="BottomTab"
                component={BottomTab}
                options={{ headerShown: false }}
              />
            ) : (
              <Stack.Screen
                name="Interest"
                component={InterestScreen}
                options={{ title: "", headerBackTitleVisible: false,}}
              />
            )}

            <Stack.Screen
              name="InterestOnLog"
              component={InterestScreen}
              options={{ title: "" }}
            />
              <Stack.Screen
                name="search"
                component={SearchScreen}
                options={{ title: "", headerBackTitleVisible: false,}}
              />
            <Stack.Screen
              name="Details"
              component={Details}
              options={{ title: "", headerShown: false }}
            />
            <Stack.Screen
              name="DetailsModule"
              component={DetailModule}
              options={{ title: "", headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "", headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
              options={{ title: "" }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ title: "", headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
