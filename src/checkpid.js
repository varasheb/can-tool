const PIDS_00_20 = [
  { id: "01", name: "Monitor status since DTCs cleared" },
  { id: "02", name: "Freeze DTC" },
  { id: "03", name: "Fuel system status" },
  { id: "04", name: "Calculated engine load" },
  { id: "05", name: "Engine coolant temperature" },
  { id: "06", name: "Short term fuel trim (bank 1)" },
  { id: "07", name: "Long term fuel trim (bank 1)" },
  { id: "08", name: "Short term fuel trim (bank 2)" },
  { id: "09", name: "Long term fuel trim (bank 2)" },
  { id: "0A", name: "Fuel pressure (gauge pressure)" },
  { id: "0B", name: "Intake manifold absolute pressure" },
  { id: "0C", name: "Engine speed" },
  { id: "0D", name: "Vehicle speed" },
  { id: "0E", name: "Timing advance" },
  { id: "0F", name: "Intake air temperature" },
  { id: "10", name: "Mass air flow sensor air flow rate" },
  { id: "11", name: "Throttle position" },
  { id: "12", name: "Commanded secondary air status" },
  { id: "13", name: "Oxygen sensors present (2 banks)" },
  { id: "14", name: "Oxygen sensor 1 (voltage)" },
  { id: "15", name: "Oxygen sensor 2 (voltage)" },
  { id: "16", name: "Oxygen sensor 3 (voltage)" },
  { id: "17", name: "Oxygen sensor 4 (voltage)" },
  { id: "18", name: "Oxygen sensor 5 (voltage)" },
  { id: "19", name: "Oxygen sensor 6 (voltage)" },
  { id: "1A", name: "Oxygen sensor 7 (voltage)" },
  { id: "1B", name: "Oxygen sensor 8 (voltage)" },
  { id: "1C", name: "OBD standards the vehicle conforms to" },
  { id: "1D", name: "Oxygen sensors present (4 banks)" },
  { id: "1E", name: "Auxiliary input status" },
  { id: "1F", name: "Run time since engine start" },
  { id: "20", name: "PIDs supported [21 - 40]" },
];

const PIDS_21_40 = [
  { id: "21", name: "Distance traveled with MIL on" },
  { id: "22", name: "Fuel rail pressure (relative to manifold vacuum)" },
  { id: "23", name: "Fuel rail gauge pressure (diesel, gas inject)" },
  { id: "24", name: "Oxygen sensor 1 (air-fuel equivalence ratio)" },
  { id: "25", name: "Oxygen sensor 2 (air-fuel equivalence ratio)" },
  { id: "26", name: "Oxygen sensor 3 (air-fuel equivalence ratio)" },
  { id: "27", name: "Oxygen sensor 4 (air-fuel equivalence ratio)" },
  { id: "28", name: "Oxygen sensor 5 (air-fuel equivalence ratio)" },
  { id: "29", name: "Oxygen sensor 6 (air-fuel equivalence ratio)" },
  { id: "2A", name: "Oxygen sensor 7 (air-fuel equivalence ratio)" },
  { id: "2B", name: "Oxygen sensor 8 (air-fuel equivalence ratio)" },
  { id: "2C", name: "Commanded EGR" },
  { id: "2D", name: "EGR Error" },
  { id: "2E", name: "Commanded evaporative purge" },
  { id: "2F", name: "Fuel tank level input" },
  { id: "30", name: "Warmups since DTCs cleared" },
  { id: "31", name: "Distance traveled since DTCs cleared" },
  { id: "32", name: "Evaporative system vapor pressure" },
  { id: "33", name: "Absolute barometric pressure" },
  { id: "34", name: "Oxygen sensor 1 (air-fuel equivalence ratio)" },
  { id: "35", name: "Oxygen sensor 2 (air-fuel equivalence ratio)" },
  { id: "36", name: "Oxygen sensor 3 (air-fuel equivalence ratio)" },
  { id: "37", name: "Oxygen sensor 4 (air-fuel equivalence ratio)" },
  { id: "38", name: "Oxygen sensor 5 (air-fuel equivalence ratio)" },
  { id: "39", name: "Oxygen sensor 6 (air-fuel equivalence ratio)" },
  { id: "3A", name: "Oxygen sensor 7 (air-fuel equivalence ratio)" },
  { id: "3B", name: "Oxygen sensor 8 (air-fuel equivalence ratio)" },
  { id: "3C", name: "Catalyst temperature (bank 1, sensor 1)" },
  { id: "3D", name: "Catalyst temperature (bank 2, sensor 1)" },
  { id: "3E", name: "Catalyst temperature (bank 1, sensor 2)" },
  { id: "3F", name: "Catalyst temperature (bank 2, sensor 2)" },
  { id: "40", name: "PIDs supported [41 - 60]" },
];

