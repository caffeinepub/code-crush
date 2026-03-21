import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { PersonalityType } from "../data/companions";

export type AppPage = "landing" | "onboarding" | "study" | "quiz" | "problems";

export interface UserState {
  deviceId: string;
  username: string;
  email: string;
  password: string;
  xp: number;
  streak: number;
  level: number;
  badges: string[];
  companionName: string;
  personality: PersonalityType;
  isOnboarded: boolean;
  solvedProblems: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "companion";
  text: string;
  timestamp: number;
}

interface AppContextValue {
  page: AppPage;
  setPage: (p: AppPage) => void;
  user: UserState;
  setUser: (u: Partial<UserState>) => void;
  messages: ChatMessage[];
  addMessage: (msg: Omit<ChatMessage, "id" | "timestamp">) => void;
  clearMessages: () => void;
  activeTopic: string;
  setActiveTopic: (t: string) => void;
  showLoveCall: boolean;
  setShowLoveCall: (v: boolean) => void;
  frustrationCount: number;
  setFrustrationCount: (n: number) => void;
  xpFlash: number | null;
  setXpFlash: (v: number | null) => void;
  currentProblemId: string | null;
  setCurrentProblemId: (id: string | null) => void;
}

const DEFAULT_USER: UserState = {
  deviceId: "",
  username: "",
  email: "",
  password: "",
  xp: 0,
  streak: 1,
  level: 1,
  badges: [],
  companionName: "Sakura",
  personality: "encouraging",
  isOnboarded: false,
  solvedProblems: [],
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<AppPage>("landing");
  const [user, setUserState] = useState<UserState>(() => {
    try {
      const saved = localStorage.getItem("cc_user");
      if (saved) return { ...DEFAULT_USER, ...JSON.parse(saved) };
    } catch {}
    const deviceId = `device_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    return { ...DEFAULT_USER, deviceId };
  });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeTopic, setActiveTopic] = useState("Data Structures");
  const [showLoveCall, setShowLoveCall] = useState(false);
  const [frustrationCount, setFrustrationCount] = useState(0);
  const [xpFlash, setXpFlash] = useState<number | null>(null);
  const [currentProblemId, setCurrentProblemId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("cc_user", JSON.stringify(user));
    if (user.isOnboarded && page === "landing") setPage("study");
  }, [user, page]);

  const setUser = (updates: Partial<UserState>) => {
    setUserState((prev) => ({ ...prev, ...updates }));
  };

  const addMessage = (msg: Omit<ChatMessage, "id" | "timestamp">) => {
    setMessages((prev) => [
      ...prev,
      { ...msg, id: `${Date.now()}_${Math.random()}`, timestamp: Date.now() },
    ]);
  };

  const clearMessages = () => setMessages([]);

  return (
    <AppContext.Provider
      value={{
        page,
        setPage,
        user,
        setUser,
        messages,
        addMessage,
        clearMessages,
        activeTopic,
        setActiveTopic,
        showLoveCall,
        setShowLoveCall,
        frustrationCount,
        setFrustrationCount,
        xpFlash,
        setXpFlash,
        currentProblemId,
        setCurrentProblemId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
