import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoveCallModal from "./components/LoveCallModal";
import { AppProvider, useApp } from "./context/AppContext";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import OnboardingPage from "./pages/OnboardingPage";
import ProblemsPage from "./pages/ProblemsPage";
import QuizMode from "./pages/QuizMode";
import StudyApp from "./pages/StudyApp";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

function AppRouter() {
  const { page } = useApp();

  return (
    <>
      {page === "landing" && <LandingPage />}
      {page === "onboarding" && <OnboardingPage />}
      {page === "study" && <StudyApp />}
      {page === "quiz" && <QuizMode />}
      {page === "problems" && <ProblemsPage />}
      {page === "dashboard" && <DashboardPage />}
      <LoveCallModal />
      <Toaster />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </QueryClientProvider>
  );
}
