import { View, Text } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import Catergory from "../../components/Home/Catergory";

export default function home() {
  return (
    <View>
      {/* Header */}
      <Header />
      {/* Slider */}
      <Slider />
      {/* Category */}
      <Catergory />
      {/* Popular Business List */}
    </View>
  );
}
