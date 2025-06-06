"use client"

import type React from "react"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import type { User } from "@/lib/types"
import { ThemeProvider } from "next-themes"
import { AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

interface AppState {
  user: User | null
  isAuthenticated: boolean
  language: "az" | "en"
  theme: "light" | "dark" | "system"
  animationsEnabled: boolean
}

type AppAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_LANGUAGE"; payload: "az" | "en" }
  | { type: "SET_THEME"; payload: "light" | "dark" | "system" }
  | { type: "TOGGLE_ANIMATIONS" }
  | { type: "LOGOUT" }

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  language: "az",
  theme: "light",
  animationsEnabled: true,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      }
    case "SET_LANGUAGE":
      return {
        ...state,
        language: action.payload,
      }
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      }
    case "TOGGLE_ANIMATIONS":
      return {
        ...state,
        animationsEnabled: !state.animationsEnabled,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function Providers({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const pathname = usePathname()

  // Apply theme from state
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      dispatch({ type: "SET_THEME", payload: savedTheme as "light" | "dark" | "system" })
    }
  }, [])

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("theme", state.theme)
  }, [state.theme])

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) {
      dispatch({ type: "TOGGLE_ANIMATIONS" })
    }
  }, [])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <ThemeProvider attribute="class" defaultTheme={state.theme} enableSystem>
        <AnimatePresence mode="wait" initial={false}>
          <div key={pathname}>{children}</div>
        </AnimatePresence>
      </ThemeProvider>
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within Providers")
  }
  return context
}
