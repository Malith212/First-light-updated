import { firebaseapp } from "<pages>/config/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

export const UploadImageToFirebaseAndReturnUrls = async (file: File[]) => {
  try {
    //upload images to firebase storage

    const storage = getStorage(firebaseapp);

    const uploadImagesRefs = await Promise.all(
      file.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        return storageRef;
      })
    );

    //get image urls of the images uploaded

    const urls = await Promise.all(
      uploadImagesRefs.map(async (ref) => {
        const url = await getDownloadURL(ref);
        return url;
      })
    );

    return urls;
  } catch (error: any) {
    throw new Error(error);
  }
};
