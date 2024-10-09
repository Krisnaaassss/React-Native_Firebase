import { View, FlatList } from "react-native";
import React from "react";
import BusinessListCard from "./BusinessListCard";

export default function ExploreBusinessList({ businessList }) {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={businessList}
      renderItem={({ item, index }) => (
        <BusinessListCard key={index} business={item} />
      )}
      ListFooterComponent={() => <View style={{ height: 230 }} />}
    />
  );
}
