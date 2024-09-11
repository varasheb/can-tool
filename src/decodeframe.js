import { checkForSupported } from "./checkpid.js";
import { sendRequestForSupportedPIds } from "./sendRequest.js";
import { DataHexDecoder } from "./calFUnction.js";

export function decodeFrame(data) {
  let arr = `${data}`.split("  ");
  if (arr[2] == "7E8") {
    let length = arr[4].split(" ")[0];
    let hexdata = arr[4].split(" ");
    const pid = hexdata[2];
    hexdata.splice(0, 3);
    hexdata.splice(length, hexdata.length - length);
    hexdata = hexdata.join("").trim();
    const decodedata = new DataHexDecoder();
    switch (pid) {
      case "00":
        const supported_pids_00 = checkForSupported("00", hexdata);
        sendRequestForSupportedPIds(supported_pids_00);
        return {
          id: "00",
          name: "PIDs supported [00 - 20]",
          value: decodedata.supported_pids_00(hexdata),
        };

      case "01":
        return {
          id: "01",
          name: "Monitor status since DTCs Cleared",
          value: decodedata.monitor_status_since_DTCs_cleared(hexdata),
        };
      case "02":
        return {
          id: "02",
          name: "Freez dtc frame stored",
          value: decodedata.freez_dtc(hexdata),
        };
      case "03":
        return {
          id: "03",
          name: "Fuel system status",
          value: decodedata.fuel_system_status(hexdata),
        };

      case "04":
        return {
          id: "04",
          name: "Calculate Engine Load",
          value: decodedata.calcuteEngineLoad(hexdata),
        };
      case "05":
        return {
          id: "05",
          name: "Engine coolant temperature",
          value: decodedata.engineColentTemprature(hexdata),
        };
      case "06":
        return {
          id: "06",
          name: "Short term fuel trim (bank 1)",
          value: decodedata.calculate_fuel_Trim(hexdata),
        };
      case "07":
        return {
          id: "07",
          name: "Short term fuel trim (bank 1)",
          value: decodedata.calculate_fuel_Trim(hexdata),
        };
      case "08":
        return {
          id: "08",
          name: "Short term fuel trim (bank 1)",
          value: decodedata.calculate_fuel_Trim(hexdata),
        };
      case "09":
        return {
          id: "09",
          name: "Short term fuel trim (bank 1)",
          value: decodedata.calculate_fuel_Trim(hexdata),
        };
      case "0A":
        return {
          id: "0A",
          name: "Fuel pressure (gauge pressure)",
          value: decodedata.calculate_fuel_Pressure(hexdata),
        };
      case "0B":
        return {
          id: "0B",
          name: "Intake manifold absolute pressure",
          value: decodedata.intake_manifold_absolute_pressure(hexdata),
        };
      case "0C":
        return {
          id: "0C",
          name: "Engine speed",
          value: decodedata.calculateEngineSpeed(hexdata),
        };
      case "0D":
        return {
          id: "0D",
          name: "Vehicle speed",
          value: decodedata.cal_vechile_Speed(hexdata),
        };
      case "0E":
        return {
          id: "0E",
          name: "Timing advance",
          value: decodedata.cal_timing_Advance(hexdata),
        };

      case "0F":
        return {
          id: "0F",
          name: "Intake air temperature",
          value: decodedata.cal_intake_air_temp(hexdata),
        };
      case "10":
        return {
          id: "10",
          name: "Mass air flow sensor air flow rate",
          value: decodedata.cal_mass_air_flow(hexdata),
        };
      case "11":
        return {
          id: "11",
          name: "Throttle position",
          value: decodedata.cal_throttle_position(hexdata),
        };
      case "12":
        return {
          id: "12",
          name: "Commanded secondary air status",
          value: decodedata.comanded_secondary_air_status(hexdata),
        };

      case "13":
        return {
          id: "13",
          name: "Oxygen sensors present (2 banks)",
          value: decodedata.cal_oxigen_senV(hexdata),
        };
      case "14":
        return {
          id: "14",
          name: "Oxygen sensor 1 (voltage)",
          value: decodedata.cal_oxigen_senV(hexdata),
        };
      case "15":
        return {
          id: "15",
          name: "Oxygen sensor 2 (voltage)",
          value: decodedata.cal_oxigen_senV(hexdata),
        };
      case "16":
        return {
          id: "16",
          name: "Oxygen sensor 3 (voltage)",
          value: decodedata.cal_oxigen_senV(hexdata),
        };
      case "17":
        return {
          id: "17",
          name: "Oxygen sensor 4 (voltage)",
          value: decodedata.cal_oxigen_senV(hexdata),
        };
      case "18":
        return {
          id: "18",
          name: "Oxygen sensor 5 (voltage)",
          value: decodedata.cal_oxigen_senV(hexdata),
        };
      case "19":
        return {
          id: "19",
          name: "Oxygen sensor 6 (voltage)",
          value: decodedata.cal_oxigen_senV(hexdata),
        };
      case "1A":
        return {
          id: "1A",
          name: "Oxygen sensor 7 (voltage)",
          value: decodedata.cal_oxigen_senV(hexdata),
        };
      case "1B":
        return {
          id: "1B",
          name: "Oxygen sensor 8 (voltage)",
          value: decodedata.cal_oxigen_senV(hexdata),
        };
      case "1C":
        break;
      case "1D":
        break;
      case "1E":
        break;
      case "1F":
        return {
          id: "1F",
          name: "Run time since engine start",
          value: decodedata.cal_run_time_engine_start(hexdata),
        };

      case "20":
        const supported_pids_20 = checkForSupported("20", hexdata);
        sendRequestForSupportedPIds(supported_pids_20);
        return {
          id: "20",
          name: "PIDs supported [21 - 40]",
          value: decodedata.supported_pids_20(hexdata),
        };
      case "21":
        return {
          id: "21",
          name: "Distance traveled with malfunction indicator lamp (MIL) on",
          value:
            decodedata.calculate_distance_travelled_with_malfuction_indicator_lamp(
              hexdata
            ),
        };

      case "22":
        return {
          id: "22",
          name: "Fuel Rail Pressure (relative to manifold vacuum)",
          value: decodedata.calculate_fuel_rail_pressure(hexdata),
        };

      case "23":
        return {
          id: "23",
          name: "Fuel Rail Gauge Pressure (diesel, or gasoline direct injection)",
          value: decodedata.calculate_fuel_rail_gauge_pressure(hexdata),
        };
      case "24":
        return {
          id: "24",
          name: "Oxygen sensor",
          value: decodedata.calculate_oxygen_sensor_ratio_voltage(hexdata),
        };
      case "25":
        return {
          id: "25",
          name: "Oxygen sensor",
          value: decodedata.calculate_oxygen_sensor_ratio_voltage(hexdata),
        };

      case "26":
        return {
          id: "26",
          name: "Oxygen sensor",
          value: decodedata.calculate_oxygen_sensor_ratio_voltage(hexdata),
        };

      case "27":
        return {
          id: "27",
          name: "Oxygen sensor",
          value: decodedata.calculate_oxygen_sensor_ratio_voltage(hexdata),
        };

      case "28":
        return {
          id: "28",
          name: "Oxygen sensor",
          value: decodedata.calculate_oxygen_sensor_ratio_voltage(hexdata),
        };

      case "29":
        return {
          id: "29",
          name: "Oxygen sensor",
          value: decodedata.calculate_oxygen_sensor_ratio_voltage(hexdata),
        };

      case "2A":
        return {
          id: "2A",
          name: "Oxygen sensor",
          value: decodedata.calculate_oxygen_sensor_ratio_voltage(hexdata),
        };

      case "2B":
        return {
          id: "2B",
          name: "Oxygen sensor",
          value: decodedata.calculate_oxygen_sensor_ratio_voltage(hexdata),
        };

      case "2C":
        return {
          id: "2C",
          name: "Comnaded EDR",
          value: decodedata.calculate_commanded_EGR(hexdata),
        };

      case "2D":
        return {
          id: "2D",
          name: "Comnaded Error",
          value: decodedata.calculate_EGR_Error(hexdata),
        };
      case "2E":
        return {
          id: "2E",
          name: "Commanded evaporative purge",
          value: decodedata.calculate_commanded_evaporative_purge(hexdata),
        };

      case "2F":
        return {
          id: "2F",
          name: "Fuel Tank Level Input",
          value: decodedata.calculate_fuel_tank_level_input(hexdata),
        };
      case "30":
        return {
          id: "30",
          name: "Warm-ups since codes cleared",
          value: decodedata.calculate_warm_ups_since_code_cleared(hexdata),
        };

      case "31":
        return {
          id: "31",
          name: "Distance traveled since codes cleared",
          value:
            decodedata.calculate_distance_traveled_since_codes_cleared(hexdata),
        };

      case "32":
        return {
          id: "32",
          name: "Evap. System Vapor Pressure",
          value: decodedata.calculate_Evap_system_vapour_pressure(hexdata),
        };

      case "33":
        return {
          id: "33",
          name: "Absolute Barometric Pressure",
          value: decodedata.calculate_absolute_barometric_pressure(hexdata),
        };

      case "34":
        return {
          id: "34",
          name: "Oxygen Sensor 1",
          value: decodedata.calculate_oxygen_sensor_ratio_current(hexdata),
        };

      case "35":
        return {
          id: "35",
          name: "Oxygen Sensor 2",
          value: decodedata.calculate_oxygen_sensor_ratio_current(hexdata),
        };

      case "36":
        return {
          id: "36",
          name: "Oxygen Sensor 3",
          value: decodedata.calculate_oxygen_sensor_ratio_current(hexdata),
        };

      case "37":
        return {
          id: "37",
          name: "Oxygen Sensor 4",
          value: decodedata.calculate_oxygen_sensor_ratio_current(hexdata),
        };

      case "38":
        return {
          id: "38",
          name: "Oxygen Sensor 5",
          value: decodedata.calculate_oxygen_sensor_ratio_current(hexdata),
        };
      case "39":
        return {
          id: "39",
          name: "Oxygen Sensor 6",
          value: decodedata.calculate_oxygen_sensor_ratio_current(hexdata),
        };

      case "3A":
        return {
          id: "3A",
          name: "Oxygen Sensor 7",
          value: decodedata.calculate_oxygen_sensor_ratio_current(hexdata),
        };

      case "3B":
        return {
          id: "3B",
          name: "Oxygen Sensor 8",
          value: decodedata.calculate_oxygen_sensor_ratio_current(hexdata),
        };

      case "3C":
        return {
          id: "3C",
          name: "Catalyst Temperature: Bank 1, Sensor 1",
          value: decodedata.calculate_catalyst_temperature(hexdata),
        };

      case "3D":
        return {
          id: "3D",
          name: "Catalyst Temperature: Bank 2, Sensor 1",
          value: decodedata.calculate_catalyst_temperature(hexdata),
        };

      case "3E":
        return {
          id: "3E",
          name: "Catalyst Temperature: Bank 1, Sensor 2",
          value: decodedata.calculate_catalyst_temperature(hexdata),
        };

      case "3F":
        return {
          id: "3F",
          name: "Catalyst Temperature: Bank 2, Sensor 2",
          value: decodedata.calculate_catalyst_temperature(hexdata),
        };
      case "40":
        const supported_pids_40 = checkForSupported("40", hexdata);
        sendRequestForSupportedPIds(supported_pids_40);
        return {
          id: "40",
          name: "PIDs supported [41 - 60]",
          value: decodedata.supported_pids_40(hexdata),
        };

      case "41":
        return {
          id: "41",
          name: "Monitor status this drive cycle",
          value: decodedata.monitor_status_this_drive_cycle(hexdata),
        };

      case "42":
        return {
          id: "42",
          name: "Control module voltage",
          value: decodedata.calControlModuleVoltage(hexdata),
        };

      case "43":
        return {
          id: "43",
          name: "Absolute load value",
          value: decodedata.calAbsoluteLoadValue(hexdata),
        };

      case "44":
        return {
          id: "44",
          name: "Commanded Air-Fuel Equivalence Ratio",
          value: decodedata.calCommandedAirFuelEquivalence(hexdata),
        };

      case "45":
        return {
          id: "45",
          name: "Relative throttle position",
          value: decodedata.calRelativeThrottleposition(hexdata),
        };

      case "46":
        return {
          id: "46",
          name: "Ambient air temperature",
          value: decodedata.calAmbientAirTemperature(hexdata),
        };

      case "47":
        return {
          id: "47",
          name: "Absolute throttle position B",
          value: decodedata.calAbsoluteThrottlePosition(hexdata),
        };

      case "48":
        return {
          id: "48",
          name: "Absolute throttle position C",
          value: decodedata.calAbsoluteThrottlePosition(hexdata),
        };

      case "49":
        return {
          id: "49",
          name: "Absolute throttle position D",
          value: decodedata.calAbsoluteThrottlePosition(hexdata),
        };

      case "4A":
        return {
          id: "4A",
          name: "Accelerator pedal position E",
          value: decodedata.calAbsoluteThrottlePosition(hexdata),
        };

      case "4B":
        return {
          id: "4B",
          name: "Accelerator pedal position F",
          value: decodedata.calAbsoluteThrottlePosition(hexdata),
        };

      case "4C":
        return {
          id: "4C",
          name: "Commanded throttle actuator",
          value: decodedata.calAbsoluteThrottlePosition(hexdata),
        };

      case "4D":
        return {
          id: "4D",
          name: "Time run with MIL on",
          value: decodedata.calTimeRunWithMIL(hexdata),
        };

      case "4E":
        return {
          id: "4E",
          name: "Time since trouble codes cleared",
          value: decodedata.calTimeSinceDtcCleared(hexdata),
        };

      case "4F":
        return {
          id: "4F",
          name: "Maximum value for Fuel–Air equivalence ratio",
          value: decodedata.calMaxFuelAirEquiv(hexdata),
        };

      case "50":
        return {
          id: "50",
          name: "Maximum value for air flow rate from mass air flow sensor",
          value: decodedata.calMaxAirFlowRate(hexdata),
        };

      case "51":
        return {
          id: "51",
          name: "Fuel Type",
          value: decodedata.calFuelType(hexdata),
        };

      case "52":
        return {
          id: "52",
          name: "Ethanol fuel",
          value: decodedata.calEthanolFuelPercentage(hexdata),
        };

      case "53":
        return {
          id: "53",
          name: "Absolute Evap system Vapor Pressure",
          value: decodedata.calAbsoluteEvapSystemVaporPressure(hexdata),
        };

      case "54":
        return {
          id: "54",
          name: "Evap system vapor pressure",
          value: decodedata.calEvapSystemVaporPressure(hexdata),
        };

      case "55":
        return {
          id: "55",
          name: "Short term secondary oxygen sensor trim A:bank 1, B: bank 3",
          value: decodedata.calShortTermSecondaryOxygenSensorTrim(hexdata),
        };

      case "56":
        return {
          id: "56",
          name: "Long term secondary oxygen sensor trim A:bank 1, B: bank 3",
          value: decodedata.calShortTermSecondaryOxygenSensorTrim(hexdata),
        };

      case "57":
        return {
          id: "57",
          name: "Short term secondary oxygen sensor trim, A: bank 2, B: bank 4",
          value: decodedata.calShortTermSecondaryOxygenSensorTrim(hexdata),
        };

      case "58":
        return {
          id: "58",
          name: "Long term secondary oxygen sensor trim, A: bank 2, B: bank 4",
          value: decodedata.calShortTermSecondaryOxygenSensorTrim(hexdata),
        };

      case "59":
        return {
          id: "59",
          name: "Fuel rail absolute pressure",
          value: decodedata.calFuelRailAbsolutePressure(hexdata),
        };

      case "5A":
        return {
          id: "5A",
          name: "Relative accelerator pedal position",
          value: decodedata.calRelativeAcceleratorPedalPosition(hexdata),
        };

      case "5B":
        return {
          id: "5B",
          name: "Hybrid battery pack remaining lif",
          value: decodedata.calHybridBatteryPackRemainingLife(hexdata),
        };

      case "5C":
        return {
          id: "5C",
          name: "Engine oil temperature",
          value: decodedata.calEngineOilTemperature(hexdata),
        };

      case "5D":
        return {
          id: "5D",
          name: "Fuel injection timing",
          value: decodedata.calFuelInjectionTiming(hexdata),
        };

      case "5E":
        return {
          id: "5E",
          name: "Engine fuel rate",
          value: decodedata.calEngineFuelRate(hexdata),
        };

      case "5F":
        return {
          id: "5F",
          name: "Emission requirements to which vehicle is designed",
          value: decodedata.calEmissionRequirements(hexdata),
        };

      case "60":
        const supported_pids_60 = checkForSupported("60", hexdata);
        sendRequestForSupportedPIds(supported_pids_60);
        return {
          id: "60",
          name: "PIDs supported [61 - 80]",
          value: decodedata.supported_pids_60(hexdata),
        };

      case "61":
        return {
          id: "61",
          name: "Drivers demand engine - percent torque",
          value: decodedata.drivers_demand_engine_precent_torque(hexdata),
        };

      case "62":
        return {
          id: "62",
          name: "Actual engine - percent torque",
          value: decodedata.actual_engine_percent_torque(hexdata),
        };
      case "63":
        return {
          id: "63",
          name: "Engine reference torque",
          value: decodedata.engine_refernce_torque(hexdata),
        };

      case "64":
        return {
          id: "64",
          name: "Engine percent torque data",
          value: decodedata.engine_percent_torque_data(hexdata),
        };

      case "65":
        return {
          id: "65",
          name: "Auxiliary input / output supported",
          value: decodedata.auxillory_input_output_support(hexdata),
        };

      case "66":
        return {
          id: "66",
          name: "Mass air flow sensor",
          value: decodedata.mass_air_flow_sensor(hexdata),
        };

      case "67":
        return {
          id: "67",
          name: "Engine coolant temperature 1",
          value: decodedata.engine_colent_sensor_1(hexdata),
        };

      case "68":
        return {
          id: "68",
          name: "Intake air temperature sensor 1",
          value: decodedata.intake_air_temperture_sensor_1(hexdata),
        };

      case "7C":
        return {
          id: "7C",
          name: "Diesel Particulate filter (DPF) temperature",
          value: decodedata.diesel_particulate_filter_temperture(hexdata),
        };

      case "80":
        const supported_pids_80 = checkForSupported("80", hexdata);
        sendRequestForSupportedPIds(supported_pids_80);
        return {
          id: "80",
          name: "PIDs supported [81 - A0]",
          value: decodedata.supported_pids_80(hexdata),
        };

      case "8D":
        return {
          id: "8D",
          name: "Throttle Position G",
          value: decodedata.calculate_throtle_position_G(hexdata),
        };

      case "8E":
        return {
          id: "8E",
          name: "Engine Friction - Percent Torque",
          value: decodedata.calculate_engine_friction_torque(hexdata),
        };
      case "A0":
        const supported_pids_A0 = checkForSupported("A0", hexdata);
        sendRequestForSupportedPIds(supported_pids_A0);
        return {
          id: "A0",
          name: "PIDs supported [A1 - C0]",
          value: decodedata.supported_pids_A0(hexdata),
        };
      case "A2":
        return {
          id: "A2",
          name: "Cylinder Fuel Rate",
          value: decodedata.calculate_cylinder_fuel_rate(hexdata),
        };

      case "A4":
        return {
          id: "A4",
          name: "Transmission Actual Gear",
          value: decodedata.calculate_transmission_actual_gear(hexdata),
        };

      case "A5":
        return {
          id: "A5",
          name: "Commanded Diesel Exhaust Fluid Dosing",
          value:
            decodedata.calculate_commanded_diesel_exhaust_fluid_dosing(hexdata),
        };

      case "A6":
        return {
          id: "A6",
          name: "odometer",
          value: decodedata.calculate_odometer(hexdata),
        };

      default:
        console.error(`Unknown PID: ${hexdata.slice(0, 2)}`);
        return null;
    }
  }
}
