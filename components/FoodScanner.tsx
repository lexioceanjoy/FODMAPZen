import React, { useState, useRef } from 'react';
import { analyzeImage } from '../services/geminiService';
import { ScanResult, FodmapStatus } from '../types';

const FoodScanner: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null); // Reset previous result
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      // Remove data URL prefix for API
      const base64Data = selectedImage.split(',')[1];
      const mimeType = selectedImage.split(';')[0].split(':')[1];
      
      const scanResult = await analyzeImage(base64Data, mimeType);
      setResult(scanResult);
    } catch (error) {
      console.error("Scan failed", error);
      alert("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetScanner = () => {
    setSelectedImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto rounded-2xl my-8 shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-sage-900 font-serif">Smart Food Scanner</h2>
        <p className="mt-4 text-gray-600">
          Upload a photo of a meal, ingredient, or package label. Our AI will analyze it against our Low FODMAP database.
        </p>
      </div>

      <div className="flex flex-col items-center space-y-6">
        {/* Upload Area */}
        <div 
          onClick={triggerFileInput}
          className={`w-full max-w-md h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors ${
            selectedImage ? 'border-sage-500 bg-sage-50' : 'border-gray-300 hover:border-sage-400 hover:bg-gray-50'
          }`}
        >
          {selectedImage ? (
            <img src={selectedImage} alt="Preview" className="h-full w-full object-contain rounded-xl" />
          ) : (
            <div className="text-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-gray-400 mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
              </svg>
              <p className="text-sm text-gray-500 font-medium">Click to upload or take a photo</p>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* Action Buttons */}
        {!result ? (
            <button
            onClick={handleScan}
            disabled={!selectedImage || isAnalyzing}
            className="w-full max-w-md rounded-full bg-sage-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-sage-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
            {isAnalyzing ? 'Scanning...' : 'Analyze Food'}
            </button>
        ) : (
             <button
            onClick={resetScanner}
            className="w-full max-w-md rounded-full bg-white border-2 border-sage-600 px-6 py-3 text-sage-700 font-bold shadow-md hover:bg-sage-50 transition-all"
            >
            Scan New Photo
            </button>
        )}

        {/* Results Area */}
        {result && (
          <div className="w-full max-w-md mt-8 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg animate-fade-in">
            <div className={`p-4 ${
              result.status === FodmapStatus.LOW ? 'bg-green-50 border-b border-green-100' : 
              result.status === FodmapStatus.HIGH ? 'bg-red-50 border-b border-red-100' : 'bg-yellow-50 border-b border-yellow-100'
            }`}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 capitalize">{result.identifiedFood}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                   result.status === FodmapStatus.LOW ? 'bg-green-200 text-green-800' : 
                   result.status === FodmapStatus.HIGH ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
                }`}>
                  {result.status}
                </span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700">{result.reasoning}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodScanner;