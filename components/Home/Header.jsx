import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "./../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function Header() {
  const { user } = useUser();

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 65,
        backgroundColor: Colors.PRIMARY,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          /* uri adalah sebuah string yang berisi URL dari sumber daya yang ingin 
          diambil. Dalam kasus ini, kita menggunakan imageUrl dari user yang sedang 
          login. */
          style={{ width: 45, height: 45, borderRadius: 99 }}
        />
        <View>
          <Text style={{ color: "#fff" }}>Welcome</Text>
          <Text
            style={{ fontSize: 20, fontFamily: "outfit-medium", color: "#fff" }}
          >
            {user?.fullName}
          </Text>
        </View>
      </View>
      {/* Search Bar */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 10,
          marginTop: 15,
          borderRadius: 8,
        }}
      >
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#8f8f8f"
          style={{ fontFamily: "outfit", fontSize: 16 }}
        />
      </View>
    </View>
  );
}
