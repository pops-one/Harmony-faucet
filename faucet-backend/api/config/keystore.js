/********************************
Simulated keystore
********************************/
const keys = new Map();

keys.set(
  "one1w7lu05adqfhv8slx0aq8lgzglk5vrnwvf5f740",
  "01F903CE0C960FF3A9E68E80FF5FFC344358D80CE1C221C3F9711AF07F83A3BD"
);
keys.set(
  "one17xr83eujcngu349wkysk5sk9z4fvr207gpnrhl",
  "4a9da1dfa22f2936fdb90f885f5a7e17bcfba8463656aa89e24df8a99959f442"
);
keys.set(
  "one18t4yj4fuutj83uwqckkvxp9gfa0568uc48ggj7",
  "01F903CE0C960FF3A9E68E80FF5FFC344358D80CE1C221C3F9711AF07F83A3BD"
);
keys.set(
  "one1qaxw5a62tca6p9uf36kjlcq6flk2s34uxrkrld",
  "01F903CE0C960FF3A9E68E80FF5FFC344358D80CE1C221C3F9711AF07F83A3BD"
);

export const keystore = (bech32Address) => keys.get(bech32Address);
