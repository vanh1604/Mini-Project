import Toast from 'react-native-toast-message';

export const showSuccessToast = (
  message: string,
  description?: string,
  buttonText?: string,
  buttonAction?: () => void,
) => {
  Toast.show({
    type: 'success',
    text1: message,
    text2: description,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 60,
    props: {
      buttonText,
      buttonAction,
    },
  });
};
