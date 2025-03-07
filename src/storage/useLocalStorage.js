import { ref } from "vue";

export function getStorageItem(key, initialValue) {
  try {
    // Get from local storage by key
    const item = window.localStorage.getItem(key);
    // Parse stored json or if none return initialValue
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    // If error also return initialValue

    return initialValue;
  }
}

export function setStorageItem(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

export default function useLocalStorage(key, initialValue) {
  const storedValue = ref(getStorageItem(key, initialValue));
  // const [storedValue, setStoredValue] = useState(() => {
  //   return getStorageItem(key, initialValue);
  // });

  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    storedValue.value = valueToStore;
    setStorageItem(key, valueToStore);
  };

  return [storedValue, setValue];
}
