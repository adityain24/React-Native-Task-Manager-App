import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
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

  // CREATE
  const handleAdd = (title: string) => {
    persist([...tasks, { id: Date.now().toString(), title, completed: false }]);
  };

  // UPDATE — toggle
  const handleToggle = (id: string) => {
    persist(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  // UPDATE — edit title
  const handleEdit = (id: string, newTitle: string) => {
    persist(tasks.map((t) => (t.id === id ? { ...t, title: newTitle } : t)));
  };

  // DELETE
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
});
