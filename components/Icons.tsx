import {
  WhimeeEventType,
  WhimeeEventTypeIcon,
} from "@/state/events/WhimeeEvent";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

export const ALL_WHIMEE_TYPES = [
  WhimeeEventType.Sport,
  WhimeeEventType.Culture,
  WhimeeEventType.Party,
  WhimeeEventType.Foods,
  WhimeeEventType.Games,
  WhimeeEventType.Meetings,
];

export const WhimeeIcon = ({
  type = WhimeeEventType.Sport,
  size = 32,
  style = {},
  color = "white",
  onPress = () => {},
}) => {
  if (type === WhimeeEventType.Sport) {
    return (
      <MaterialIcons
        name={WhimeeEventTypeIcon.Sport}
        size={size}
        color={color}
        style={style}
        onPress={(event) => onPress()}
      />
    );
  } else if (type === WhimeeEventType.Culture) {
    return (
      <MaterialIcons
        name={WhimeeEventTypeIcon.Culture}
        size={size}
        color={color}
        style={style}
        onPress={(event) => onPress()}
      />
    );
  } else if (type === WhimeeEventType.Party) {
    return (
      <MaterialCommunityIcons
        name={WhimeeEventTypeIcon.Party}
        size={size}
        color={color}
        style={style}
        onPress={(event) => onPress()}
      />
    );
  } else if (type === WhimeeEventType.Foods) {
    return (
      <Ionicons
        name={WhimeeEventTypeIcon.Foods}
        size={size}
        color={color}
        style={style}
        onPress={(event) => onPress()}
      />
    );
  } else if (type === WhimeeEventType.Games) {
    return (
      <Ionicons
        name={WhimeeEventTypeIcon.Games}
        size={size}
        color={color}
        style={style}
        onPress={(event) => onPress()}
      />
    );
  } else if (type === WhimeeEventType.Meetings) {
    return (
      <MaterialIcons
        name={WhimeeEventTypeIcon.Meetings}
        size={size}
        color={color}
        style={style}
        onPress={(event) => onPress()}
      />
    );
  }
};
