import { BarChart3, Clock3 } from 'lucide-react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/routing/ProtectedRoute'
import ComingSoon from './pages/ComingSoon'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/overview" element={<ProtectedRoute><ComingSoon title="Overview" description="Deeper reports and team-level insights will live here in a future release." icon={BarChart3} /></ProtectedRoute>} />
      <Route path="/timer" element={<ProtectedRoute><ComingSoon title="Timer" description="A focused live timer is planned for a future release. Time entries remain available from the dashboard." icon={Clock3} /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
