import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./../../configs/FirebaseConfig";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    getSliderList();
  }, []);

  const getSliderList = async () => {
    //untuk reset sliderlist
    setSliderList([]);
    // ambil data dari collection "Slider" di firestore
    const q = query(collection(db, "Slider"));

    // jalankan query untuk mengambil data
    const querySnapshot = await getDocs(q);

    // lakukan perulangan untuk setiap data yang diambil
    querySnapshot.forEach((doc) => {
      // tampilkan data yang diambil
      console.log(doc.data());

      // kode ini digunakan untuk mengupdate state sliderList dengan menambahkan data
      //baru yang diambil dari firestore, prev adalah state sebelumnya, dan kode ini
      //akan menggabungkan data sebelumnya dengan data yang baru diambil
      // sehingga state sliderList akan berisi data terbaru dari firestore
      setSliderList((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          paddingLeft: 20,
          fontFamily: "outfit-bold",
          paddingTop: 20,
          marginTop: 5,
        }}
      >
        #Special For You
      </Text>
      <FlatList
        horizontal={true}
        data={sliderList}
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 20, marginTop: 10 }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: 300,
              height: 250,
              borderRadius: 15,
              marginRight: 15,
              resizeMode: "stretch",
            }}
          />
        )}
      />
    </View>
  );
}
