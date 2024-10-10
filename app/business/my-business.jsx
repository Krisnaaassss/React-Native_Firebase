import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { db } from "../../configs/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import BusinessListCard from "../../components/Explore/BusinessListCard";
import { useNavigation } from "expo-router";

export default function MyBusiness() {
  const { user } = useUser();
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const getUserBusiness = async () => {
    setLoading(true);
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
    /**
     * Fungsi untuk mengambil data business milik user yang sedang login
     * dari Firestore berdasarkan email user yang sedang login
     */
    setLoading(false);
  };

  // Saat komponen ini di-mount, maka akan menjalankan fungsi getUserBusiness
  // hanya jika user sudah ada (tidak null)
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
      headerBackTitleVisible: false,
    });
    user && getUserBusiness();
  }, [user]);

  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{ fontFamily: "outfit-bold", fontSize: 30, textAlign: "center" }}
      >
        My Business
      </Text>
      <FlatList
        onRefresh={getUserBusiness}
        refreshing={loading}
        data={businessList}
        renderItem={({ item, index }) => (
          <BusinessListCard business={item} key={index} />
        )}
      />
    </View>
  );
}
