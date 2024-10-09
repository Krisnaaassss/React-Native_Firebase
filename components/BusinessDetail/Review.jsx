import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { Colors } from "../../constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";

export default function Review({ business }) {
  const [rating, setRating] = useState(4);
  const [userInput, setUserInput] = useState();
  const { user } = useUser();
  const onSubmit = async () => {
    const dofRef = doc(db, "BusinessList", business.id);
    await updateDoc(dofRef, {
      reviews: arrayUnion({
        // arrayUnion digunakan untuk menambahkan data ke dalam array tanpa menggantikan data yang sudah ada.
        // Jika data yang sama sudah ada, maka tidak akan di tambahkan.
        rating,
        review: userInput,
        userName: user?.fullName,
        userImage: user?.imageUrl,
        user: user?.primaryEmailAddress?.emailAddress,
      }),
    });
    Alert.alert("Success", "Your review has been submitted");
    setUserInput("");
  };

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      <Text style={{ fontFamily: "outfit-bold", fontSize: 20, marginTop: 10 }}>
        Review
      </Text>
      <View>
        <Rating
          showRating={false}
          imageSize={25}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          placeholder="Write a review"
          placeholderTextColor={Colors.GRAY}
          textAlignVertical="top"
          maxLength={40}
          height={100}
          numberOfLines={4}
          multiline={true}
          onChangeText={(value) => setUserInput(value)}
          value={userInput}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
          }}
        />
        <TouchableOpacity
          disabled={!userInput}
          onPress={() => onSubmit()}
          style={{
            padding: 10,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 6,
            marginTop: 10,
          }}
        >
          <Text
            style={{ color: "#fff", textAlign: "center", fontFamily: "outfit" }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      {/* Display Previus Review */}
      <View>
        {business?.reviews?.map((item, index) => (
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              padding: 10,
              borderWidth: 1,
              borderColor: Colors.GRAY,
              borderRadius: 15,
              marginTop: 10,
            }}
          >
            <Image
              source={{ uri: item.userImage }}
              style={{ width: 50, height: 50, borderRadius: 99 }}
            />
            <View style={{ display: "flex", gap: 5 }}>
              <Text style={{ fontFamily: "outfit-medium" }}>
                {item.userName}
              </Text>
              <Rating
                imageSize={20}
                ratingCount={item.rating}
                style={{ alignItems: "flex-start" }}
              />
              <Text>{item.review}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
