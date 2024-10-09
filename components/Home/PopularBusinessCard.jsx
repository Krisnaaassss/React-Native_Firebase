import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function PopularBusinessCard({ business }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/businessdetail/${business.id}`)}
      style={{
        marginLeft: 10,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 15,
      }}
    >
      <Image
        source={{ uri: business?.imageUrl }}
        style={{ width: 220, height: 150, resizeMode: "stretch" }}
      />
      <View style={{ marginTop: 10, gap: 5 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 18 }}>
          {business?.name}
        </Text>
        <Text
          style={{ fontFamily: "outfit", fontSize: 12, color: Colors.GRAY }}
        >
          {business.address}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 5,
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
            <Image
              source={require("./../../assets/images/star.png")}
              style={{ width: 15, height: 15 }}
            />
            <Text style={{ fontFamily: "outfit" }}>4.5</Text>
          </View>
          <Text
            style={{
              fontFamily: "outfit",
              backgroundColor: Colors.PRIMARY,
              padding: 3,
              fontSize: 12,
              borderRadius: 5,
              overflow: "hidden",
              color: "#fff",
            }}
          >
            {business?.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
