

// const uploadImage = async (file) => {
//     // Create a reference to the storage bucket
//     const storageRef = storage.ref();

//     // Generate a unique name for the file
//     const filename = `${Date.now()}_${file.name}`;

//     // Create a reference to the file you want to upload
//     const imageRef = storageRef.child(filename);

//     // Upload the file
//     const snapshot = await imageRef.put(file);

//     // Get the download URL
//     const downloadURL = await snapshot.ref.getDownloadURL();

//     return downloadURL;
// };

// export default uploadImage;