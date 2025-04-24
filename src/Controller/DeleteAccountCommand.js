import { Alert } from "react-native";
import Friend from "../Model/Friend";
import Post from "../Model/Posts/Post";
import User from "../Model/User";
import * as SecureStore from "expo-secure-store";
import { deleteUser } from "./UserManager";

class DeleteAccountCommand {
    constructor() { }

    async DeleteAccount({ navigation, user }) {
        //navigation.navigate("User", { User: user });

        try {
            // Remove token from Secure Store
            await SecureStore.deleteItemAsync("token");
            deleteUser(user.userUserName);
            // Navigate to logout screen
            navigation.navigate("LogOut");
        } catch (error) {
            Alert.alert("Couldn't logout, please try again");
        }
    }
}

export default DeleteAccountCommand;
