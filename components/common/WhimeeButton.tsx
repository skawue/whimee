import { ALL_WHIMEE_TYPES, WhimeeIcon } from "@/components/Icons";
import {
  WhimeeEventType,
  WhimeeEventTypeColor,
} from "@/state/events/WhimeeEvent";
import { createRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  ToastAndroid,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { createEvent } from "@/state/event/eventSlice";
import MapView, { LatLng, Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import { UNSELECTED_COLOR } from "@/constants/color";
import { getFormattedDate, getFormattedTime } from "@/constants/date";
import { useLocationCollection } from "@/hooks/useLocationCollection";
import { Ionicons } from "@expo/vector-icons";

type ButtonProps = {
  text: string;
  disabled: boolean;
  onPress: () => void;
};

export default function WhimeeButton(props: ButtonProps) {
  const { text, disabled, onPress } = props;

  return (
    <Pressable style={styles.button} disabled={disabled} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    alignItems: "center",
    margin: 16,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "black",
  },
  buttonText: {
    height: "100%",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlignVertical: "center",
  },
});
