import React from "react";
//import AndroidDeviceList from "../lib";
import { getByDevice } from "../lib";
const model = getByDevice("SM-G9600");
console.log(model);
const App = () => <div> {model}</div>;

export default App;
