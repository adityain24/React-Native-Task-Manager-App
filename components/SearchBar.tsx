import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";

type Props = {
  onSearch: (text: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search tasks..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f2f2f2",
  },
  input: {
    height: 42,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
