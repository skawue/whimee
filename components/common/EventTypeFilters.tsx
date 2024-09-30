import { ALL_WHIMEE_TYPES, WhimeeIcon } from "@/components/Icons";
import { UNSELECTED_COLOR } from "@/constants/color";
import {
  WhimeeEventType,
  WhimeeEventTypeColor,
} from "@/state/events/WhimeeEvent";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { updateSelectedEventTypes } from "@/state/user/userSlice";
import { StyleSheet, View } from "react-native";

export const EventTypeFilters = () => {
  const dispatch = useAppDispatch();
  const { selectedEventTypes } = useAppSelector((state) => state.user);

  function onSelectedTypesChange(selectedType: WhimeeEventType) {
    if (selectedEventTypes.includes(selectedType)) {
      dispatch(
        updateSelectedEventTypes(
          selectedEventTypes.filter((type) => type !== selectedType)
        )
      );
    } else {
      dispatch(updateSelectedEventTypes([...selectedEventTypes, selectedType]));
    }
  }

  return (
    <View style={styles.filter}>
      {ALL_WHIMEE_TYPES.map((type) => (
        <WhimeeIcon
          key={type}
          type={type}
          color={
            selectedEventTypes.includes(type)
              ? WhimeeEventTypeColor[type]
              : UNSELECTED_COLOR
          }
          onPress={() => onSelectedTypesChange(type)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
