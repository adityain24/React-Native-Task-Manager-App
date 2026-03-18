import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Task } from "../app/utils/storage";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleSave = () => {
    if (!editText.trim()) return;
    onEdit(task.id, editText.trim());
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        style={styles.checkbox}
      >
        <Text style={styles.checkboxText}>{task.completed ? "✅" : "⬜"}</Text>
      </TouchableOpacity>

      {isEditing ? (
        <TextInput
          style={styles.input}
          value={editText}
          onChangeText={setEditText}
          autoFocus
          onSubmitEditing={handleSave}
          onBlur={handleSave}
        />
      ) : (
        <Text style={[styles.title, task.completed && styles.completed]}>
          {task.title}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => setIsEditing(!isEditing)}
        style={styles.action}
      >
        <Text>{isEditing ? "💾" : "✏️"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.action}>
        <Text>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 18,
  },
  title: {
    flex: 1,
    fontSize: 15,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  input: {
    flex: 1,
    fontSize: 15,
    borderBottomWidth: 1,
    borderColor: "#4f46e5",
    paddingVertical: 2,
  },
  action: {
    paddingHorizontal: 6,
  },
});
