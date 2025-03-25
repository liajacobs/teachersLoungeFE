import {
  apiUrl,
  getUserInfoRoute,
  checkIfFriendedRoute,
  friendUserRoute,
  unfriendUserRoute,
  getFriendsListRoute,
  muteUserRoute,
  unmuteUserRoute,
  checkIfMutedRoute,
  blockUserRoute,
  unblockUserRoute,
  checkIfBlockedRoute
} from "@env";
import Friend from "../Model/Friend.js";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

// Use userEmail to get user info
async function getUserInfo(userEmail) {
  if (userEmail != "") {
    try {
      let userInfoUrl = `${apiUrl}${getUserInfoRoute}?userEmail=${userEmail}`;
      console.log(userInfoUrl);
      const reqOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
        },
      };
      const response = await fetch(userInfoUrl, reqOptions);
      const results = await response.json();
      var data = results.data;
      var friend;
      if (data[0]) {
        friend = new Friend(
          data[0].email,
          data[0].firstname,
          data[0].lastname,
          data[0].schoolid,
          data[0].role
        );
      }
      return friend;
    } catch (error) {
      console.error("ERROR in getUserInfo", error.message);
      throw error;
    }
  }
}

// Check if user friended another user (DOES NOT MEAN THEY ARE FRIENDS, REQUIRES BOTH WAYS)
async function checkIfFriended(frienderEmail, friendeeEmail) {
  try {
    let checkIfFriendedUrl = `${apiUrl}${checkIfFriendedRoute}?friendeeEmail=${friendeeEmail}&frienderEmail=${frienderEmail}`;
    console.log(checkIfFriendedUrl);
    const reqOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
    };
    const response = await fetch(checkIfFriendedUrl, reqOptions);
    const results = await response.json();
    var data = results.data;
    return !!data.length;
  } catch (error) {
    console.error("ERROR in checkIfFriended", error.message);
    throw error;
  }
}

async function friendUser({ navigation }, frienderEmail, friendeeEmail) {
  if (friendeeEmail && frienderEmail) {
    let friendUserUrl = apiUrl + friendUserRoute;
    console.log(friendUserUrl);
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
      body: JSON.stringify({
        frienderEmail: frienderEmail,
        friendeeEmail: friendeeEmail,
      }),
    };
    const response = await fetch(friendUserUrl, reqOptions);
    const data = await response.json();
    if (response.status != 201) {
      Alert.alert("Error", "Unable to friend user");
    } else {
      Alert.alert("Success", "User friended");
      navigation.navigate("Friend", {
        FriendEmail: friendeeEmail,
      });
    }
  }
}

async function unfriendUser({ navigation }, frienderEmail, friendeeEmail) {
  if (friendeeEmail && frienderEmail) {
    let unfriendUserUrl = `${apiUrl}${unfriendUserRoute}?friendeeEmail=${friendeeEmail}&frienderEmail=${frienderEmail}`;
    console.log(unfriendUserUrl);
    const reqOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
    };
    const response = await fetch(unfriendUserUrl, reqOptions);
    const data = await response.json();
    if (response.status != 201) {
      Alert.alert("Error", "Unable to unfriend user");
    } else {
      Alert.alert("Success", "User unfriended");
      navigation.navigate("Friend", {
        FriendEmail: friendeeEmail,
      });
    }
  }
}

async function getFriendsList(userEmail) {
  if (userEmail != "") {
    var friends = [];
    let friendsUrl = apiUrl + getFriendsListRoute + `?userEmail=${userEmail}`;
    console.log(friendsUrl);
    const reqOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
    };
    const response = await fetch(friendsUrl, reqOptions);
    const results = await response.json();
    var data = results.data;
    var count = 0;
    if (data) {
      while (data[count] != undefined) {
        friends.unshift(
          new Friend(
            data[count].email,
            data[count].firstname,
            data[count].lastname,
            data[count].schoolid,
            data[count].role
          )
        );
        count = count + 1;
      }
    }
    return friends;
  }
}

async function checkIfMuted(muterEmail, muteeEmail) {
  try {
    let checkIfMutedUrl = `${apiUrl}${checkIfMutedRoute}?muteeEmail=${muteeEmail}&muterEmail=${muterEmail}`;
    console.log(checkIfMutedUrl);
    const reqOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
    };
    const response = await fetch(checkIfMutedUrl, reqOptions);
    const results = await response.json();
    var data = results.data;
    return !!data.length;
  } catch (error) {
    console.error("ERROR in checkIfMuted", error.message);
    throw error;
  }
}

