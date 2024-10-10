import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import Catergory from "../../components/Home/Catergory";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";

export default function explore() {
  const [businessList, setBusinessList] = useState([]);

  const getBusinessByCategory = async (category) => {
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 30, paddingTop: 20 }}>
        Explore More
      </Text>
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
          borderWidth: 1,
        }}
      >
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#8f8f8f"
          style={{ fontFamily: "outfit", fontSize: 16 }}
        />
      </View>
      {/* Category */}
      <View style={{ marginLeft: -25, marginTop: 20 }}>
        <Catergory
          explore={true}
          onCategorySelect={(category) => getBusinessByCategory(category)}
        />
      </View>
      {/* Business List */}
      <ExploreBusinessList businessList={businessList} />
    </View>
  );
}
