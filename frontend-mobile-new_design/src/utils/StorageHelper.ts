import AsyncStorage from "@react-native-async-storage/async-storage";


async function checkIfFirstTime() {
  try {
    const value = await AsyncStorage.getItem('isFirstTime');
    if (value === null) {
      // User is logging in for the first time, save their login information
      await AsyncStorage.setItem('isFirstTime', 'true');
      // Save the user's login credentials
    //   await AsyncStorage.setItem('username', username);
    //   await AsyncStorage.setItem('password', password);
    } else {
      // User has logged in before, retrieve their login credentials
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      // Do something with the retrieved credentials
    }
  } catch (error) {
    console.log(error);
  }
}
