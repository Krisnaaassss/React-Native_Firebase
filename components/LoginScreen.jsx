import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";

export default function LoginScreen() {
  WebBrowser.maybeCompleteAuthSession();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Add signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Image
          source={require("./../assets/images/login.png")}
          style={{
            width: 220,
            height: 450,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: "#000",
          }}
        />
      </View>
      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}
        >
          Your Ultimate
          <Text style={{ color: Colors.PRIMARY }}>
            {" "}
            Community Busisness Directory App
          </Text>
        </Text>
        <Text
          style={{
            fotnsize: 20,
            fontFamily: "outfit",
            textAlign: "center",
            marginVertical: 15,
            color: Colors.GRAY,
          }}
        >
          Find your favorite busisness near you and post your own busisness to
          your community
        </Text>
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text
            style={{ color: "#fff", textAlign: "center", fontFamily: "outfit" }}
          >
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -20,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 20,
  },
});
