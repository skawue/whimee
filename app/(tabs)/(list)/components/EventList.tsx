import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { changeFavouriteEventId, getUser } from "@/state/user/userSlice";
import EventListItem from "./EventListItem";
import { router } from "expo-router";
import { UNSELECTED_COLOR } from "@/constants/color";

const DISTANCE_TAB_NAME = "By distance";
const TIME_TAB_NAME = "By time";

export default function EventList() {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.events.events);
  const [selectedTab, setSelectedTab] = useState(DISTANCE_TAB_NAME);
  const [sortedEvents, setSortedEvents] = useState(events);

  useEffect(() => {
    if (selectedTab == DISTANCE_TAB_NAME) {
      let copy = [...events];

      setSortedEvents(copy.sort((a, b) => a.locationLat - b.locationLat));
    }
    if (selectedTab == TIME_TAB_NAME) {
      let copy = [...events];

      setSortedEvents(copy.sort((a, b) => a.startDate - b.startDate));
    }
  }, [events, selectedTab]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(DISTANCE_TAB_NAME);
          }}
          style={[
            styles.buttonByDistance,
            {
              backgroundColor:
                selectedTab == DISTANCE_TAB_NAME ? "#624E88" : UNSELECTED_COLOR,
            },
          ]}
        >
          <Text style={styles.textByDistance}>By distance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(TIME_TAB_NAME);
          }}
          style={[
            styles.buttonByTime,
            {
              backgroundColor:
                selectedTab == TIME_TAB_NAME ? "#295F98" : UNSELECTED_COLOR,
            },
          ]}
        >
          <Text style={styles.textByTime}>By time</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ flex: 1 }}
        data={sortedEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EventListItem
            event={item}
            onPress={(eventId) => {
              router.navigate({
                pathname: "/listDetails/[id]",
                params: { id: eventId, headerName: item.name },
              });
            }}
            onLike={(eventId) => {
              dispatch(changeFavouriteEventId(eventId));
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
  },
  buttonByDistance: {
    flex: 1,
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 4,
    height: 40,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonByTime: {
    flex: 1,
    marginBottom: 8,
    marginLeft: 4,
    marginRight: 8,
    height: 40,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  textByDistance: {
    color: "white",
    textAlign: "center",
  },
  textByTime: {
    color: "white",
    textAlign: "center",
  },
});
