# OBD-II Data Analysis Electron App

## Overview

This Electron-based desktop application provides a user-friendly interface for analyzing OBD-II data from vehicles. It supports live data visualization, graph plotting, and detailed raw data analysis from CAN (Controller Area Network) bus communication, allowing users to gain insights into vehicle diagnostics and performance.

The app is built using [Electron](https://www.electronjs.org/), and integrates with `can-utils` to interact with vehicle CAN bus data. It is designed for automotive engineers, data analysts, and hobbyists interested in vehicle diagnostics.

---

## Features

- **OBD-II Data Analysis**: Connect to an OBD-II compatible device and retrieve diagnostic data.
- **Real-Time Graph Plotting**: Visualize live data such as RPM, speed, fuel levels, and more.
- **Raw Data Capture**: Capture and decode raw CAN bus data for detailed analysis.
- **Customizable Graphs**: Customize data plots with different axes, time frames, and filters.
- **Data Export**: Save raw and processed data to CSV format for offline analysis.
- **Platform Support**: Cross-platform support for Windows, Linux (Ubuntu), and macOS.

---

## Requirements

### Hardware:

- OBD-II device that supports CAN bus communication.
- PCAN USB adapters or compatible hardware.

### Software:

- **Node.js** (>= 14.x)
- **Electron** (>= 13.x)
- **can-utils**: Required for CAN communication on Linux systems.
- **Python 3** (optional): Required for advanced data analysis features.

---

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/varasheb/Test.git
cd obd2-electron-app
```
# can-tool
