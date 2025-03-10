
import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Upload, ImageIcon, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded, className }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  }, []);

  const handleImageUpload = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }

    setIsLoading(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const imageUrl = e.target.result as string;
        setImage(imageUrl);
        onImageUploaded(imageUrl);
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        aria-label="Upload image"
      />
      
      {!image ? (
        <div
          className={cn(
            "flex flex-col items-center justify-center w-full h-64 md:h-80 rounded-2xl border-2 border-dashed transition-all duration-300 ease-in-out",
            "bg-secondary/50 hover:bg-secondary cursor-pointer",
            isDragging ? "border-primary bg-primary/5" : "border-gray-300",
            isLoading ? "opacity-70 pointer-events-none" : ""
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="w-14 h-14 mb-4 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-subtle">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-medium">Upload an image</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Drag and drop an image or click to browse
            </p>
            <Button variant="outline" className="mt-2 group">
              <ImageIcon className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
              Select Image
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-gray-200">
          <img 
            src={image} 
            alt="Uploaded vehicle" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
              <span className="text-white text-sm font-medium">Uploaded image</span>
              <Button
                variant="destructive"
                size="sm"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-0"
                onClick={(e) => {
                  e.stopPropagation();
                  clearImage();
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <p className="text-xs text-muted-foreground mt-2">
        Supported formats: JPG, PNG, GIF (max 5MB)
      </p>
    </div>
  );
};

export default ImageUploader;
