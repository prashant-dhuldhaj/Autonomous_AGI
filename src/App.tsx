import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { AGIInterface } from "./AGIInterface";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="sticky top-0 z-10 bg-black/20 backdrop-blur-sm h-16 flex justify-between items-center border-b border-purple-500/30 shadow-lg px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">🧠</span>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AGI Consciousness
          </h2>
        </div>
        <SignOutButton />
      </header>
      <main className="flex-1 p-4">
        <Content />
      </main>
      <Toaster />
    </div>
  );
}

function Content() {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <Authenticated>
        <AGIInterface />
      </Authenticated>
      <Unauthenticated>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <div className="text-center">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
              AGI Consciousness
            </h1>
            <p className="text-xl text-purple-200 mb-2">
              Artificial General Intelligence System
            </p>
            <p className="text-purple-300">
              Sign in to interact with the autonomous thinking system
            </p>
          </div>
          <div className="w-full max-w-md">
            <SignInForm />
          </div>
        </div>
      </Unauthenticated>
    </div>
  );
}
