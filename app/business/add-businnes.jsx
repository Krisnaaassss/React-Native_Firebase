import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db, storage } from "../../configs/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddBusiness() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");
  const [website, setWebsite] = useState("");
  const [contact, setContact] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
      headerBackTitleVisible: false,
    });
    getCategoryList();
  }, []);

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    setImage(result.assets[0].uri);
    console.log(result);
  };

  const onAddNewBusiness = async () => {
    setLoading(true);
    // membuat nama file yang unik dengan menggunakan timestamp
    const fileName = Date.now().toString() + ".jpg";
    // fetch image dari uri yang di dapat dari image picker
    const response = await fetch(image);
    // mengkonversi response menjadi blob (binary large object)
    const blob = await response.blob();
    // membuat referensi ke storage firebase dengan nama file yang unik
    const imageRef = ref(storage, "business-app/" + fileName);
    // mengupload blob ke storage firebase
    uploadBytes(imageRef, blob)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .then((response) => {
        // mengambil url download dari file yang telah di upload
        getDownloadURL(imageRef).then(async (downloadUrl) => {
          // console.log(downloadUrl);
          // menyimpan data business ke firestore
          // dengan menggunakan url download dari gambar yang telah di upload
          saveBusinessDetail(downloadUrl);
        });
      });
  };

  const saveBusinessDetail = async (imageUrl) => {
    await setDoc(doc(db, "BusinessList", Date.now().toString()), {
      name: name,
      address: address,
      about: about,
      category: category,
      website: website,
      contact: contact,
      username: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      imageUrl: imageUrl,
    });
    setLoading(false);
    Alert.alert("Success", "Your business has been added");
  };

  const getCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setCategoryList((prev) => [
        ...prev,
        {
          label: doc.data().name,
          value: doc.data().name,
        },
      ]);
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Add New Business
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          color: Colors.GRAY,
          textAlign: "center",
        }}
      >
        Fill all details in order to add new business
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => imagePicker()}
      >
        {!image ? (
          <Image
            style={{ width: 100, height: 100 }}
            source={require("../../assets/images/placeholder.png")}
          />
        ) : (
          <Image
            style={{ width: 100, height: 100, borderRadius: 15 }}
            source={{ uri: image }}
          />
        )}
      </TouchableOpacity>
      <View>
        <TextInput
          onChangeText={(e) => setName(e)}
          placeholder="Input Your Business Name"
          placeholderTextColor={Colors.GRAY}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 20,
            fontFamily: "outfit",
            borderColor: Colors.PRIMARY,
          }}
        />
        <TextInput
          onChangeText={(e) => setAddress(e)}
          placeholder="Input Your Business Address"
          placeholderTextColor={Colors.GRAY}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 20,
            fontFamily: "outfit",
            borderColor: Colors.PRIMARY,
          }}
        />
        <TextInput
          onChangeText={(e) => setContact(e)}
          placeholder="Input Your Business Contact"
          placeholderTextColor={Colors.GRAY}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 20,
            fontFamily: "outfit",
            borderColor: Colors.PRIMARY,
          }}
        />
        <TextInput
          onChangeText={(e) => setWebsite(e)}
          placeholder="Input Your Business Website"
          placeholderTextColor={Colors.GRAY}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 20,
            fontFamily: "outfit",
            borderColor: Colors.PRIMARY,
          }}
        />
        <TextInput
          onChangeText={(e) => setAbout(e)}
          placeholder="Input Your Business About"
          placeholderTextColor={Colors.GRAY}
          multiline
          numberOfLines={5}
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#fff",
            marginTop: 20,
            fontFamily: "outfit",
            borderColor: Colors.PRIMARY,
            height: 100,
          }}
        />
        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginTop: 10,
            padding: 20,
            borderColor: Colors.PRIMARY,
          }}
        >
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            items={categoryList}
            placeholder={{
              label: "Select Category Your Business",
              value: null,
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        disabled={loading}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 5,
          marginTop: 20,
        }}
        onPress={() => onAddNewBusiness()}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={"#fff"} />
        ) : (
          <Text
            style={{
              fontFamily: "outfit-bold",
              color: "#fff",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Add New Business
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
