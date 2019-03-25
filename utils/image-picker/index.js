import ImagePicker from 'react-native-image-picker';

const ImagePickerWrapper = (function () {
  let isOpened = false;
  const config = {
    quality: 1,
    maxWidth: 500,
    maxHeight: 500,
    cameraType: 'front',
    mediaType: 'photo',
    allowsEditing: true,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  function markPickerAsOpened() {
    isOpened = true;
  }

  function markPickerAsClosed() {
    isOpened = false;
  }

  function showImagePicker() {
    return new Promise((resolve, reject) => {
      if (isOpened) {
        reject();
        return;
      }

      markPickerAsOpened();
      ImagePicker.showImagePicker(config, (response) => {
        if (response.didCancel) {
          reject();
          markPickerAsClosed();
          return;
        }

        if (response.error) {
          reject(response.error);
          markPickerAsClosed();
          return;
        }

        resolve(response);
        markPickerAsClosed();
      });
    });
  }

  return {
    showImagePicker,
  };
}());

export default ImagePickerWrapper;
