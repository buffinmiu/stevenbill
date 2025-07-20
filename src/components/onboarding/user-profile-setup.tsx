import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, UserCheck } from "lucide-react";

interface UserProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
}

export interface UserProfile {
  role: string;
  department: string;
  interests: string[];
  reportingLevel: string;
}

export function UserProfileSetup({ onComplete }: UserProfileSetupProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    role: "",
    department: "",
    interests: [],
    reportingLevel: ""
  });

  const roles = [
    { id: "ceo", label: "CEO", description: "Chief Executive Officer" },
    { id: "cfo", label: "CFO", description: "Chief Financial Officer" },
    { id: "vp-finance", label: "VP Finance", description: "Vice President of Finance" },
    { id: "director", label: "Director", description: "Finance Director" },
    { id: "controller", label: "Controller", description: "Financial Controller" },
    { id: "analyst", label: "Analyst", description: "Financial Analyst" },
    { id: "manager", label: "Manager", description: "Finance Manager" }
  ];

  const departments = [
    { id: "fp&a", label: "FP&A" },
    { id: "accounting", label: "Accounting" },
    { id: "treasury", label: "Treasury" },
    { id: "tax", label: "Tax" },
    { id: "audit", label: "Internal Audit" },
    { id: "corporate", label: "Other Corporate Finance" }
  ];

  const interests = [
    { id: "revenue", label: "Revenue Analysis" },
    { id: "profitability", label: "Profitability & Margins" },
    { id: "cash-flow", label: "Cash Flow Management" },
    { id: "budgeting", label: "Budgeting & Planning" },
    { id: "forecasting", label: "Financial Forecasting" },
    { id: "variance", label: "Variance Analysis" },
    { id: "kpis", label: "KPI Monitoring" },
    { id: "reporting", label: "Management Reporting" },
    { id: "scenario", label: "Scenario Planning" },
    { id: "investment", label: "Investment Analysis" }
  ];

  const reportingLevels = [
    { id: "executive", label: "Executive Level", description: "Company-wide view" },
    { id: "divisional", label: "Divisional Level", description: "Business unit focus" },
    { id: "departmental", label: "Departmental Level", description: "Department-specific" },
    { id: "project", label: "Project Level", description: "Specific projects/products" }
  ];

  const handleInterestChange = (interestId: string, checked: boolean) => {
    setProfile(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interestId]
        : prev.interests.filter(id => id !== interestId)
    }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(profile);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return profile.role !== "";
      case 2: return profile.department !== "";
      case 3: return profile.interests.length > 0;
      case 4: return profile.reportingLevel !== "";
      default: return false;
    }
  };

  const progress = (step / 4) * 100;

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="text-center mb-6 md:mb-8">
        <UserCheck className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-4" />
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Welcome to FP&A AI</h1>
        <p className="text-muted-foreground text-sm md:text-base">Let's customize your experience based on your role and interests</p>
      </div>

      <Progress value={progress} className="w-full" />

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>
            Step {step} of 4: {
              step === 1 ? "Your Role" :
              step === 2 ? "Your Department" :
              step === 3 ? "Your Interests" :
              "Reporting Scope"
            }
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <RadioGroup
              value={profile.role}
              onValueChange={(value) => setProfile(prev => ({ ...prev, role: value }))}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {roles.map((role) => (
                  <div key={role.id} className="flex items-center space-x-2 p-3 md:p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={role.id} id={role.id} />
                    <Label htmlFor={role.id} className="flex-1 cursor-pointer">
                      <div className="font-medium text-sm md:text-base">{role.label}</div>
                      <div className="text-xs md:text-sm text-muted-foreground">{role.description}</div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}

          {step === 2 && (
            <RadioGroup
              value={profile.department}
              onValueChange={(value) => setProfile(prev => ({ ...prev, department: value }))}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {departments.map((dept) => (
                  <div key={dept.id} className="flex items-center space-x-2 p-3 md:p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={dept.id} id={dept.id} />
                    <Label htmlFor={dept.id} className="flex-1 cursor-pointer">
                      <div className="font-medium text-sm md:text-base">{dept.label}</div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}

          {step === 3 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Select all areas that interest you (choose at least one):</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {interests.map((interest) => (
                    <div key={interest.id} className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <Checkbox
                        id={interest.id}
                        checked={profile.interests.includes(interest.id)}
                        onCheckedChange={(checked) => handleInterestChange(interest.id, checked as boolean)}
                      />
                      <Label htmlFor={interest.id} className="flex-1 cursor-pointer text-sm md:text-base">
                        {interest.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
          )}

          {step === 4 && (
            <RadioGroup
              value={profile.reportingLevel}
              onValueChange={(value) => setProfile(prev => ({ ...prev, reportingLevel: value }))}
            >
              <div className="space-y-4">
                {reportingLevels.map((level) => (
                  <div key={level.id} className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={level.id} id={level.id} />
                    <Label htmlFor={level.id} className="flex-1 cursor-pointer">
                      <div className="font-medium">{level.label}</div>
                      <div className="text-sm text-muted-foreground">{level.description}</div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}

          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-2"
            >
              {step < 4 ? "Next" : "Complete Setup"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}