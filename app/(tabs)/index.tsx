import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getTasks, saveTasks, Task } from "../utils/storage";
import AddTask from "../../components/AddTask";
import TaskItem from "../../components/TaskItem";
import SearchBar from "@/components/SearchBar";

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]); // ⭐ NEW

  useEffect(() => {
    getTasks().then((data) => {
      setTasks(data);
      setFilteredTasks(data); // ⭐ initial load
    });
  }, []);

  const persist = (updated: Task[]) => {
    setTasks(updated);
    setFilteredTasks(updated); // ⭐ keep search list synced
    saveTasks(updated);
  };

  const handleAdd = (title: string) => {
    persist([...tasks, { id: Date.now().toString(), title, completed: false }]);
  };

  const handleToggle = (id: string) => {
    persist(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const handleEdit = (id: string, newTitle: string) => {
    persist(tasks.map((t) => (t.id === id ? { ...t, title: newTitle } : t)));
  };

  const handleDelete = (id: string) => {
    persist(tasks.filter((t) => t.id !== id));
  };

  // ⭐⭐⭐ SEARCH LOGIC (MAIN PART)
  const handleSearch = (text: string) => {
    if (text.trim() === "") {
      setFilteredTasks(tasks);
      return;
    }

    const filtered = tasks.filter((t) =>
      t.title.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredTasks(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>To-do App</Text>
      <Text style={styles.subheading}>
        {tasks.filter((t) => !t.completed).length} tasks pending
      </Text>

      <AddTask onAdd={handleAdd} />

      {/* ⭐ SEARCH BAR ADDED HERE */}
      <SearchBar onSearch={handleSearch} />

      <FlatList
        data={filteredTasks} // ⭐ IMPORTANT CHANGE
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No Tasks Found</Text>}
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
