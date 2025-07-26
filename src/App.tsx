import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import DronesList from "./components/DronesList"
import OnlineDrones from "./components/OnlineDrones"
import DangerousDrones from "./components/DangerousDrones"
import FlightPathViewer from "./components/FlightPathViewer"
import NearbyDrones from "./components/NearbyDrones"
import { AuthProvider } from "./contexts/AuthContext"

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" index  element={<Dashboard />}/>
            <Route path="drones-list" index  element={<DronesList />}/>
            <Route path="online-drones" index  element={<OnlineDrones />}/>
            <Route path="dangerous-drones" index  element={<DangerousDrones />}/>
            <Route path="path-viewer" index  element={<FlightPathViewer />}/>
            <Route path="nearby-drones" index  element={<NearbyDrones />}/>
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