async function muteUser(muterEmail, muteeEmail) {
  if (muteeEmail && muterEmail) {
    let muteUserUrl = apiUrl + muteUserRoute;
    console.log(muteUserUrl);
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
      body: JSON.stringify({
        muterEmail: muterEmail,
        muteeEmail: muteeEmail,
      }),
    };
    try {
      const response = await fetch(muteUserUrl, reqOptions);
      const data = await response.json();
      if (response.status === 201) {
        Alert.alert("Success", "User muted");
        return true;
      } else {
        Alert.alert("Error", "Unable to mute user");
        return false;
      }
    } catch (error) {
      console.error("ERROR in muteUser", error.message);
      Alert.alert("Error", "Network error occurred");
      return false;
    }
  }
  return false;
}

async function unmuteUser(muterEmail, muteeEmail) {
  if (muteeEmail && muterEmail) {
    let unmuteUserUrl = `${apiUrl}${unmuteUserRoute}?muteeEmail=${muteeEmail}&muterEmail=${muterEmail}`;
    console.log(unmuteUserUrl);
    const reqOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
    };

    try {
      const response = await fetch(unmuteUserUrl, reqOptions);
      const data = await response.json();
      
      if (response.status === 201) {
        Alert.alert("Success", "User unmuted");
        return true;
      } else {
        Alert.alert("Error", "Unable to unmute user");
        return false;
      }
    } catch (error) {
      console.error("ERROR in unmuteUser", error.message);
      Alert.alert("Error", "Network error occurred");
      return false;
    }
  }
  return false;
}

async function checkIfBlocked(blockerEmail, blockeeEmail) {
  try {
    let checkIfBlockedUrl = `${apiUrl}${checkIfBlockedRoute}?blockeeEmail=${blockeeEmail}&blockerEmail=${blockerEmail}`;
    console.log(checkIfBlockedUrl);
    const reqOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
    };
    const response = await fetch(checkIfBlockedUrl, reqOptions);
    const results = await response.json();
    var data = results.data;
    return !!data.length;
  } catch (error) {
    console.error("ERROR in checkIfBlocked", error.message);
    throw error;
  }
}

async function blockUser(blockerEmail, blockeeEmail) {
  if (blockeeEmail && blockerEmail) {
    muteUser(blockerEmail, blockeeEmail);
    let blockUserUrl = apiUrl + blockUserRoute;
    console.log(blockUserUrl);
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
      body: JSON.stringify({
        blockerEmail: blockerEmail,
        blockeeEmail: blockeeEmail,
      }),
    };
    try {
      const response = await fetch(blockUserUrl, reqOptions);
      const data = await response.json();
      if (response.status === 201) {
        Alert.alert("Success", "User blocked");
        return true;
      } else {
        Alert.alert("Error", "Unable to block user");
        return false;
      }
    } catch (error) {
      console.error("ERROR in blockUser", error.message);
      Alert.alert("Error", "Network error occurred");
      return false;
    }
  }
  return false;
}

async function unblockUser(blockerEmail, blockeeEmail) {
  if (blockeeEmail && blockerEmail) {
    let unblockUserUrl = `${apiUrl}${unblockUserRoute}?blockeeEmail=${blockeeEmail}&blockerEmail=${blockerEmail}`;
    console.log(unblockUserUrl);
    const reqOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("token")),
      },
    };

    try {
      const response = await fetch(unblockUserUrl, reqOptions);
      const data = await response.json();
      
      if (response.status === 201) {
        Alert.alert("Success", "User unblocked");
        return true;
      } else {
        Alert.alert("Error", "Unable to unblock user");
        return false;
      }
    } catch (error) {
      console.error("ERROR in unblockUser", error.message);
      Alert.alert("Error", "Network error occurred");
      return false;
    }
  }
  return false;
}

export {
  getUserInfo,
  checkIfFriended,
  friendUser,
  unfriendUser,
  getFriendsList,
  muteUser,
  unmuteUser,
  checkIfMuted,
  checkIfBlocked,
  blockUser,
  unblockUser
};
