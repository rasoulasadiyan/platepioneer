
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageUploader from '@/components/ImageUploader';
import ModelSelector from '@/components/ModelSelector';
import DetectionResults from '@/components/DetectionResults';
import { detectPlates, availableModels, DetectionResult } from '@/utils/plateDetection';
import { createScrollAnimations } from '@/utils/animations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ShieldCheck, Globe, BarChart3, ArrowDown } from 'lucide-react';

const Index = () => {
  const [selectedModel, setSelectedModel] = useState(availableModels[0].id);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Animate elements on scroll
  useEffect(() => {
    const cleanup = createScrollAnimations();
    return cleanup;
  }, []);

  const handleImageUploaded = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setDetectionResult(null);
    
    toast({
      title: "Image uploaded",
      description: "Click 'Detect License Plates' to analyze the image.",
    });
  };

  const handleSelectModel = (modelId: string) => {
    setSelectedModel(modelId);
    
    if (detectionResult) {
      toast({
        title: "Model changed",
        description: "Click 'Detect License Plates' to re-analyze with the new model.",
      });
    }
  };

  const handleDetectPlates = async () => {
    if (!uploadedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const result = await detectPlates(uploadedImage, selectedModel);
      setDetectionResult(result);
    } catch (error) {
      toast({
        title: "Detection failed",
        description: "An error occurred during processing.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-60" />
        <div className="container mx-auto relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            <div className="inline-block mb-6">
              <span className="inline-flex items-center rounded-full px-4 py-1 text-xs font-medium bg-primary/10 text-primary">
                License Plate Recognition Demo
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Next-Generation License Plate Detection
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience cutting-edge license plate recognition technology with our interactive demo.
              Upload an image, select a model, and see the results in real-time.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <motion.a
                href="#demo"
                className="inline-flex items-center justify-center rounded-full px-8 py-3 font-medium bg-primary text-white shadow-lg hover:bg-primary/90 transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Try the Demo
              </motion.a>
              <motion.a
                href="#features"
                className="inline-flex items-center justify-center rounded-full px-8 py-3 font-medium bg-gray-100 text-gray-900 hover:bg-gray-200 transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.a>
            </div>
            <div className="flex justify-center mt-12">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowDown className="h-6 w-6 text-gray-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our license plate recognition system offers cutting-edge capabilities for a variety of applications.
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Real-time Processing</CardTitle>
                  <CardDescription>
                    Process video streams and images with minimal latency for immediate results.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Our optimized models can process up to 30 frames per second on standard hardware.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Global Plate Support</CardTitle>
                  <CardDescription>
                    Recognize and parse license plates from multiple countries and formats.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Supports over 100 different license plate formats from around the world.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Privacy Focused</CardTitle>
                  <CardDescription>
                    Process all data locally without sending sensitive information to the cloud.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Edge-based processing ensures your data never leaves your device.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Advanced Analytics</CardTitle>
                  <CardDescription>
                    Generate insights and reports from processed license plate data.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Track vehicle patterns, frequency, and other metrics for business intelligence.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Demo Section */}
      <section id="demo" className="w-full py-12 md:py-24">
        <div className="container px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive Demo</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Try our license plate recognition technology with your own images.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="fade-in-scroll">
                <ImageUploader onImageUploaded={handleImageUploaded} />
              </div>
              
              <div className="fade-in-scroll">
                <ModelSelector 
                  selectedModel={selectedModel}
                  onSelectModel={handleSelectModel}
                />
                
                <div className="mt-6">
                  <button
                    className="w-full py-3 px-4 rounded-xl bg-primary text-white font-medium 
                              hover:bg-primary/90 transition-colors disabled:opacity-70 
                              disabled:cursor-not-allowed"
                    onClick={handleDetectPlates}
                    disabled={!uploadedImage || isProcessing}
                  >
                    {isProcessing 
                      ? "Processing..." 
                      : "Detect License Plates"
                    }
                  </button>
                </div>
              </div>
            </div>
            
            {detectionResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <DetectionResults result={detectionResult} />
              </motion.div>
            )}
          </div>
        </div>
      </section>
      
      {/* Documentation Section */}
      <section id="documentation" className="w-full py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Documentation & Resources</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn more about our license plate recognition technology and how to integrate it into your applications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="fade-in-scroll">
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>
                  Comprehensive guide to integrating our API
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a 
                  href="#" 
                  className="text-primary hover:underline inline-flex items-center"
                >
                  View Documentation
                  <ArrowDown className="ml-2 h-4 w-4 rotate-270" />
                </a>
              </CardContent>
            </Card>
            
            <Card className="fade-in-scroll">
              <CardHeader>
                <CardTitle>SDK Downloads</CardTitle>
                <CardDescription>
                  Ready-to-use libraries for various platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a 
                  href="#" 
                  className="text-primary hover:underline inline-flex items-center"
                >
                  Download SDKs
                  <ArrowDown className="ml-2 h-4 w-4 rotate-270" />
                </a>
              </CardContent>
            </Card>
            
            <Card className="fade-in-scroll">
              <CardHeader>
                <CardTitle>Code Samples</CardTitle>
                <CardDescription>
                  Example implementations in various languages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a 
                  href="#" 
                  className="text-primary hover:underline inline-flex items-center"
                >
                  View Examples
                  <ArrowDown className="ml-2 h-4 w-4 rotate-270" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
