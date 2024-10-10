import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function UserInfo() {
  const { user } = useUser();

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <Image
        source={{ uri: user.imageUrl }}
        style={{ width: 100, height: 100, borderRadius: 99, marginBottom: 10 }}
      />
      <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
        {user?.fullName}
      </Text>
      <Text style={{ fontFamily: "outfit", fontSize: 15 }}>
        {user?.primaryEmailAddress.emailAddress}
      </Text>
    </View>
  );
}