const PIDS_41_60 = [
  { id: "41", name: "Monitor status this drive cycle" },
  { id: "42", name: "Control module voltage" },
  { id: "43", name: "Absolute load value" },
  { id: "44", name: "Commanded air-fuel equivalence ratio" },
  { id: "45", name: "Relative throttle position" },
  { id: "46", name: "Ambient air temperature" },
  { id: "47", name: "Absolute throttle position B" },
  { id: "48", name: "Absolute throttle position C" },
  { id: "49", name: "Accelerator pedal position D" },
  { id: "4A", name: "Accelerator pedal position E" },
  { id: "4B", name: "Accelerator pedal position F" },
  { id: "4C", name: "Commanded throttle actuator" },
  { id: "4D", name: "Time run with MIL on" },
  { id: "4E", name: "Time since DTCs cleared" },
  { id: "4F", name: "Max fuel-air equivalence ratio" },
  { id: "50", name: "Max air flow rate from MAF sensor" },
  { id: "51", name: "Fuel type" },
  { id: "52", name: "Ethanol fuel percentage" },
  { id: "53", name: "Absolute evap system vapor pressure" },
  { id: "54", name: "Evap system vapor pressure" },
  { id: "55", name: "Short term secondary oxygen trim (bank 1)" },
  { id: "56", name: "Long term secondary oxygen trim (bank 1)" },
  { id: "57", name: "Short term secondary oxygen trim (bank 2)" },
  { id: "58", name: "Long term secondary oxygen trim (bank 2)" },
  { id: "59", name: "Fuel rail absolute pressure" },
  { id: "5A", name: "Relative accelerator pedal position" },
  { id: "5B", name: "Hybrid battery pack remaining life" },
  { id: "5C", name: "Engine oil temperature" },
  { id: "5D", name: "Fuel injection timing" },
  { id: "5E", name: "Engine fuel rate" },
  { id: "5F", name: "Emission requirements" },
  { id: "60", name: "PIDs supported [61 - 80]" },
];

const PIDS_61_80 = [
  { id: "61", name: "Demanded engine percent torque" },
  { id: "62", name: "Actual engine percent torque" },
  { id: "63", name: "Engine reference torque" },
  { id: "64", name: "Engine percent torque (idle)" },
  { id: "65", name: "Auxiliary input/output supported" },
  { id: "66", name: "Mass air flow sensor (A)" },
  { id: "67", name: "Engine coolant temperature (sensor 1)" },
  { id: "68", name: "Intake air temperature (sensor 1)" },
  { id: "69", name: "Commanded EGR and EGR error" },
  { id: "6A", name: "Common diesel intake air flow control/position" },
  { id: "6B", name: "Exhaust gas recirculation temperature" },
  { id: "6C", name: "Common throttle actuator control/position" },
  { id: "6D", name: "Fuel pressure control system" },
  { id: "6E", name: "Injection pressure control system" },
  { id: "6F", name: "Turbocharger compressor inlet pressure" },
  { id: "70", name: "Boost pressure control" },
  { id: "71", name: "Variable geometry turbo control" },
  { id: "72", name: "Wastegate control" },
  { id: "73", name: "Exhaust pressure" },
  { id: "74", name: "Turbocharger RPM" },
  { id: "75", name: "Turbocharger temperature" },
  { id: "76", name: "Turbocharger temperature" },
  { id: "77", name: "Charge air cooler temperature" },
  { id: "78", name: "EGT (bank 1)" },
  { id: "79", name: "EGT (bank 2)" },
  { id: "7A", name: "Diesel particulate filter - differential pressure" },
  { id: "7B", name: "Diesel particulate filter" },
  { id: "7C", name: "Diesel particulate filter - temperature" },
  { id: "7D", name: "NOx NTE control area status" },
  { id: "7E", name: "PM NTE control area status" },
  { id: "7F", name: "Engine run time" },
  { id: "80", name: "PIDs supported [81 - A0]" },
];

