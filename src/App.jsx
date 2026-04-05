import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import AboutPage from "./pages/AboutPage";
import FAQsPage from "./pages/FAQsPage";
import DiseaseDetailPage from "./pages/DiseaseDetailPage";
import DiseasesPage from "./pages/DiseasesPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ScrollToTop from "./components/common/ScrollToTop";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardOverviewPage from "./pages/dashboard/DashboardOverviewPage";
import MyDogsPage from "./pages/dashboard/MyDogsPage";
import DogProfilePage from "./pages/dashboard/DogProfilePage";
import AddDogPage from "./pages/dashboard/AddDogPage";
import EditDogPage from "./pages/dashboard/EditDogPage";
import PredictDiseasePage from "./pages/dashboard/PredictDiseasePage";
import PredictionResultPage from "./pages/dashboard/PredictionResultPage";
import PredictionHistoryPage from "./pages/dashboard/PredictionHistoryPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import EditProfilePage from "./pages/dashboard/EditProfilePage";
import ChangePasswordPage from "./pages/dashboard/ChangePasswordPage";

function ProtectedRoute({ children }) {
  const { isUserLoggedIn, isValidating } = useAuth();

  // While validating session, don't redirect yet
  if (isValidating) {
    return null; // or you can show a loading spinner here
  }

  if (!isUserLoggedIn) {
    return <Navigate replace to="/login" />;
  }

  return children;
}

function PublicOnlyRoute({ children }) {
  const { isUserLoggedIn, isValidating } = useAuth();

  // While validating, don't redirect yet
  if (isValidating) {
    return null;
  }

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
        <Route path="/faqs" element={<FAQsPage />} />
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
          <Route path="dogs/:dogId" element={<DogProfilePage />} />
          <Route path="dogs/edit/:dogId" element={<EditDogPage />} />
          <Route path="predict" element={<PredictDiseasePage />} />
          <Route path="predict/:dogId" element={<PredictDiseasePage />} />
          <Route
            path="prediction/:predictionId"
            element={<PredictionResultPage />}
          />
          <Route
            path="prediction-history"
            element={<PredictionHistoryPage />}
          />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/edit" element={<EditProfilePage />} />
          <Route path="profile/password" element={<ChangePasswordPage />} />
          <Route path="*" element={<Navigate replace to="overview" />} />
        </Route>
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
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
