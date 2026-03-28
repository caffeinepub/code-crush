import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoveCallModal from "./components/LoveCallModal";
import { AppProvider, useApp } from "./context/AppContext";
import CodeVisualizationPage from "./pages/CodeVisualizationPage";
import DashboardPage from "./pages/DashboardPage";
import EventsPage from "./pages/EventsPage";
import LandingPage from "./pages/LandingPage";
import OnboardingPage from "./pages/OnboardingPage";
import ProblemsPage from "./pages/ProblemsPage";
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
      {page === "problems" && <ProblemsPage />}
      {page === "dashboard" && <DashboardPage />}
      {page === "events" && <EventsPage />}
      {page === "code-visualizer" && <CodeVisualizationPage />}
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
