
// Simulated license plate detection utility
// This would be replaced with an actual ML model in a production app

import { toast } from "@/components/ui/use-toast";

export interface DetectionBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PlateDetection {
  plateNumber: string;
  confidence: number;
  box: DetectionBox;
}

export interface DetectionResult {
  originalImage: string;
  detections: PlateDetection[];
  processingTime: number;
  modelName: string;
}

// Models available for selection
export const availableModels = [
  { 
    id: "fast-yolo", 
    name: "Fast YOLO v5", 
    description: "Optimized for speed with reasonable accuracy",
    speed: "Fast",
    accuracy: "Medium"
  },
  { 
    id: "accurate-yolo", 
    name: "Accurate YOLO v5", 
    description: "Balanced performance with higher precision",
    speed: "Medium",
    accuracy: "High"
  },
  { 
    id: "transformer", 
    name: "ALPR Transformer", 
    description: "Superior accuracy with transformer architecture",
    speed: "Slow",
    accuracy: "Very High"
  },
  { 
    id: "tiny-lpr", 
    name: "Tiny LPR", 
    description: "Extremely lightweight for edge devices",
    speed: "Very Fast",
    accuracy: "Low"
  }
];

// Generate random plate number
const generatePlateNumber = (): string => {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const numbers = "0123456789";
  
  // Format: AAA-1234 or AA-1234
  const format = Math.random() > 0.5 ? "AAA-NNNN" : "AA-NNNN";
  
  return format
    .replace(/A/g, () => letters.charAt(Math.floor(Math.random() * letters.length)))
    .replace(/N/g, () => numbers.charAt(Math.floor(Math.random() * numbers.length)));
};

// Get random value between min and max
const getRandomValue = (min: number, max: number): number => {
  return min + Math.random() * (max - min);
};

// Simulate plate detection with processing time based on model
export const detectPlates = (
  imageUrl: string,
  modelId: string
): Promise<DetectionResult> => {
  return new Promise((resolve) => {
    // Show loading toast
    toast({
      title: "Processing image",
      description: "Analyzing with the selected model...",
    });
    
    // Calculate processing time based on model
    let processingTime: number;
    let detectionCount: number;
    let confidenceRange: [number, number];
    
    switch (modelId) {
      case "fast-yolo":
        processingTime = getRandomValue(300, 700);
        detectionCount = Math.floor(getRandomValue(0, 3));
        confidenceRange = [0.65, 0.85];
        break;
      case "accurate-yolo":
        processingTime = getRandomValue(800, 1200);
        detectionCount = Math.floor(getRandomValue(1, 3));
        confidenceRange = [0.75, 0.92];
        break;
      case "transformer":
        processingTime = getRandomValue(1500, 2500);
        detectionCount = Math.floor(getRandomValue(1, 4));
        confidenceRange = [0.85, 0.98];
        break;
      case "tiny-lpr":
        processingTime = getRandomValue(200, 500);
        detectionCount = Math.floor(getRandomValue(0, 2));
        confidenceRange = [0.55, 0.75];
        break;
      default:
        processingTime = getRandomValue(800, 1200);
        detectionCount = Math.floor(getRandomValue(1, 3));
        confidenceRange = [0.75, 0.92];
    }
    
    // Simulate processing delay
    setTimeout(() => {
      // Generate detections
      const detections: PlateDetection[] = [];
      
      for (let i = 0; i < detectionCount; i++) {
        detections.push({
          plateNumber: generatePlateNumber(),
          confidence: getRandomValue(confidenceRange[0], confidenceRange[1]),
          box: {
            x: getRandomValue(0.1, 0.7), // Normalized coordinates (0-1)
            y: getRandomValue(0.4, 0.8),
            width: getRandomValue(0.15, 0.3),
            height: getRandomValue(0.05, 0.1)
          }
        });
      }
      
      // Resolve with detection results
      resolve({
        originalImage: imageUrl,
        detections,
        processingTime,
        modelName: availableModels.find(m => m.id === modelId)?.name || "Unknown Model"
      });
      
      // Show completion toast
      toast({
        title: "Analysis complete",
        description: `Found ${detections.length} license plate${detections.length !== 1 ? 's' : ''}.`,
      });
    }, processingTime);
  });
};
