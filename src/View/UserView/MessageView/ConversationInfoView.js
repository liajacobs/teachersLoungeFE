import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    Button,
    Alert,
} from "react-native";
import { getConversationDetails, updateConversationTitle } from "../../../Controller/DirectMessagesManager";

function ConversationInfoView({ route, navigation }) {
    const { conversationId } = route.params;
    const [newTitle, setNewTitle] = useState("");
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchConversationDetails = async () => {
            const data = await getConversationDetails(conversationId);
            setMembers(data.members || []);
            setNewTitle(data.title || "");
        };
        fetchConversationDetails();
    }, []);

    const handleUpdateTitle = async () => {
        const success = await updateConversationTitle(conversationId, newTitle);
        if (success) {
            Alert.alert("Success", "Conversation title updated.");
            navigation.goBack();
        } else {
            Alert.alert("Error", "Could not update title.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Conversation Title: {newTitle}</Text>
            <TextInput
                style={styles.input}
                value={newTitle}
                onChangeText={setNewTitle}
                placeholder="Enter a new conversation title"
            />
            <Button title="Save Title" onPress={handleUpdateTitle} />
            <Text style={styles.membersHeader}>Participants:</Text>
            <FlatList
                data={members}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Text style={styles.memberItem}>{item}</Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1 },
    label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    membersHeader: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: "bold",
    },
    memberItem: {
        fontSize: 14,
        paddingVertical: 4,
        paddingLeft: 10,
    },
});

export default ConversationInfoView;
