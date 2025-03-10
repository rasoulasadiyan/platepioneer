
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { DetectionResult, PlateDetection } from '@/utils/plateDetection';
import { ArrowDown, ArrowUp, Clock, BarChart3, Percent } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface DetectionResultsProps {
  result: DetectionResult | null;
  className?: string;
}

const DetectionResults: React.FC<DetectionResultsProps> = ({ result, className }) => {
  const [selectedDetection, setSelectedDetection] = useState<PlateDetection | null>(null);
  const [highlightedDetection, setHighlightedDetection] = useState<PlateDetection | null>(null);
  
  useEffect(() => {
    if (result && result.detections.length > 0) {
      setSelectedDetection(result.detections[0]);
    } else {
      setSelectedDetection(null);
    }
  }, [result]);
  
  if (!result) {
    return null;
  }
  
  const { originalImage, detections, processingTime, modelName } = result;
  
  const handleDetectionClick = (detection: PlateDetection) => {
    setSelectedDetection(detection);
  };
  
  const handleDetectionMouseEnter = (detection: PlateDetection) => {
    setHighlightedDetection(detection);
  };
  
  const handleDetectionMouseLeave = () => {
    setHighlightedDetection(null);
  };

  return (
    <div className={cn("w-full my-8", className)}>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side - Image with bounding boxes */}
        <div className="w-full lg:w-3/5">
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden border border-gray-200">
            <img 
              src={originalImage} 
              alt="Analyzed vehicle" 
              className="w-full h-full object-cover"
            />
            
            {/* Draw bounding boxes */}
            {detections.map((detection, index) => {
              const isSelected = selectedDetection?.plateNumber === detection.plateNumber;
              const isHighlighted = highlightedDetection?.plateNumber === detection.plateNumber;
              const { x, y, width, height } = detection.box;
              
              return (
                <div
                  key={index}
                  className={cn(
                    "absolute border-2 transition-all cursor-pointer",
                    (isSelected || isHighlighted) 
                      ? "border-primary shadow-lg" 
                      : "border-yellow-400"
                  )}
                  style={{
                    left: `${x * 100}%`,
                    top: `${y * 100}%`,
                    width: `${width * 100}%`,
                    height: `${height * 100}%`,
                    boxShadow: (isSelected || isHighlighted) ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : 'none',
                  }}
                  onClick={() => handleDetectionClick(detection)}
                >
                  <div 
                    className={cn(
                      "absolute top-0 left-0 transform -translate-y-full px-2 py-1 text-xs font-medium rounded-t-md",
                      (isSelected || isHighlighted) ? "bg-primary text-white" : "bg-yellow-400 text-black"
                    )}
                  >
                    {detection.plateNumber}
                  </div>
                </div>
              );
            })}
            
            {detections.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                <div className="p-4 bg-white/90 backdrop-blur-sm rounded-lg text-center">
                  <p className="font-medium">No license plates detected</p>
                  <p className="text-sm text-muted-foreground mt-1">Try a different image or model</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Model info */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <Card className="w-full sm:w-1/2">
              <CardHeader className="py-4">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Processing Time
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-2xl font-semibold">{processingTime.toFixed(0)} ms</p>
              </CardContent>
            </Card>
            
            <Card className="w-full sm:w-1/2">
              <CardHeader className="py-4">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  Model Used
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-lg font-semibold truncate">{modelName}</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Right side - Detection details */}
        <div className="w-full lg:w-2/5">
          <h3 className="text-lg font-medium mb-3">Detection Results</h3>
          
          {detections.length === 0 ? (
            <Card>
              <CardContent className="py-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 flex items-center justify-center">
                  <ArrowUp className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-medium">No Plates Detected</h3>
                <p className="text-muted-foreground mt-2">
                  The selected model couldn't find any license plates in this image.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <p className="text-sm text-muted-foreground">
                  {detections.length} license plate{detections.length !== 1 ? 's' : ''} detected
                </p>
              </div>
              
              <div className="space-y-3">
                {detections.map((detection, index) => {
                  const isSelected = selectedDetection?.plateNumber === detection.plateNumber;
                  const confidencePercentage = Math.round(detection.confidence * 100);
                  
                  return (
                    <div
                      key={index}
                      className={cn(
                        "p-4 rounded-xl border transition-all cursor-pointer",
                        "hover:border-primary/50 hover:shadow-sm",
                        isSelected 
                          ? "border-primary bg-primary/5 shadow-sm" 
                          : "border-gray-200 bg-white"
                      )}
                      onClick={() => handleDetectionClick(detection)}
                      onMouseEnter={() => handleDetectionMouseEnter(detection)}
                      onMouseLeave={handleDetectionMouseLeave}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-mono text-xl font-bold">{detection.plateNumber}</h4>
                        <div
                          className={cn(
                            "text-xs font-medium px-2 py-1 rounded-full",
                            confidencePercentage >= 90 
                              ? "bg-green-100 text-green-800" 
                              : confidencePercentage >= 70 
                              ? "bg-yellow-100 text-yellow-800" 
                              : "bg-orange-100 text-orange-800"
                          )}
                        >
                          {confidencePercentage}% confidence
                        </div>
                      </div>
                      
                      <Progress 
                        value={confidencePercentage} 
                        className={cn(
                          "h-2",
                          confidencePercentage >= 90 
                            ? "bg-green-100" 
                            : confidencePercentage >= 70 
                            ? "bg-yellow-100" 
                            : "bg-orange-100"
                        )}
                        indicatorClassName={cn(
                          confidencePercentage >= 90 
                            ? "bg-green-500" 
                            : confidencePercentage >= 70 
                            ? "bg-yellow-500" 
                            : "bg-orange-500"
                        )}
                      />
                      
                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Percent className="h-3 w-3" />
                          <span>Confidence:</span>
                        </div>
                        <div className="font-medium">{(detection.confidence * 100).toFixed(1)}%</div>
                        
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <ArrowDown className="h-3 w-3" />
                          <span>Position:</span>
                        </div>
                        <div className="font-medium">
                          {Math.round(detection.box.x * 100)}%, {Math.round(detection.box.y * 100)}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetectionResults;
