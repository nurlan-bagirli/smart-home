# Nurlan Home · Sensor Studio

A polished Azerbaijani smart-home dashboard prototype for Xiaomi Mi Temperature and Humidity Monitor 2 sensors and future ESP32 integrations.

## Current status

- Responsive dark/light dashboard UI
- Room cards for three Xiaomi BLE sensors
- Temperature trend chart (demo data)
- Demo comfort indicator, event log, scenario buttons
- CSV export for sample data
- No external libraries or build step required

**Important:** this first version is a UI prototype and uses sample values. GitHub Pages cannot directly scan arbitrary Xiaomi BLE advertisement packets. To display real readings, add a local gateway (for example, ESP32) and connect its data interface to the page.

## Publish with GitHub Pages

1. Open **Settings → Pages** for this repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **main** and folder **/(root)**, then press **Save**.
4. After GitHub finishes publishing, open the URL shown in Pages settings.

## Next development steps

1. Validate BLE advertisement format for each LYWSD03MMC sensor.
2. Build an ESP32 BLE-to-Wi-Fi data bridge.
3. Replace demo values with real readings.
4. Add persistent history and alerts.

Built as a personal learning project.
