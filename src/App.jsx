import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import DiseaseDetailPage from "./pages/DiseaseDetailPage";
import DiseasesPage from "./pages/DiseasesPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignupPage from "./pages/SignupPage";
import ScrollToTop from "./components/common/ScrollToTop";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardOverviewPage from "./pages/dashboard/DashboardOverviewPage";
import MyDogsPage from "./pages/dashboard/MyDogsPage";
import DogProfilePage from "./pages/dashboard/DogProfilePage";
import AddDogPage from "./pages/dashboard/AddDogPage";
import EditDogPage from "./pages/dashboard/EditDogPage";
import PredictDiseasePage from "./pages/dashboard/PredictDiseasePage";
import PredictionHistoryPage from "./pages/dashboard/PredictionHistoryPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import EditProfilePage from "./pages/dashboard/EditProfilePage";
import ChangePasswordPage from "./pages/dashboard/ChangePasswordPage";

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
    return <Navigate replace to="/dashboard/overview" />;
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
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="overview" />} />
          <Route path="overview" element={<DashboardOverviewPage />} />
          <Route path="dogs" element={<MyDogsPage />} />
          <Route path="dogs/add" element={<AddDogPage />} />
          <Route path="dogs/:id" element={<DogProfilePage />} />
          <Route path="dogs/edit/:id" element={<EditDogPage />} />
          <Route path="predict-disease" element={<PredictDiseasePage />} />
          <Route
            path="prediction-history"
            element={<PredictionHistoryPage />}
          />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/edit" element={<EditProfilePage />} />
          <Route path="profile/password" element={<ChangePasswordPage />} />
          <Route path="*" element={<Navigate replace to="overview" />} />
        </Route>
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
