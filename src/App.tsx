import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import { lazy } from "react"

const Layout = lazy(() => (import("./components/Layout")));
const Dashboard = lazy(() => (import("./components/Dashboard")));
const Login = lazy(() => (import("./components/Login")));
const DronesList = lazy(() => (import("./components/DronesList")));
const OnlineDrones = lazy(() => (import("./components/OnlineDrones")));
const DangerousDrones = lazy(() => (import("./components/DangerousDrones")));
const FlightPathViewer = lazy(() => (import("./components/FlightPathViewer")));
const NearbyDrones = lazy(() => (import("./components/NearbyDrones")));

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
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
  )
}

export default App
