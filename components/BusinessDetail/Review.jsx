import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { Rating } from "react-native-ratings";
import { Colors } from "../../constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";

export default function Review({ business }) {
  const [rating, setRating] = useState(4);
  const [userInput, setUserInput] = useState("");
  const [reviews, setReviews] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const docRef = doc(db, "BusinessList", business.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setReviews(docSnap.data().reviews || []);
    }
  };

  const onSubmit = async () => {
    const docRef = doc(db, "BusinessList", business.id);
    const newReview = {
      rating,
      review: userInput,
      userName: user?.fullName,
      userImage: user?.imageUrl,
      user: user?.primaryEmailAddress?.emailAddress,
    };

    await updateDoc(docRef, {
      reviews: arrayUnion(newReview),
    });

    
    setReviews([newReview, ...reviews]);

    Alert.alert("Success", "Your review has been submitted");
    setUserInput("");
    setRating(4); // Reset rating to default after submission
  };

  return (
    <ScrollView
      style={{
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <View>
        <Rating
          showRating={false}
          imageSize={25}
          onFinishRating={(value) => setRating(value)}
          startingValue={rating}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          placeholder="Write a review"
          placeholderTextColor={Colors.GRAY}
          textAlignVertical="top"
          height={100}
          numberOfLines={4}
          multiline={true}
          onChangeText={(value) => setUserInput(value)}
          value={userInput}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
          }}
        />
        <TouchableOpacity
          disabled={!userInput}
          onPress={onSubmit}
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

      <View style={{ marginTop: 20 }}>
        {reviews.map((item, index) => (
          <View
            key={index}
            style={{
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
            <View style={{ flex: 1, gap: 5 }}>
              <Text style={{ fontFamily: "outfit-medium" }}>
                {item.userName}
              </Text>
              <Rating
                imageSize={20}
                startingValue={item.rating}
                readonly={true}
                showRating={false}
                style={{ alignItems: "flex-start" }}
              />
              <Text>{item.review}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
