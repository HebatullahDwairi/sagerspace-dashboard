
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

<img width="1920" height="947" alt="Screenshot from 2025-07-28 13-09-07-1" src="https://github.com/user-attachments/assets/b97c0a13-2be1-4609-a5ed-c140a065bd5d" />


<img width="1920" height="943" alt="Screenshot from 2025-07-28 13-08-18-1" src="https://github.com/user-attachments/assets/3148ad8c-1f0b-4dfc-9295-1d234157a3be" />

<img width="1920" height="945" alt="Screenshot from 2025-07-28 13-09-00-1" src="https://github.com/user-attachments/assets/1037f652-f0f0-46a2-86c6-e15b0d6dcd97" />

<img width="1920" height="943" alt="Screenshot from 2025-07-28 11-36-36-1" src="https://github.com/user-attachments/assets/6c6607dc-1fb7-46cb-b88c-ab4e7cc104d5" />


---


##  Built With

*  React + Vite + Typescript
*  Tailwind CSS
*  Mapbox with react-map-gl
*  MQTT.js
*  Axios

