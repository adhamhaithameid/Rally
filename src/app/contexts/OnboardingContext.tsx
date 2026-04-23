import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface OnboardingContextType {
  isActive: boolean;
  currentStep: number;
  totalSteps: number;
  startOnboarding: () => void;
  nextStep: () => void;
  previousStep: () => void;
  skipOnboarding: () => void;
  completeOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const ONBOARDING_STORAGE_KEY = 'rally-onboarding-completed';

interface OnboardingProviderProps {
  children: ReactNode;
  totalSteps: number;
  autoStart?: boolean;
}

export function OnboardingProvider({ children, totalSteps, autoStart = true }: OnboardingProviderProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompleted = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (!hasCompleted && autoStart) {
      // Small delay to let the page render first
      setTimeout(() => setIsActive(true), 500);
    }
  }, [autoStart]);

  const startOnboarding = () => {
    setCurrentStep(0);
    setIsActive(true);
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipOnboarding = () => {
    setIsActive(false);
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
  };

  const completeOnboarding = () => {
    setIsActive(false);
    setCurrentStep(0);
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
  };

  return (
    <OnboardingContext.Provider
      value={{
        isActive,
        currentStep,
        totalSteps,
        startOnboarding,
        nextStep,
        previousStep,
        skipOnboarding,
        completeOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}

// Helper function to reset onboarding (useful for testing)
export function resetOnboarding() {
  localStorage.removeItem(ONBOARDING_STORAGE_KEY);
}