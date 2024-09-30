import { WhimeeIcon } from "@/components/Icons";
import { getReadableDateTime } from "@/constants/date";
import {
  WhimeeEvent,
  WhimeeEventType,
  WhimeeEventTypeColor,
  WhimeeEventTypeIcon,
} from "@/state/events/WhimeeEvent";
import { useAppSelector } from "@/state/hooks";
import { View, Text, StyleSheet, Pressable } from "react-native";

type EventListItemProps = {
  event: WhimeeEvent;
  onPress: (eventId: number) => void;
  onLike: (eventId: number) => void;
};

export default function EventListItem(props: EventListItemProps) {
  const { favouriteEventIds } = useAppSelector((state) => state.user);
  const { event, onPress, onLike } = props;

  return (
    <Pressable
      style={styles.container}
      onPress={() => onPress(event.id)}
      onLongPress={() => onLike(event.id)}
    >
      <View
        style={[
          styles.circleIcon,
          {
            backgroundColor:
              WhimeeEventTypeColor[
                event.type as keyof typeof WhimeeEventTypeColor
              ],
          },
        ]}
      >
        <WhimeeIcon type={event.type as WhimeeEventType} />
      </View>
      <View style={styles.column}>
        <Text>{event.name}</Text>
        <Text>{getReadableDateTime(event.startDate)}</Text>
        {favouriteEventIds.includes(event.id) && <Text>FAVOURITE</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    height: 80,
  },
  circleIcon: {
    width: 50,
    height: 50,
    marginHorizontal: 16,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
  },
});
