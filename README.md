
# Real-Time Drone Dashboard
---

##  Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/HebatullahDwairi/sagerspace-dashboard.git
cd sagerspace-dashboard
````

### 2. Install dependencies

```bash
npm install
```

## Create .env

```env
# Base URL of the backend API
VITE_API_BASE_URL=http://localhost:8000/api

# token for accessing Mapbox
VITE_MAPBOX_TOKEN=your_token

# MQTT
VITE_MQTT_HOST=ws://localhost:8080         # MQTT broker WebSocket URL
VITE_MQTT_PORT=8080                        # MQTT broker port 
VITE_MQTT_USERNAME=username                # MQTT username
VITE_MQTT_PASSWORD=password                # MQTT password
VITE_MQTT_CLIENT_ID=sagerspace_dashboard   # Unique client ID for MQTT connection


```

### 4. Start dev server

```bash
npm run dev
```

App runs at: `http://localhost:5173`

---

## Notes

* Ensure the backend is running.
* The backend (Django + MQTT + REST API) is in a separate repo.
* Live location updates are handled through `mqtt.js`.


---


## Screenshots



---

##  Built With

*  React + Vite + Typescript
*  Tailwind CSS
*  Mapbox with react-map-gl
*  MQTT.js
*  Axios

```
