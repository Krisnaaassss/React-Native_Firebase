import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import BusinnesListCard from "../../components/BusinessList/BusinnesListCard";
import { Colors } from "../../constants/Colors";

export default function BusinnesListByCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();

  const [businessList, setBusinnesList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
      headerBackTitleVisible: false,
    });
    getBusinessList();
  }, []);

  const getBusinessList = async () => {
    setBusinnesList([]);
    setLoading(true);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      //   console.log(doc.data());

      setBusinnesList((prev) => [...prev, doc.data()]);
    });

    setLoading(false);
  };

  return (
    <View>
      {businessList.length > 0 && loading === false ? (
        <FlatList
          data={businessList}
          onRefresh={getBusinessList}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <BusinnesListCard business={item} key={index} />
          )}
        />
      ) : loading ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.PRIMARY}
          style={{ marginTop: "70%" }}
        />
      ) : (
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
            color: Colors.GRAY,
            textAlign: "center",
            marginTop: "70%",
          }}
        >
          No Business Found
        </Text>
      )}
    </View>
  );
}
