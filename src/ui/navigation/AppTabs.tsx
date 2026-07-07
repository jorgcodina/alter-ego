import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AlterEgoScreen } from "../screens/AlterEgoScreen";
import { DiaryScreen } from "../screens/DiaryScreen";
import { LifeScreen } from "../screens/LifeScreen";
import { RegisterEventScreen } from "../screens/RegisterEventScreen";

export type RootTabParamList = {
  Life: undefined;
  RegisterEvent: undefined;
  AlterEgo: undefined;
  Diary: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Life"
        component={LifeScreen}
        options={{ title: "Vida" }}
      />
      <Tab.Screen
        name="RegisterEvent"
        component={RegisterEventScreen}
        options={{ title: "Registrar Evento" }}
      />
      <Tab.Screen
        name="AlterEgo"
        component={AlterEgoScreen}
        options={{ title: "Alter Ego" }}
      />
      <Tab.Screen
        name="Diary"
        component={DiaryScreen}
        options={{ title: "Diario" }}
      />
    </Tab.Navigator>
  );
}
