import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { Card, Avatar } from "react-native-paper";

const RenderItem = ({ item, items, delItem }) => {
	return (
		<TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
			<Card>
				<Card.Content>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Button
							title="Delete"
							onPress={() => delItem(item, items)}
						></Button>
						<Text>{item.name}</Text>
						<Text>{item.time}</Text>
						<Avatar.Text label="🏠" />
					</View>
				</Card.Content>
			</Card>
		</TouchableOpacity>
	);
};

export default RenderItem;
