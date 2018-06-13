import AndroidDeviceList from "./utils/device-list";
import _ from "lodash";
function getByModel(modelName) {
  console.log(AndroidDeviceList.lenght);
  return _.filter(AndroidDeviceList, ["model", modelName]);
}
function getByDevice(deviceName) {
  console.log(AndroidDeviceList.lenght);
  return _.filter(AndroidDeviceList, ["device", deviceName]);
}
function getAll() {
  return AndroidDeviceList;
}
export default AndroidDeviceList;

export { getByDevice, getByModel, getAll };
