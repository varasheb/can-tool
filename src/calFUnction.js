export class DataHexDecoder {
  monitor_status_since_DTCs_cleared(hexdata) {
    let hexA = hexdata.slice(0, 8);
    let A = parseInt(hexA, 16);
    let result = 1 * A;
    let encodedResult = `${result} ENCODED`;
    console.log("monitor_status_since_DTCs_cleared", encodedResult);
    return encodedResult;
  }

  supported_pids_00(hexdata) {
    let hexA = hexdata.slice(0, 8);
    let A = parseInt(hexA, 16);
    let result = 1 * A;
    let encodedResult = `${result} ENCODED`;
    console.log("monitor_status_since_DTCs_cleared", encodedResult);
    return encodedResult;
  }
  supported_pids_20(hexdata) {
    let hexA = hexdata.slice(0, 8);
    let A = parseInt(hexA, 16);
    let result = 1 * A;
    let encodedResult = `${result} ENCODED`;
    console.log("monitor_status_since_DTCs_cleared", encodedResult);
    return encodedResult;
  }
  supported_pids_40(hexdata) {
    let hexA = hexdata.slice(0, 8);
    let A = parseInt(hexA, 16);
    let result = 1 * A;
    let encodedResult = `${result} ENCODED`;
    console.log("monitor_status_since_DTCs_cleared", encodedResult);
    return encodedResult;
  }
  supported_pids_60(hexdata) {
    let hexA = hexdata.slice(0, 8);
    let A = parseInt(hexA, 16);
    let result = 1 * A;
    let encodedResult = `${result} ENCODED`;
    console.log("monitor_status_since_DTCs_cleared", encodedResult);
    return encodedResult;
  }

  supported_pids_80(hexdata) {
    let hexA = hexdata.slice(0, 8);
    let A = parseInt(hexA, 16);
    let result = 1 * A;
    let encodedResult = `${result} ENCODED`;
    console.log("monitor_status_since_DTCs_cleared", encodedResult);
    return encodedResult;
  }
  supported_pids_A0(hexdata) {
    let hexA = hexdata.slice(0, 8);
    let A = parseInt(hexA, 16);
    let result = 1 * A;
    let encodedResult = `${result} ENCODED`;
    console.log("monitor_status_since_DTCs_cleared", encodedResult);
    return encodedResult;
  }

  freez_dtc(hexdata) {
    let hexA = hexdata.slice(0, 4);
    let A = parseInt(hexA, 16);
    let result = 1 * A;
    let encodedResult = `${result} ENCODED`;
    console.log("freez_dtc", encodedResult);
    return encodedResult;
  }

  fuel_system_status(hexdata) {
    let hexA = hexdata.slice(0, 4);
    let A = parseInt(hexA, 16);
    let result = 1 * A;
    let encodedResult = `${result} ENCODED`;
    console.log("fuel system status", encodedResult);
    return encodedResult;
  }

  comanded_secondary_air_status(hexdata) {
    let hexA = hexdata.slice(0, 2);
    let A = parseInt(hexA, 16);
    let result = 1 * A;
    let encodedResult = `${result} ENCODED`;
    console.log("comanded_secondary_air_status", encodedResult);
    return encodedResult;
  }

  obd_standard_to_vechile_cinfirm(hexdata) {
    let hexA = hexdata.slice(0, 2);
    let A = parseInt(hexA, 16);
    let result = 1 * A;
    let encodedResult = `${result} ENCODED`;
    console.log("obd_standard_to_vechile_cinfirm", encodedResult);
    return encodedResult;
  }

  calculateEngineSpeed(hexData) {
    let hexA = hexData.slice(0, 2);
    let hexB = hexData.slice(2, 4);
    let A = parseInt(hexA, 16);
    let B = parseInt(hexB, 16);
    let result = (256 * A + B) / 4;
    let finalResult = `${result} RPM`;
    console.log("Engine Speed:", finalResult);
    return finalResult;
  }

  calcuteEngineLoad(hexdata) {
    let hexA = hexdata.slice(0, 2);
    let A = parseInt(hexA, 16);
    let result = A / 2.55;
    let finalResult = `${result} %`;
    console.log("Engine Load in percentage:", finalResult);
    return finalResult;
  }

  engineColentTemprature(hexData) {
    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);
    let result = A - 40;
    let finalResult = `${result} °C`;
    console.log("Engine coolant temperature:", finalResult);
    return finalResult;
  }

  calculate_fuel_Trim(hexData) {
    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);
    let result = A / 1.28 - 100;
    let finalResult = `${result} %`;
    console.log("Fuel Trim:", finalResult);
    return finalResult;
  }

  calculate_fuel_Pressure(hexData) {
    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);
    let result = 3 * A;
    let finalResult = `${result} kPa`;
    console.log("Fuel Pressure:", finalResult);
    return finalResult;
  }

  intake_manifold_absolute_pressure(hexData) {
    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);
    let result = 1 * A;
    let finalResult = `${result} kPa`;
    console.log("Intake Manifold Absolute Pressure:", finalResult);
    return finalResult;
  }

  cal_vechile_Speed(hexData) {
    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);
    let result = 1 * A;
    let finalResult = `${result} Km/h`;
    console.log("Vehicle Speed:", finalResult);
    return finalResult;
  }

  cal_timing_Advance(hexData) {
    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);
    let result = A / 2 - 64;
    let finalResult = `${result} deg`;
    console.log("Timing Advance:", finalResult);
    return finalResult;
  }

  cal_intake_air_temp(hexData) {
    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);
    let result = A - 40;
    let finalResult = `${result} °C`;
    console.log("Intake Air Temperature:", finalResult);
    return finalResult;
  }

  cal_mass_air_flow(hexData) {
    let hexA = hexData.slice(0, 2);
    let hexB = hexData.slice(2, 4);
    let A = parseInt(hexA, 16);
    let B = parseInt(hexB, 16);
    let result = (256 * A + B) / 100;
    let finalResult = `${result} g/s`;
    console.log("Mass Air Flow:", finalResult);
    return finalResult;
  }

  cal_throttle_position(hexData) {
    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);
    let result = (100 / 255) * A;
    let finalResult = `${result} %`;
    console.log("Throttle Position:", finalResult);
    return finalResult;
  }

  cal_oxigen_senV(hexData) {
    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);
    let result = A / 200;
    let finalResult = `${result} V`;
    console.log("Oxygen Sensor Voltage:", finalResult);
    return finalResult;
  }

  cal_run_time_engine_start(hexData) {
    let hexA = hexData.slice(0, 2);
    let hexB = hexData.slice(2, 4);
    let A = parseInt(hexA, 16);
    let B = parseInt(hexB, 16);
    let result = 256 * A + B;
    let finalResult = `${result} seconds`;
    console.log("Run Time Since Engine Start:", finalResult);
    return finalResult;
  }

  drivers_demand_engine_precent_torque(hexData) {
    // pid 61
    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);
    let result = A - 125;
    let finalResult = `${result} %`;
    return finalResult;
  }

  actual_engine_percent_torque(hexData) {
    // pid 62
    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);
    let result = A - 125;
    let finalResult = `${result} %`;
    return finalResult;
  }

  engine_refernce_torque(hexData) {
    // pid 63

    let hexA = hexData.slice(0, 2);
    let hexB = hexData.slice(2, 4);
    let A = parseInt(hexA, 16);
    let B = parseInt(hexB, 16);
    let result = 256 * A + B;
    let finalResult = `${result} NM`;
    return finalResult;
  }

  engine_percent_torque_data(hexData) {
    // pid 64

    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);

    let result = A - 125;
    let finalResult = `${result} %`;
    return finalResult;
  }

  auxillory_input_output_support(hexData) {
    // pid 65

    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);

    let result = A * 1;
    let finalResult = `${result} ENCODED`;
    return finalResult;
  }

  mass_air_flow_sensor(hexData) {
    // pid 66

    let hexA = hexData.slice(0, 2);
    let hexB = hexData.slice(2, 4);
    let A = parseInt(hexA, 16);
    let B = parseInt(hexB, 16);
    let result = (256 * A + B) / 32;
    let finalResult = `${result} G/S`;
    return finalResult;
  }

  engine_colent_sensor_1(hexData) {
    // pid 67

    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);
    let result = A - 40;
    let finalResult = `${result} °C`;
    return finalResult;
  }

  intake_air_temperture_sensor_1(hexData) {
    // pid 68

    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);
    let result = A - 40;
    let finalResult = `${result} °C`;
    return finalResult;
  }

  diesel_particulate_filter_temperture(hexData) {
    // pid 7C

    let hexA = hexData.slice(0, 2);
    let hexB = hexData.slice(2, 4);
    let A = parseInt(hexA, 16);
    let B = parseInt(hexB, 16);
    let result = (256 * A + B) / 10 - 40;
    let finalResult = `${result}  °C`;
    return finalResult;
  }

  //pid-[21]
  calculate_distance_travelled_with_malfuction_indicator_lamp(hexData) {
    let hex1 = hexData.slice(0, 2);
    let hex2 = hexData.slice(2, 4);

    let val1 = parseInt(hex1, 16);
    let val2 = parseInt(hex2, 16);
    let result = 256 * val1 + val2;

    // console.log("distance travelled with malfuction indicator lamp in kilometer" + result +"km");

    return `${result} km`;
  }

  //pid-[22]

  calculate_fuel_rail_pressure(hexData) {
    let hex1 = hexData.slice(0, 2);
    let hex2 = hexData.slice(2, 4);

    let val1 = parseInt(hex1, 16);
    let val2 = parseInt(hex2, 16);

    let result = 0.079 * (256 * val1 + val2);

    // console.log("fuel rail pressure in kilo pascaluel_rail_pressure " + result + "kPa");

    return `${result} kPa`;
  }

  //pid-[23]

  calculate_fuel_rail_gauge_pressure(hexData) {
    let hex1 = hexData.slice(0, 2);
    let hex2 = hexData.slice(2, 4);

    let val1 = parseInt(hex1, 16);
    let val2 = parseInt(hex2, 16);

    let result = 10 * (256 * val1 + val2);

    // console.log("fuel rail gauge pressure in kilo pascaluel_rail_pressure " + result + "kPa");

    return `${result} kPa`;
  }

  //pid-[24 to 29] and pid-[2A and 2B]

  calculate_oxygen_sensor_ratio_voltage(hexData) {
    let hex1 = hexData.slice(0, 2);
    let hex2 = hexData.slice(2, 4);

    let val1 = parseInt(hex1, 16);
    let val2 = parseInt(hex2, 16);

    let result = (2 / 65536) * (256 * val1 + val2);

    // console.log("oxygen sensor voltage ratio " + result + "V");

    return `${result} V`;
  }

  //pid-[2C]

  calculate_commanded_EGR(hexData) {
    let hex1 = hexData.slice(0, 2);

    let val1 = parseInt(hex1, 16);

    let result = (100 / 255) * val1;

    // console.log("commanded EGR in percentage" + result + "%") ;

    return `${result} %`;
  }

  //pid-[2D]

  calculate_EGR_Error(hexData) {
    let hex1 = hexData.slice(0, 2);

    let val1 = parseInt(hex1, 16);

    let result = (100 / 128) * val1 - 100;

    // console.log("commanded EGR in percentage" + result + "%") ;

    return `${result} %`;
  }

  //pid-[2E]

  // Commanded evaporative purge

  calculate_commanded_evaporative_purge(hexData) {
    let hex1 = hexData.slice(0, 2);

    let val1 = parseInt(hex1, 16);

    let result = (100 / 255) * val1;

    // console.log("commanded Evaporative purge in percentage" + result + "%") ;

    return `${result} %`;
  }

  //pid-[2F]

  calculate_fuel_tank_level_input(hexData) {
    let hex1 = hexData.slice(0, 2);

    let val1 = parseInt(hex1, 16);

    let result = (100 / 255) * val1;

    // console.log("Fuel Tank Level Input in percentage" + result + "%") ;

    return `${result} %`;
  }

  //pid-[30]

  calculate_warm_ups_since_code_cleared(hexData) {
    let hex1 = hexData.slice(0, 2);

    let val1 = parseInt(hex1, 16);

    let result = val1;

    return `${result} Counts`;
  }

  //pid-[31]

  calculate_distance_traveled_since_codes_cleared(hexData) {
    let hex1 = hexData.slice(0, 2);
    let hex2 = hexData.slice(2, 4);

    let val1 = parseInt(hex1, 16);
    let val2 = parseInt(hex2, 16);
    let result = 256 * val1 + val2;

    // console.log("distance travelled since codes cleared in kilometer" + result +"km");

    return `${result} km`;
  }

  //pid-[32]

  calculate_Evap_system_vapour_pressure(hexData) {
    let hex1 = hexData.slice(0, 2);
    let hex2 = hexData.slice(2, 4);

    let val1 = parseInt(hex1, 16);
    let val2 = parseInt(hex2, 16);
    let result = (256 * val1 + val2) / 4;

    // console.log("Evap system vapour pressure in pascal" + result +"Pa");

    return `${result} Pa`;
  }

  //pid-[33]

  calculate_absolute_barometric_pressure(hexData) {
    let hex1 = hexData.slice(0, 2);

    let val1 = parseInt(hex1, 16);
    let result = val1;

    // console.log("Absolute Barometric Pressure" + result +"kPa");

    return `${result} kPa`;
  }

  //pid-[34 to 39] and pid-[3A and 3B]

  calculate_oxygen_sensor_ratio_current(hexData) {
    let hex1 = hexData.slice(0, 2);
    let hex2 = hexData.slice(2, 4);

    let val1 = parseInt(hex1, 16);
    let val2 = parseInt(hex2, 16);

    let result = (2 / 65536) * (256 * val1 + val2);
    return `${result} mA`;
  }

  // pid-[3C and 3F]

  calculate_catalyst_temperature(hexData) {
    let hex1 = hexData.slice(0, 2);
    let hex2 = hexData.slice(2, 4);

    let val1 = parseInt(hex1, 16);
    let val2 = parseInt(hex2, 16);

    let result = (256 * val1 + val2) / 10 - 40;
    return `${result} c`;
  }

  //========================================================================================================// PID 41 TO 60

  monitor_status_this_drive_cycle(hexData) {
    let hex1 = hexData.slice(0, 8);
    let val1 = parseInt(hex1, 16);
    let result = val1;
    return `${result} Encoded`;
  }

  calControlModuleVoltage(hexData) {
    let hexA = hexData.slice(0, 2);
    let hexB = hexData.slice(2, 4);

    let A = parseInt(hexA, 16);
    let B = parseInt(hexB, 16);

    let result = (256 * A + B) / 1000;
    return `${result} V`;
  }

  calAbsoluteLoadValue(hexData) {
    let hexA = hexData.slice(0, 2);
    let hexB = hexData.slice(2, 4);

    let A = parseInt(hexA, 16);
    let B = parseInt(hexB, 16);

    let result = (100 / 255) * (256 * A + B);
    return `${result} %`;
  }

  calCommandedAirFuelEquivalence(hexData) {
    let hexA = hexData.slice(0, 2);
    let hexB = hexData.slice(2, 4);

    let A = parseInt(hexA, 16);
    let B = parseInt(hexB, 16);

    let result = (2 / 65536) * (256 * A + B);
    return `${result} ratio`;
  }

  calRelativeThrottleposition(hexData) {
    let hexA = hexData.slice(0, 2);

    let A = parseInt(hexA, 16);

    let result = (100 / 255) * A;
    return `${result} %`;
  }

  calAmbientAirTemperature(hexData) {
    let hexA = hexData.slice(0, 2);

    let A = parseInt(hexA, 16);
    let result = A - 40;
    return `${result} °C`;
  }

  // method for PIDs 47 - 4C
  calAbsoluteThrottlePosition(hexData) {
    let hexA = hexData.slice(0, 2);

    let A = parseInt(hexA, 16);

    let result = (100 / 255) * A;
    return `${result} %`;
  }

  calTimeRunWithMIL(hexData) {
    let hexA = hexData.slice(0, 2);
    let hexB = hexData.slice(2, 4);

    let A = parseInt(hexA, 16);
    let B = parseInt(hexB, 16);

    let result = 256 * A + B;
    return `${result} min`;
  }

  calTimeSinceDtcCleared(hexData) {
    let hexA = hexData.slice(0, 2);
    let hexB = hexData.slice(2, 4);

    let A = parseInt(hexA, 16);
    let B = parseInt(hexB, 16);

    let result = 256 * A + B;
    return `${result} min`;
  }

  calMaxFuelAirEquiv(hexData) {
    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);

    let result = A;
    return `${result} ratio`;
  }

  calMaxAirFlowRate(hexData) {
    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);

    let result = A * 10;
    return `${result} g/s`;
  }

  calFuelType(hexData) {
    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);

    let result = A;
    return `${result} encoded`;
  }

  calEthanolFuelPercentage(hexData) {
    let hexA = hexData.slice(0, 2);

    let A = parseInt(hexA, 16);

    let result = (100 / 255) * A;
    return `${result} %`;
  }

  calAbsoluteEvapSystemVaporPressure(hexData) {
    let hexA = hexData.slice(0, 2);
    let hexB = hexData.slice(2, 4);

    let A = parseInt(hexA, 16);
    let B = parseInt(hexB, 16);

    let result = (256 * A + B) / 200;
    return `${result} kPa`;
  }

  calEvapSystemVaporPressure(hexData) {
    let hexA = hexData.slice(0, 2);
    let hexB = hexData.slice(2, 4);

    let A = parseInt(hexA, 16);
    let B = parseInt(hexB, 16);

    let result = 256 * A + B;
    return `${result} Pa`;
  }
  // method for PIDs 55 - 58
  calShortTermSecondaryOxygenSensorTrim(hexData) {
    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);

    let result = (100 / 128) * A - 100;
    return `${result} %`;
  }

  calFuelRailAbsolutePressure(hexData) {
    let hexA = hexData.slice(0, 2);
    let hexB = hexData.slice(2, 4);

    let A = parseInt(hexA, 16);
    let B = parseInt(hexB, 16);

    let result = 10 * (256 * A + B);
    return `${result} kPa`;
  }

  calRelativeAcceleratorPedalPosition(hexData) {
    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);

    let result = (100 / 255) * A;
    return `${result} %`;
  }

  calHybridBatteryPackRemainingLife(hexData) {
    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);

    let result = (100 / 255) * A;
    return `${result} %`;
  }

  calEngineOilTemperature(hexData) {
    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);

    let result = A - 40;
    return `${result} °C`;
  }

  calFuelInjectionTiming(hexData) {
    let hexA = hexData.slice(0, 2);
    let hexB = hexData.slice(2, 4);

    let A = parseInt(hexA, 16);
    let B = parseInt(hexB, 16);

    let result = (256 * A + B) / 128;
    return `${result} °`;
  }

  calEngineFuelRate(hexData) {
    let hexA = hexData.slice(0, 2);
    let hexB = hexData.slice(2, 4);

    let A = parseInt(hexA, 16);
    let B = parseInt(hexB, 16);

    let result = (256 * A + B) / 20;
    return `${result} L/h`;
  }

  calEmissionRequirements(hexData) {
    let hexA = hexData.slice(0, 2);
    let A = parseInt(hexA, 16);

    let result = A;
    return `${result} encoded`;
  }

  //=============================================================================================//  PID 81 TO C8

  // pid-[8D]
  calculate_throtle_position_G(hexData) {
    let hex1 = hexData.slice(0, 2);
    let val1 = parseInt(hex1, 16);

    let result = (1 / 2.55) * val1;

    return `${result} %`;
  }

  // pid-[8E]
  calculate_engine_friction_torque(hexData) {
    let hex1 = hexData.slice(0, 2);
    let val1 = parseInt(hex1, 16);

    let result = val1 - 125;

    return `${result} %`;
  }

  // pid-[A2]
  calculate_cylinder_fuel_rate(hexData) {
    let hex1 = hexData.slice(0, 2);
    let hex2 = hexData.slice(2, 4);

    let val1 = parseInt(hex1, 16);
    let val2 = parseInt(hex2, 16);

    let result = (256 * val1 + val2) / 32;

    return `${result} mg/stroke`;
  }

  // pid-[A4]
  calculate_transmission_actual_gear(hexData) {
    let hex1 = hexData.slice(0, 2);
    let hex2 = hexData.slice(2, 4);

    let val1 = parseInt(hex1, 16);
    let val2 = parseInt(hex2, 16);

    let result = (256 * val1 + val2) / 1000;

    return `${result} ratio`;
  }

  // pid-[A5]
  calculate_commanded_diesel_exhaust_fluid_dosing(hexData) {
    let hex1 = hexData.slice(0, 2);

    let val1 = parseInt(hex1, 16);
    let result = val1 / 2;

    return `${result} %`;
  }

  // pid-[A6]

  calculate_odometer(hexData) {
    let hex1 = hexData.slice(0, 2);
    let hex2 = hexData.slice(2, 4);
    let hex3 = hexData.slice(4, 6);
    let hex4 = hexData.slice(6, 8);

    let val1 = parseInt(hex1, 16);
    let val2 = parseInt(hex2, 16);
    let val3 = parseInt(hex3, 16);
    let val4 = parseInt(hex4, 16);

    let result =
      (val1 * Math.pow(2, 24) +
        val2 * Math.pow(2, 16) +
        val3 * Math.pow(2, 8) +
        val4) /
      10;

    return `${result} km`;
  }
}