const PIDS_81_A0 = [
  { id: "81", name: "Engine run time for AECD" },
  { id: "82", name: "Engine run time for AECD" },
  { id: "83", name: "NOx sensor" },
  { id: "84", name: "Manifold surface temperature" },
  { id: "85", name: "NOx reagent system" },
  { id: "86", name: "Particulate matter sensor" },
  { id: "87", name: "Intake manifold absolute pressure" },
  { id: "88", name: "SCR induce system" },
  { id: "89", name: "Run time for AECD #11-#15" },
  { id: "8A", name: "Run time for AECD #16-#20" },
  { id: "8B", name: "Diesel aftertreatment" },
  { id: "8C", name: "O2 sensor (wide range)" },
  { id: "8D", name: "Throttle position G" },
  { id: "8E", name: "Engine friction percent torque" },
  { id: "8F", name: "Particulate matter sensor (bank 1 & 2)" },
  { id: "90", name: "WWH-OBD vehicle OBD system Info" },
  { id: "91", name: "WWH-OBD vehicle OBD system Info" },
  { id: "92", name: "Fuel system control" },
  { id: "93", name: "WWH-OBD counters support" },
  { id: "94", name: "NOx warning and inducement system" },
  { id: "95", name: "" },
  { id: "96", name: "" },
  { id: "97", name: "" },
  { id: "98", name: "EGT sensor" },
  { id: "99", name: "EGT sensor" },
  { id: "9A", name: "Hybrid/EV system data, battery, voltage" },
  { id: "9B", name: "Diesel exhaust fluid sensor data" },
  { id: "9C", name: "O2 sensor data" },
  { id: "9D", name: "Engine fuel rate" },
  { id: "9E", name: "Engine exhaust flow rate" },
  { id: "9F", name: "Fuel system percentage use" },
  { id: "A0", name: "PIDs supported [A1 - C0]" },
];

const PIDS_A0_C0 = [
  { id: "A1", name: "NOx sensor corrected data" },
  { id: "A2", name: "Cylinder fuel rate" },
  { id: "A3", name: "Evap system vapor pressure" },
  { id: "A4", name: "Transmission actual gear" },
  { id: "A5", name: "Commanded diesel exhaust fluid dosing" },
  { id: "A6", name: "Odometer" },
  { id: "A7", name: "NOx concentration 3, 4" },
  { id: "A8", name: "NOx corrected concentration (3, 4)" },
  { id: "A9", name: "" },
  { id: "AA", name: "" },
  { id: "AB", name: "" },
  { id: "AC", name: "" },
  { id: "AD", name: "" },
  { id: "AE", name: "" },
  { id: "AF", name: "" },
  { id: "B0", name: "" },
  { id: "B1", name: "" },
  { id: "B2", name: "" },
  { id: "B3", name: "" },
  { id: "B4", name: "" },
  { id: "B5", name: "" },
  { id: "B6", name: "" },
  { id: "B7", name: "" },
  { id: "B8", name: "" },
  { id: "B9", name: "" },
  { id: "BA", name: "" },
  { id: "BB", name: "" },
  { id: "BC", name: "" },
  { id: "BD", name: "" },
  { id: "BE", name: "" },
  { id: "BF", name: "" },
  { id: "C0", name: "PIDs supported [C1 - E0]" },
];

function hexToBinary(hex) {
  hex = hex.replace(/^0x/, "");

  const decimal = parseInt(hex, 16);

  let binary = decimal.toString(2);

  const padLength = hex.length * 4;
  binary = binary.padStart(padLength, "0");

  return binary;
}

export function checkForSupported(pidvalue, value) {
  const binaryValue = hexToBinary(value);
  const supportedPids = [];
  let PIDS = [];
  switch (pidvalue) {
    case "00":
      PIDS = PIDS_00_20;
      break;
    case "20":
      PIDS = PIDS_21_40;
      break;
    case "40":
      PIDS = PIDS_41_60;
      break;
    case "60":
      PIDS = PIDS_61_80;
      break;
    case "80":
      PIDS = PIDS_81_A0;
      break;
    case "A0":
      PIDS = PIDS_A0_C0;
      break;
    default:
      console.log("Unsupported PID value");
      return [];
  }
  for (let i in binaryValue) {
    if (binaryValue[i] == 1) {
      supportedPids.push(PIDS[i]);
    }
  }

  return supportedPids;
}
