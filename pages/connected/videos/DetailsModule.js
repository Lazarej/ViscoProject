import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import { _URL } from "../../../globalVar/url";
import GlobalStyles from "../../../style/GlobalStyles";
import Wrapper from "../../../components/Global/Wrapper";
import { RFPercentage } from "react-native-responsive-fontsize";
import Signataire from "../../../components/details/Signataire";
import axios from "axios";
import { _URL } from "../../../globalVar/url";

export default function DetailModule({ navigation }) {
  const route = useRoute();

    useEffect(() => {
        console.log('par' ,route.params.item.id)
       const getModule = async() => {
          try {
          const response = await axios.get(
            `${_URL}/api/modules?populate=*`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
              );
              const data = await response.data.data;
              console.log('data', data)
        } catch (error) {
          console.error(error);
        }
    
    setLoading((prev) => (prev = false));
        }
        getModule()
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.iconCont}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color={GlobalStyles.primary.color}
          />
        </TouchableOpacity>
      </View>
      <SharedElement id={route.params.item.image}>
        <Image
          style={styles.image}
          source={{
            uri: `${_URL}${route.params.item.image.data.attributes.url}`,
          }}
        ></Image>
      </SharedElement>
      <Wrapper>
        <View style={styles.bodyHeader}>
          <View style={styles.textCont}>
            <Text style={styles.title}>{route.params.item.title}</Text>
            <Text style={{ ...GlobalStyles.text, fontSize: RFPercentage(2.5) }}>
              {route.params.item.description}
            </Text>
          </View>
          <Signataire
            id={route.params.item.signataire.data.id}
            image={route.params.item.image}
            format="mini"
          />
        </View>
        <View>
           <FlatList
            style={{ paddingTop: 20 }}
            showsVerticalScrollIndicator={false}
            // data={}
            // renderItem={({ item }) => (
            // //   <NewsCard element={item} key={item.id}></NewsCard>
            // )}
          />
        </View>
      </Wrapper>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  iconCont: {
    width: "100%",
    zIndex: 10,
  },

  image: {
    height: 200,
    width: "100%",
    marginRight: 10,
    resizeMode: "cover",
  },

  backButton: {
    height: 40,
    width: 40,
    top: 50,
    left: 20,
    backgroundColor: "#fff",
    position: "absolute",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  likeButton: {
    height: 40,
    width: 40,
    top: 50,
    right: 20,
    backgroundColor: "#fff",
    position: "absolute",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  bodyHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
    paddingBottom: 25,
  },

  textCont: {
    paddingVertical: 25,
  },

  title: {
    fontFamily: "RobotoB",
    fontSize: RFPercentage(3.5),
    marginBottom: 15,
  },
});