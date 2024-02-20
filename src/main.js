var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/main.ts
var import_electron2 = require("electron");

// src/main/utils.ts
var import_electron = require("electron");
var import_node_fs = __toESM(require("node:fs"), 1);
var import_node_path = __toESM(require("node:path"), 1);
var pluginDataPath = LiteLoader.plugins.MESSAGE.path.data;
var configPath = import_node_path.default.join(pluginDataPath, "config.json");
var defaultConfig = {
  otherColor: "#ffffff",
  otherFontColor: "#000000",
  myColor: "#0099FF",
  myFontColor: "#000000"
};
if (!import_node_fs.default.existsSync(pluginDataPath)) {
  import_node_fs.default.mkdirSync(pluginDataPath, { recursive: true });
}
if (!import_node_fs.default.existsSync(configPath)) {
  import_node_fs.default.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 4));
} else {
  const data = import_node_fs.default.readFileSync(configPath, "utf-8");
  const config = checkAndCompleteKeys(JSON.parse(data), defaultConfig);
  import_node_fs.default.writeFileSync(configPath, JSON.stringify(config, null, 4), "utf-8");
}
function checkAndCompleteKeys(config, defaultConfig2) {
  const keys = Object.keys(config);
  const defaultKeys = Object.keys(defaultConfig2);
  for (const defaultKey of defaultKeys) {
    if (!keys.includes(defaultKey)) {
      config[defaultKey] = defaultConfig2[defaultKey];
    } else if (typeof config[defaultKey] === "object" && typeof defaultConfig2[defaultKey] === "object") {
      config[defaultKey] = checkAndCompleteKeys(
        config[defaultKey],
        defaultConfig2[defaultKey]
      );
    }
  }
  return config;
}
function saveConfig(config) {
  import_electron.BrowserWindow.getAllWindows().forEach((window) => {
    window.webContents.send("LiteLoader.MESSAGE.upDateConfig", JSON.parse(config));
  });
  config = typeof config == "string" ? JSON.stringify(JSON.parse(config), null, 4) : JSON.stringify(config, null, 4);
  import_node_fs.default.writeFileSync(configPath, config, "utf-8");
}
function getConfig() {
  const data = import_node_fs.default.readFileSync(configPath, "utf-8");
  return JSON.parse(data);
}
function output(...args) {
  console.log("\x1B[32m[MESSAGE]\x1B[0m", ...args);
}

// src/main.ts
function onLoad() {
  import_electron2.ipcMain.handle("LiteLoader.MESSAGE.getConfig", (_) => {
    try {
      return getConfig();
    } catch (error) {
      output(error);
      return {};
    }
  });
  import_electron2.ipcMain.on("LiteLoader.MESSAGE.saveConfig", (_, config) => {
    try {
      saveConfig(config);
    } catch (error) {
      output(error);
    }
  });
}
onLoad();
