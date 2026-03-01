import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import DashboardPage from "./pages/DashboardPage";
import DiseaseDetailPage from "./pages/DiseaseDetailPage";
import DiseasesPage from "./pages/DiseasesPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignupPage from "./pages/SignupPage";
import ScrollToTop from "./components/common/ScrollToTop";

function ProtectedRoute({ children }) {
  const { isUserLoggedIn } = useAuth();

  if (!isUserLoggedIn) {
    return <Navigate replace to="/login" />;
  }

  return children;
}

function PublicOnlyRoute({ children }) {
  const { isUserLoggedIn } = useAuth();

  if (isUserLoggedIn) {
    return <Navigate replace to="/dashboard" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/diseases" element={<DiseasesPage />} />
        <Route path="/diseases/:diseaseId" element={<DiseaseDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicOnlyRoute>
              <ResetPasswordPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <SignupPage />
            </PublicOnlyRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
