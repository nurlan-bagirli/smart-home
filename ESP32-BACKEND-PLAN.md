# Nurlan Home — ESP32 and push integration notes

This repository is a GitHub Pages frontend. GitHub Pages serves static files only; it does not run a database, a permanent collector, a push API, or background jobs.

## Current browser-side features
- Three-room dashboard using the existing LYWSD03MMC BLE readings.
- Room status tiles, stale-data/battery warnings, simple trend calculation, local Q&A, daily report, night appearance, and saved automation rule.
- PWA manifest, offline shell cache, and service-worker push/notification-click handlers.
- Browser localStorage history remains local to that browser/device.

## Required next step when ESP32 arrives
ESP32-WROOM-32 should scan/connect to the three Xiaomi BLE sensors, collect their values independently of any browser tab, then send JSON over Wi-Fi to a trusted HTTPS API. Example payload:

```json
{
  "gateway_id": "nurlan-home-esp32-01",
  "sent_at": "2026-10-10T20:00:00Z",
  "readings": [
    {"sensor_id":"kitchen","mac":"A4:C1:38:B4:D0:E2","temperature_c":24.5,"humidity_pct":52,"battery_mv":2930},
    {"sensor_id":"bedroom","mac":"A4:C1:38:59:70:FD","temperature_c":25.1,"humidity_pct":55,"battery_mv":2910},
    {"sensor_id":"living-room","mac":"A4:C1:38:D0:A6:F3","temperature_c":24.8,"humidity_pct":51,"battery_mv":2890}
  ]
}
```

The values above are examples of the API format, not real sensor readings.

## Backend requirements for actual 24/7 operation
1. HTTPS ingestion endpoint with device authentication and input validation.
2. Database tables for readings, room configuration, thresholds, alert state, and device heartbeat.
3. Server-side threshold checks, persistence/de-duplication, stale-sensor checks, and alert recovery messages.
4. Web Push subscription endpoint and VAPID keys held only on the server (never commit private keys to this repository).
5. Dashboard endpoint for latest readings/history and a secure configuration mechanism.

A service worker can display a push event, but it cannot create push messages on its own. Browser notifications in the existing page are not a substitute for server push and do not work as a guaranteed 24/7 collector. Choose a backend host and set its secrets before enabling remote alerts.

## Security
Do not expose a database service-role key, VAPID private key, Wi-Fi password, or a permanent ESP32 secret in frontend JavaScript or GitHub Pages. Use per-device credentials and HTTPS.
