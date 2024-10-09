import { View, Text } from "react-native";
import React from "react";
import UserInfo from "../../components/Profile/UserInfo";
import MenuList from "../../components/Profile/MenuList";

export default function profile() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 30, paddingTop: 20 }}>
        Profile
      </Text>

      {/* User Intro */}
      <UserInfo />
      {/* Menu List */}
      <MenuList />
    </View>
  );
}
