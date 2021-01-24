import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Button, Modal, View } from "react-native";
import { Agenda } from "react-native-calendars";
import uuid from "uuid-random";
import RenderItem from "./RenderItem";
import EventForm from "./EventForm";
import { Ionicons } from "@expo/vector-icons";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const Calendar = () => {
  const [items, setItems] = useState({});

  const [timestamp, setTimestamp] = useState(0);

  const [modalOpen, setMOdalOpen] = useState(false);

  const currentDay = (day) => {
    setTimestamp(day.timestamp);
  };

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const addItem = (items, timestamp, event) => {
    const time = timestamp;
    var strTime = "";
    if (time == 0) {
      var today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        ("0" + (today.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + today.getDate()).slice(-2);

      strTime = date;
    } else {
      strTime = timeToString(time);
    }

    items[strTime].push({
      name: event.name,
      time: event.time,
      index: uuid(),
      date: strTime,
      description: event.description,
    });
    const newItems = {};
    Object.keys(items).forEach((key) => {
      newItems[key] = items[key];
    });
    setItems(newItems);

    setMOdalOpen(false);
  };

  const delItem = (item, items) => {
    var i;
    for (i = 0; i < items[item.date].length; i++) {
      if (items[item.date][i].index == item.index) {
        items[item.date].splice(i, 1);
      }
    }
    const newItems = {};
    Object.keys(items).forEach((key) => {
      newItems[key] = items[key];
    });
    setItems(newItems);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Modal visible={modalOpen} animationType="slide">
        <View style={StyleSheet.modalContent}>
          <Ionicons
            name="close"
            onPress={() => setMOdalOpen(false)}
            size={30}
            style={styles.closeButton}
          ></Ionicons>
          <EventForm
            items={items}
            timestamp={timestamp}
            addItem={addItem}
            setModalOpen={setMOdalOpen}
          ></EventForm>
        </View>
      </Modal>

      <Agenda
        items={items}
        renderItem={(item) => (
          <RenderItem item={item} items={items} delItem={delItem}></RenderItem>
        )}
        onDayPress={currentDay}
        onDayChange={currentDay}
        loadItemsForMonth={loadItems}
      />
      <Button
        title="Add event"
        //onPress={() => addItem(items, timestamp)}
        onPress={() => setMOdalOpen(true)}
      ></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "white",
    margin: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  closeButton: {
    marginLeft: "90%",
  },
});

export default Calendar;
