import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../colors";
import TopBar from "../components/topBar";
import StockList from "../components/stockList";
import { ScrollView } from "react-native-web";

function AboutUs() {
  return (
    <View style={{ flex: 1 }}>
      <TopBar></TopBar>

      <LinearGradient
        colors={["#2f4471ff", "#051030ff"]} // Array of colors for the gradient
        style={styles.gradientBox}
        start={{ x: 0, y: 0 }} // Start point of the gradient (top-left)
        end={{ x: 1, y: 1 }} // End point of the gradient (bottom-right)
      >
        <ScrollView>
          <Text style={styles.title}>
            Welcome to Marki: The AI Stock Picker!!!
          </Text>
          <Image
            source={require("../images/MarkyLogo.png")}
            style={styles.image}
          ></Image>

          <Text style={styles.subText}>
            {"\t"}Marki is an AI model that threads neural networks and Markov
            chains to predict a five day reading of the stock market. Marki uses
            cognitive computing through analyzing historical data to see if a
            similar week in the past can be used to predict the future. We
            leverage deep learning and predictive analytics to recognize
            patterns and trends in the market. Next we rate how close we were to
            our predictions to evaluate the weights of the neural net and the
            weight of the components in the score that we use. Our final product
            is something that users can trust to aid their stock investment
            decisions.
          </Text>
          <Text style={styles.subText}>
            {"\t"} Specifically Marki starts by using a Markov chain to create
            chunks of data that correspond to other chunks of data. Our program
            examines chunks of data pulled from Excel, then creates five-day
            chunks of percent changes from the day's high to its low, as well as
            the open-to-close and the stock's volume for that day. It makes this
            into a list of five tuples, and then the values for the next week
            correspond to the next five-tuple chunk. Then it creates the first
            neural net using the same data that the Markov chain was trained on.
            Hence, it has 15 inputs: the percent change from high to low, open
            to close, and volume for each of the five days. It outputs the
            predicted percent change from the beginning of the week to the end.
            The neural network can fill in the data unaccounted for by the
            Markov chain because the Markov chain does not account for overnight
            changes, while the neural net examines the full percentage change
            from the start of the week to the end. From there, it updates a
            cache containing the opens, closes, highs, lows, volumes, and dates
            for every day of that week. And trains a second neural net on the
            raw data, the output of the first neural net, and the Markov values
            from the previous week, as it updates the cache to gain a more
            accurate reading. Then goes through all the data in the cache and
            feeds the values into the Markov chain and the first neural network,
            gaining all the predictions, then feeds those into the second neural
            net, saves all these values, and plugs them into a kind of
            percentron that gives a score out of 1 of how likely a stock is to
            rise next week.
          </Text>
          <Text style={styles.subsubText}>
            We hope that our website helps our user base have a more accurate
            reading of the weeks to come, and which stocks will have the best
            week.
          </Text>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    color: colors.secondText,
    alignSelf: "center",
    fontSize: 32,
    fontWeight: 100,
    marginTop: 20,
  },
  subText: {
    marginTop: 24,
    fontSize: 14,
    marginLeft: 10,
    color: colors.secondText,
    marginLeft: 100,
    marginRight: 100,
  },
  subsubText: {
    marginTop: 16,
    fontSize: 14,
    marginLeft: 10,
    color: colors.secondText,
    marginLeft: 100,
    marginRight: 100,
    alignSelf: "center",
  },
  gradientBox: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginTop: 10,
  },
});
export default AboutUs;
