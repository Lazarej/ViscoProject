import Constants from "expo-constants";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Animated,
  StyleSheet,
  View,
} from "react-native";

export default function AnimatedSplashScreen({ children, image }) {
    const animation = useMemo(() => new Animated.Value(1), []);
    const [isAppReady, setAppReady] = useState(false);
    const [isSplashAnimationComplete, setAnimationComplete] = useState(false);
    const [fontsLoaded] = useFonts({
        RobotoB: require("../assets/fonts/RobotoB.ttf"),
        RobotoN: require("../assets/fonts/RobotoN.ttf"),
        RobotoL: require("../assets/fonts/RobotoL.ttf"),
      });

  
    useEffect(() => {
      if (isAppReady) {
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => setAnimationComplete(true));
      }
    }, [isAppReady]);
  
    const onImageLoaded = useCallback(async () => {
      try {
        await SplashScreen.hideAsync();
        // Load stuff
        await Promise.all([fontsLoaded]);
      } catch (e) {
        // handle errors
      } finally {
        setAppReady(true);
      }
    }, []);
  
    return (
      <View style={{ flex: 1 }}>
        {isAppReady && children}
        {!isSplashAnimationComplete && (
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: Constants.manifest.splash.backgroundColor,
                opacity: animation,
              },
            ]}
          >
            <Animated.Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: Constants.manifest.splash.resizeMode || "contain",
                transform: [
                  {
                    scale: animation,
                  },
                ],
              }}
              source={image}
              onLoadEnd={onImageLoaded}
              fadeDuration={0}
            />
          </Animated.View>
        )}
      </View>
    );
  }