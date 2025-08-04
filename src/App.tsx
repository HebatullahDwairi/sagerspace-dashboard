import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import { lazy } from "react"

const Layout = lazy(() => (import("./components/Layout")));
const Dashboard = lazy(() => (import("./pages/Dashboard")));
const Login = lazy(() => (import("./pages/Login")));
const DronesList = lazy(() => (import("./pages/DronesList")));
const OnlineDrones = lazy(() => (import("./pages/OnlineDrones")));
const DangerousDrones = lazy(() => (import("./pages/DangerousDrones")));
const FlightPathViewer = lazy(() => (import("./pages/FlightPathViewer")));
const NearbyDrones = lazy(() => (import("./pages/NearbyDrones")));

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />}/>
            <Route path="drones-list" element={<DronesList />}/>
            <Route path="online-drones"  element={<OnlineDrones />}/>
            <Route path="dangerous-drones"   element={<DangerousDrones />}/>
            <Route path="path-viewer"  element={<FlightPathViewer />}/>
            <Route path="nearby-drones"  element={<NearbyDrones />}/>
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
