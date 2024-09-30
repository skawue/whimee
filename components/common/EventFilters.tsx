import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setOnlyFavs } from "@/state/filter/filterSlice";
import Slider from "@react-native-community/slider";
import { useEffect, useState } from "react";
import { updateSelectedDistance } from "@/state/user/userSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { WhimeeEventTypeColor } from "@/state/events/WhimeeEvent";

export function EventFilters() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.filter);
  const { selectedDistance } = useAppSelector((state) => state.user);
  const [temporaryDistance, setTemporaryDistance] = useState(selectedDistance);

  useEffect(() => {
    setTemporaryDistance(selectedDistance);
  }, [selectedDistance]);

  const OnlyFavsIcons = () => {
    return (
      <View>
        <MaterialCommunityIcons
          style={{ position: "absolute" }}
          name="cards-heart"
          size={24}
          color={filter.onlyFavs ? WhimeeEventTypeColor.Foods : "#BBBBBB"}
        />
        <MaterialCommunityIcons
          style={{ position: "absolute", marginLeft: 4, marginTop: 4 }}
          name="cards-heart"
          size={24}
          color={filter.onlyFavs ? WhimeeEventTypeColor.Culture : "#CCCCCC"}
        />
        <MaterialCommunityIcons
          style={{ position: "absolute", marginLeft: 8, marginTop: 8 }}
          name="cards-heart"
          size={24}
          color={filter.onlyFavs ? WhimeeEventTypeColor.Party : "#DDDDDD"}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Slider
          style={{ flex: 1, height: 20, width: "100%" }}
          thumbTintColor="purple"
          minimumValue={1000}
          maximumValue={49900}
          value={selectedDistance}
          onValueChange={(value) => setTemporaryDistance(value)}
          onSlidingComplete={(value) => dispatch(updateSelectedDistance(value))}
          minimumTrackTintColor="#624E88"
          maximumTrackTintColor="#000000"
        />
        <Text>{String((temporaryDistance / 1000).toFixed(1))} km</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          onPress={() => dispatch(setOnlyFavs(!filter.onlyFavs))}
        >
          <OnlyFavsIcons />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sliderContainer: {
    flexDirection: "row",
    width: 240,
    height: 40,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    margin: 8,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  checkboxContainer: {
    width: 60,
    height: 40,
    margin: 8,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
});
