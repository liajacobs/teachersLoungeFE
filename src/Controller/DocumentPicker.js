
import * as DocumentPicker from 'expo-document-picker';
import File from "../Model/File.js";
import * as SecureStore from 'expo-secure-store';
import { Alert, LogBox } from "react-native";
import { apiUrl, fileUploadRoute } from "@env";

//Allows users to select a document then upload to s3 

async function selectDoc() {
  // URL for server 
  let urlUpload = apiUrl + fileUploadRoute;
  console.log(urlUpload)
  var result = await DocumentPicker.getDocumentAsync({});

  // Result is not null
  console.log(result);
  
  if (result) {
    let uploadData = new FormData();
    uploadData.append('file', {
      uri: result.assets[0].uri,
      type: result.assets[0].mimeType,
      name: result.assets[0].name
    });

    /* Output the uri, type, and name of the file
    console.log(result.assets[0].uri);
    console.log(result.assets[0].mimeType);
    console.log(result.assets[0].name);
    */

    // Makes call to fileUpload route, currently set to local host but will be changed to the server url
    const responseOfFileUpload = await fetch(urlUpload, {
      method: 'POST',
      headers: {
        //'Content-Type': 'multipart/form-data',
        'Authorization': "Bearer " + await SecureStore.getItemAsync("token")
      },
      body: uploadData,
    });

    let bucket = "";
    let fileUrl = "";
    if (responseOfFileUpload.status == 200) {
      let responseUpload = await responseOfFileUpload.json();
      bucket = responseUpload.bucket;
      fileUrl = responseUpload.file;
    } else {
      console.log("Unable to connect to server when uploading file, check that the url is correct and the the server is running...");
      Alert.alert('Failed to upload file')
    }
    // This url assumes us-east-2
    let publicFileUrl = "https://" + bucket + ".s3.us-east-2.amazonaws.com/" + fileUrl;

    // Log the public file url
    console.log("Public file url: " + publicFileUrl);

    // Return the file object
    const f = new File(publicFileUrl, fileUrl, result.mimeType);
    console.log(f);
    return f;

  } else return new File("", "", "");
}

export { selectDoc };