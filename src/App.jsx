import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./InformativePage/components/theme-provider"
import { AuthProvider } from "@/AdministrativePage/hooks/useAuth.jsx"
// Informative Pages
import HomePage from "./InformativePage/pages/HomePage"
import MinisteriosPage from "./InformativePage/pages/MinisteriosPage"
import MinistryPage from "./InformativePage/pages/MinistryPage"
import EventosPage from "./InformativePage/pages/EventosPage"
import EventPage from "./InformativePage/pages/EventPage"
import PastoresPage from "./InformativePage/pages/PastoresPage"
import GaleriaPage from "./InformativePage/pages/GaleriaPage"
import ContactoPage from "./InformativePage/pages/ContactoPage"

// Informative Components
import Header from "./InformativePage/components/Header"
import Footer from "./InformativePage/components/Footer"

// Administrative Pages
import LoginPage from "./AdministrativePage/pages/LoginPage"
import AdminLayout from "./AdministrativePage/components/AdminLayout"
import ProtectedRoute from "./AdministrativePage/components/ProtectedRoute"
import DashboardPage from "./AdministrativePage/pages/admin/DashboardPage"
import EventsPage from "./AdministrativePage/pages/admin/EventsPage"
import MissionsPage from "./AdministrativePage/pages/admin/MissionsPage"
import ContactsPage from "./AdministrativePage/pages/admin/ContactsPage"
import UsersPage from "./AdministrativePage/pages/UsersPage"
import GalleryPage from "./AdministrativePage/pages/GalleryPage"
import DonationsPage from "./AdministrativePage/pages/DonationsPage"
import EmailPage from "./AdministrativePage/pages/EmailPage"
import SettingsPage from "./AdministrativePage/pages/SettingsPage"

import "./App.css"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Informative Routes */}
            <Route
              path="/"
              element={
                <div className="min-h-screen bg-white">
                  <Header />
                  <HomePage />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/ministerios"
              element={
                <div className="min-h-screen bg-white">
                  <Header />
                  <MinisteriosPage />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/ministerios/:slug"
              element={
                <div className="min-h-screen bg-white">
                  <Header />
                  <MinistryPage />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/eventos"
              element={
                <div className="min-h-screen bg-white">
                  <Header />
                  <EventosPage />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/eventos/:id"
              element={
                <div className="min-h-screen bg-white">
                  <Header />
                  <EventPage />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/pastores"
              element={
                <div className="min-h-screen bg-white">
                  <Header />
                  <PastoresPage />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/galeria"
              element={
                <div className="min-h-screen bg-white">
                  <Header />
                  <GaleriaPage />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/contacto"
              element={
                <div className="min-h-screen bg-white">
                  <Header />
                  <ContactoPage />
                  <Footer />
                </div>
              }
            />

            {/* Admin Login (pública) */}
            <Route path="/admin/login" element={<LoginPage />} />

            {/* Rutas Admin protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="dashboard"  element={<DashboardPage />} />
                <Route path="events"     element={<EventsPage />} />
                <Route path="missions"   element={<MissionsPage />} />
                <Route path="contacts"   element={<ContactsPage />} />
                <Route path="users"      element={<UsersPage />} />
                <Route path="gallery"    element={<GalleryPage />} />
                <Route path="donations"  element={<DonationsPage />} />
                <Route path="email"      element={<EmailPage />} />
                <Route path="settings"   element={<SettingsPage />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
