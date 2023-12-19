import { StyleSheet, View } from "react-native";

import { RenderComponent } from "@backflipjs/react";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <RenderComponent name="home" data={{ test: true }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
