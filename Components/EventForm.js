import React from "react";
import { StyleSheet, Button, Modal, View, Text, TextInput } from "react-native";
import { Formik } from "formik";

export default function EventForm({ items, timestamp, addItem }) {
	return (
		<View>
			<Formik
				initialValues={{ name: "", time: "" }}
				onSubmit={(values) => {
					addItem(items, timestamp, values);
				}}
			>
				{(props) => (
					<View>
						<TextInput
							placeholder="Event name"
							onChangeText={props.handleChange("name")}
							value={props.values.name}
						></TextInput>

						<TextInput
							placeholder="Event time"
							onChangeText={props.handleChange("time")}
							value={props.values.time}
						></TextInput>
						<Button title="submit" onPress={props.handleSubmit}></Button>
					</View>
				)}
			</Formik>
		</View>
	);
}
