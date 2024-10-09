import { View, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { db } from "../../configs/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/BusinessDetail/Intro";
import ActionButton from "../../components/BusinessDetail/ActionButton";
import About from "../../components/BusinessDetail/About";

export default function Businessdetail() {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDetailBusinessById();
  }, []);

  const getDetailBusinessById = async () => {
    setLoading(true);
    const docRef = doc(db, "BusinessList", businessid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setBusiness(docSnap.data());
      setLoading(false);
    } else {
      console.log("No such document!");
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: "70%" }}
          size="large"
          color={Colors.PRIMARY}
        />
      ) : (
        <View>
          {/* Intro */}
          <Intro business={business} />
          {/* Action Buttons */}
          <ActionButton business={business} />
          {/* About Section */}
          <About business={business} />
        </View>
      )}
    </ScrollView>
  );
}
