import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
} from "react-native";

type Props = {
  onAdd: (title: string) => void;
};

export default function AddTask({ onAdd }: Props) {
  const [text, setText] = useState("");

  const [visible, setVisible] = useState(false);

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
    setVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.openButtonText}>ADD TASK</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TextInput
              style={styles.inputModal}
              placeholder="Add a new task..."
              value={text}
              onChangeText={setText}
            />

            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },

  button: {
    backgroundColor: "black",
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  // Modal styles

  openButton: {
    backgroundColor: "#4CAF50",
    padding: 14,
    alignSelf: "flex-end",
    marginRight: 16,
    marginBottom: 20,
    bottom: 55,
    width: "40%",
    borderRadius: 10,
    alignItems: "center",
  },
  openButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "85%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
  },

  inputModal: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },

  addButton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  cancel: {
    marginTop: 12,
    textAlign: "center",
    color: "red",
  },
});
