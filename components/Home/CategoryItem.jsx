import {
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default function CategoryItem({ category }) {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)}>
      <View
        style={{
          padding: 15,
          backgroundColor: "#fff",
          borderRadius: 99,
          marginRight: 15,
        }}
      >
        <Image
          source={{
            uri: category.icon,
          }}
          style={{ width: 50, height: 50 }}
        />
      </View>

      <Text
        style={{
          fontSize: 12,
          fontFamily: "outfit-medium",
          textAlign: "center",
          mt: 5,
        }}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}
