import { ReactNode, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { useOnboarding } from '../../contexts/OnboardingContext';

interface CoachMarkProps {
  step: number;
  title: string;
  description: string;
  targetId?: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  children?: ReactNode;
}

export function CoachMark({ step, title, description, targetId, position = 'center' }: CoachMarkProps) {
  const { isActive, currentStep, nextStep, previousStep, skipOnboarding, totalSteps } = useOnboarding();
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && currentStep === step && targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Scroll target into view smoothly
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [isActive, currentStep, step, targetId]);

  if (!isActive || currentStep !== step) {
    return null;
  }

  const getTooltipPosition = () => {
    if (!targetId) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

    const targetElement = document.getElementById(targetId);
    if (!targetElement) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

    const rect = targetElement.getBoundingClientRect();
    const tooltipWidth = 360; // Approximate width
    const tooltipHeight = 200; // Approximate height
    const spacing = 16;

    switch (position) {
      case 'top':
        return {
          top: `${rect.top - tooltipHeight - spacing}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: 'translateX(-50%)',
        };
      case 'bottom':
        return {
          top: `${rect.bottom + spacing}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: 'translateX(-50%)',
        };
      case 'left':
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.left - tooltipWidth - spacing}px`,
          transform: 'translateY(-50%)',
        };
      case 'right':
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.right + spacing}px`,
          transform: 'translateY(-50%)',
        };
      default:
        return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  const getSpotlightPosition = () => {
    if (!targetId) return null;

    const targetElement = document.getElementById(targetId);
    if (!targetElement) return null;

    const rect = targetElement.getBoundingClientRect();
    const padding = 8;

    return {
      top: `${rect.top - padding}px`,
      left: `${rect.left - padding}px`,
      width: `${rect.width + padding * 2}px`,
      height: `${rect.height + padding * 2}px`,
    };
  };

  const spotlightStyle = getSpotlightPosition();

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-[9998] transition-opacity duration-300"
        onClick={skipOnboarding}
      />

      {/* Spotlight */}
      {spotlightStyle && (
        <div
          className="fixed z-[9999] pointer-events-none rounded-lg border-2 border-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.3)]"
          style={spotlightStyle}
        />
      )}

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed z-[10000] bg-card rounded-lg shadow-xl border border-border p-6 max-w-sm"
        style={getTooltipPosition()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                Step {step + 1} of {totalSteps}
              </span>
            </div>
            <h3 className="text-foreground">{title}</h3>
          </div>
          <button
            onClick={skipOnboarding}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close tour"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-6">{description}</p>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === step ? "bg-blue-600 dark:bg-blue-400" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {step > 0 && (
              <Button variant="outline" size="sm" onClick={previousStep}>
                Back
              </Button>
            )}
            <Button size="sm" onClick={nextStep}>
              {step === totalSteps - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>

        {/* Skip button */}
        <button
          onClick={skipOnboarding}
          className="text-xs text-muted-foreground hover:text-foreground mt-3 w-full text-center transition-colors"
        >
          Skip tour
        </button>
      </div>
    </>
  );
}