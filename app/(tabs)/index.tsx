import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { getTasks, saveTasks, Task } from "../utils/storage";
import AddTask from "../../components/AddTask";
import TaskItem from "../../components/TaskItem";

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const persist = (updated: Task[]) => {
    setTasks(updated);
    saveTasks(updated);
  };

  // CREATE karna hai toh title string ko use karke ek naya task object banao, persist karke existing tasks ke saath add karo id : Date.now().toString() se generate kar sakte ho, completed default false rahega.
  const handleAdd = (title: string) => {
    persist([...tasks, { id: Date.now().toString(), title, completed: false }]);
  };

  // UPDATE : toggle karna hai toh map kar do, completed ko !completed replace kardo fir persist kar do
  const handleToggle = (id: string) => {
    persist(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  // UPDATE : edit title karna hai toh map kar do, title newTitle replace kardo fir persist kar do
  const handleEdit = (id: string, newTitle: string) => {
    persist(tasks.map((t) => (t.id === id ? { ...t, title: newTitle } : t)));
  };

  // DELETE karna hai toh filter kar do aur persist kar do
  const handleDelete = (id: string) => {
    persist(tasks.filter((t) => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>To-do App</Text>
      <Text style={styles.subheading}>
        {tasks.filter((t) => !t.completed).length} tasks pending
      </Text>

      <AddTask onAdd={handleAdd} />
      <FlatList
        data={tasks}
        //Added Header Component
        ListHeaderComponent={<Text style={styles.userlist}>Task List</Text>}
        //Added Empty Component
        ListEmptyComponent={
          <Text style={styles.empty}>No tasks found in this list</Text>
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 60,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginLeft: 16,
  },
  subheading: {
    fontSize: 14,
    color: "#888",
    marginLeft: 16,
    marginTop: 4,
    marginBottom: 8,
  },
  empty: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 60,
    fontSize: 15,
  },
  userlist: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 16,
    marginBottom: 8,
  },
});
