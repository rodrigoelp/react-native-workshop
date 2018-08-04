import * as React from "react";
import { View, AppRegistry } from "react-native";

const App = () => {
    return (<View style={{ flex: 1, backgroundColor: "red" }} />);
}

AppRegistry.registerComponent("flixflix", () => App);