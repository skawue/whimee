import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useAppDispatch } from "@/state/hooks";
import { getFormattedDate, getFormattedTime } from "@/constants/date";

type DateTimeProps = {
  label: string;
  value: Date;
  onDateTimeChange: (date: Date) => void;
};

export default function DateTime(props: DateTimeProps) {
  const { label, value, onDateTimeChange } = props;
  const dispatch = useAppDispatch();
  const [initDate, setInitDate] = useState(new Date());
  const [date, setDate] = useState(initDate);

  useEffect(() => {
    setInitDate(value);
    setDate(value);
  }, [value]);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate ?? date;

    setDate(currentDate);
    onDateTimeChange(currentDate);
  };

  const showDateMode = (currentMode: "date" | "time") => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onDateChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showDateMode("date");
  };

  const showTimepicker = () => {
    showDateMode("time");
  };

  return (
    <View style={styles.row}>
      <Text style={styles.dateText}>{label}</Text>
      <TouchableOpacity style={styles.dateContent} onPress={showDatepicker}>
        <Text>{getFormattedDate(date.getTime())}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.timeContent} onPress={showTimepicker}>
        <Text>{getFormattedTime(date.getTime())}</Text>
      </TouchableOpacity>
      {date !== initDate && (
        <Pressable
          style={styles.nowButton}
          onPress={() => {
            let now = new Date();
            setInitDate(now);
            setDate(now);
          }}
        >
          <Text style={styles.buttonText}>Now</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  dateText: {
    alignSelf: "center",
    width: 70,
    marginStart: 16,
  },
  dateContent: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "white",
  },
  timeContent: {
    marginVertical: 8,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "white",
  },
  nowButton: {
    height: 24,
    width: 50,
    alignItems: "center",
    alignSelf: "center",
    marginHorizontal: 16,
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
