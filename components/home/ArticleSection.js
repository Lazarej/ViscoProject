import { View, StyleSheet, Text } from "react-native";
import GlobalStyles from "../../style/GlobalStyles";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Link } from "@react-navigation/native";
import ArticlesCard from "../Global/Card/ArticlesCard";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../store/User";
import axios from "axios";
import { _URL } from "../../globalVar/url";

export default function ArticleSection() {
  const { user, } = useContext(UserContext);
  const [articlesState, setArticlesState] = useState([]);

  const getData = () => {
    
    user.interests.map(async (interest) => {
      try {
        const response = await axios.get(
          `${_URL}/api/articles?populate=*&filters[interet][type][$contains]=${interest.type}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await response.data.data[0];
        console.log(data)
        if (data !== undefined) {
          setArticlesState((prev) => [...prev, data]);
        }
        setArticlesState((prev) => prev.slice(0, 2));
      } catch (error) {
        console.error(error);
      }
    });
  };

  useEffect(() => {
    
    getData();
    return () => {
      setArticlesState((prev) => (prev = []));
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={GlobalStyles.title}>Nos petits Articles</Text>
        <Link style={styles.headerLink} to={"/Article"}>
          Tout voir
        </Link>
      </View>
      <View>
        {articlesState.map((article) => (
          <ArticlesCard
            article={article}
            key={article.id}

          ></ArticlesCard>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 40,
  },

  sectionHeader: {
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },

  headerLink: {
    fontWeight: "bold",
    color: GlobalStyles.primary.color,
    fontSize: RFPercentage(2.1),
  },
});
