import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Brain } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [dots, setDots] = useState("");

  const steps = [
    "Thinking",
    "Retrieving data",
    "Analyzing data"
  ];

  // Animate dots
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev === "...") return ".";
        if (prev === "..") return "...";
        if (prev === ".") return "..";
        return ".";
      });
    }, 300);

    return () => clearInterval(dotsInterval);
  }, []);

  // Progress through steps
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setTimeout(() => onComplete(), 800);
          return prev;
        }
      });
    }, 1200);

    return () => clearInterval(stepInterval);
  }, [onComplete, steps.length]);

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elegant animate-scale-in">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="h-16 w-16 mx-auto rounded-full bg-gradient-primary flex items-center justify-center mb-4 animate-pulse-glow">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Processing Request
            </h2>
            <p className="text-muted-foreground text-sm">
              Please wait while we prepare your dashboard
            </p>
          </div>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                  index === currentStep
                    ? "bg-primary/10 border border-primary/20"
                    : index < currentStep
                    ? "bg-success/10 border border-success/20"
                    : "bg-muted/50"
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    index === currentStep
                      ? "text-primary"
                      : index < currentStep
                      ? "text-success"
                      : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>
                
                <div className="flex items-center gap-2">
                  {index < currentStep && (
                    <div className="h-2 w-2 rounded-full bg-success animate-scale-in" />
                  )}
                  {index === currentStep && (
                    <span className="text-primary font-mono text-sm min-w-[24px] text-right">
                      {dots}
                    </span>
                  )}
                  {index > currentStep && (
                    <div className="h-2 w-2 rounded-full bg-muted" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-gradient-primary h-2 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}