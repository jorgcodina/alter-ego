import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { AppTabs } from "./src/ui/navigation/AppTabs";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AppTabs />
    </NavigationContainer>
  );
}
