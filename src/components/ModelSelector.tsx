
import React from 'react';
import { cn } from '@/lib/utils';
import { Check, Zap, Target, AlertTriangle, Cpu } from 'lucide-react';
import { availableModels } from '@/utils/plateDetection';

interface ModelSelectorProps {
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
  className?: string;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ 
  selectedModel, 
  onSelectModel,
  className
}) => {
  return (
    <div className={cn("w-full", className)}>
      <h3 className="text-lg font-medium mb-3">Select Detection Model</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {availableModels.map((model) => {
          const isSelected = selectedModel === model.id;
          
          let SpeedIcon = Zap;
          let speedColor = "text-yellow-500";
          
          if (model.speed === "Very Fast") {
            SpeedIcon = Zap;
            speedColor = "text-emerald-500";
          } else if (model.speed === "Fast") {
            SpeedIcon = Zap;
            speedColor = "text-green-500";
          } else if (model.speed === "Medium") {
            SpeedIcon = Cpu;
            speedColor = "text-yellow-500";
          } else {
            SpeedIcon = Cpu;
            speedColor = "text-orange-500";
          }
          
          let AccuracyIcon = Target;
          let accuracyColor = "text-yellow-500";
          
          if (model.accuracy === "Very High") {
            AccuracyIcon = Target;
            accuracyColor = "text-emerald-500";
          } else if (model.accuracy === "High") {
            AccuracyIcon = Target;
            accuracyColor = "text-green-500";
          } else if (model.accuracy === "Medium") {
            AccuracyIcon = Target;
            accuracyColor = "text-yellow-500";
          } else {
            AccuracyIcon = AlertTriangle;
            accuracyColor = "text-orange-500";
          }
          
          return (
            <div
              key={model.id}
              className={cn(
                "relative flex flex-col p-4 rounded-xl border transition-all cursor-pointer",
                "hover:border-primary/50 hover:shadow-sm",
                isSelected 
                  ? "border-primary bg-primary/5 shadow-sm" 
                  : "border-gray-200 bg-white"
              )}
              onClick={() => onSelectModel(model.id)}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
              
              <h4 className="font-medium text-base">{model.name}</h4>
              <p className="text-sm text-muted-foreground mt-1 mb-3 line-clamp-2">
                {model.description}
              </p>
              
              <div className="mt-auto flex items-center justify-between text-xs">
                <div className={cn("flex items-center gap-1", speedColor)}>
                  <SpeedIcon className="h-3 w-3" />
                  <span>{model.speed}</span>
                </div>
                
                <div className={cn("flex items-center gap-1", accuracyColor)}>
                  <AccuracyIcon className="h-3 w-3" />
                  <span>{model.accuracy}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModelSelector;
