import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "TASKS";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export const getTasks = async (): Promise<Task[]> => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTasks = async (tasks: Task[]): Promise<void> => {
  await AsyncStorage.setItem(KEY, JSON.stringify(tasks));
};

export default{ getTasks, saveTasks };