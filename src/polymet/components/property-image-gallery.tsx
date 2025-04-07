"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { GridIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { groupImagesByCategory } from "../data/property-data";

interface PropertyImage {
  id: number;
  url: string;
  alt: string;
  category: string;
}

interface PropertyImageGalleryProps {
  images: PropertyImage[];
  title: string;
}

export default function PropertyImageGallery({
  images,
  title,
}: PropertyImageGalleryProps) {
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("");
  
  // States for mobile fullscreen view
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentCategoryImages, setCurrentCategoryImages] = useState<PropertyImage[]>([]);

  // Basic validation
  if (!images || images.length === 0) {
    return (
      <div className="relative w-full h-[300px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  // Use the new groupImagesByCategory function
  const groupedCategories = groupImagesByCategory(images);
  const categories = groupedCategories.map(group => group.title);
  const categoriesMap: Record<string, PropertyImage[]> = groupedCategories.reduce((acc, group) => {
    acc[group.title] = group.images as PropertyImage[];
    return acc;
  }, {} as Record<string, PropertyImage[]>);
  const allImagesFlat: PropertyImage[] = images;
  
  // Set default active category when modal opens
  useEffect(() => {
    if (showModal && categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [showModal, categories, activeCategory]);
  
  // When category changes, reset the current images for the fullscreen view
  useEffect(() => {
    if (activeCategory) {
      setCurrentCategoryImages(categoriesMap[activeCategory] || []);
    }
  }, [activeCategory]);

  // Create preview grid (up to 5 images)
  const previewImages = [...images];
  while (previewImages.length < 5) {
    previewImages.push(...images.slice(0, 5 - previewImages.length));
  }
  
  const mainImage = previewImages[0];
  const secondaryImages = previewImages.slice(1, 5);
  
  // Handlers for mobile fullscreen navigation
  const openFullscreen = (categoryName: string, imageIndex: number) => {
    setActiveCategory(categoryName);
    setCurrentImageIndex(imageIndex);
    setShowFullscreen(true);
  };
  
  const handleNext = () => {
    if (currentImageIndex < currentCategoryImages.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  return (
    <>
      {/* --- Preview Grid --- */}
      <div className="relative w-full mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[300px] md:h-[450px] rounded-lg overflow-hidden">
          {/* Main image */}
          <div className="md:col-span-2 md:row-span-2 h-full relative cursor-pointer" onClick={() => setShowModal(true)}>
            <img src={mainImage.url} alt={mainImage.alt} className="w-full h-full object-cover" />
            <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm md:hidden">
              +{images.length - 1} photos
            </div>
          </div>
          
          {/* Secondary images */}
          {secondaryImages.map((image) => (
            <div key={image.id} className="hidden md:block h-full relative cursor-pointer" onClick={() => setShowModal(true)}>
              <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        
        <Button 
          variant="secondary" 
          size="sm" 
          className="mt-2 md:absolute md:bottom-4 md:right-4 w-full md:w-auto bg-white hover:bg-gray-100 text-black shadow-md" 
          onClick={() => setShowModal(true)}
        >
          <GridIcon className="h-4 w-4 mr-2" /> Show all photos
        </Button>
      </div>

      {/* --- Main Gallery Modal --- */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-none w-full h-full md:max-w-7xl md:h-[95vh] p-0 bg-white rounded-none md:rounded-lg md:flex md:flex-col">
          {/* Removed the built-in close button */}
          {/* Fixed Header */}
          <div className="border-b bg-white p-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Photo tour</h2>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </DialogClose>
          </div>
          
          {/* Tab Navigation */}
          <div className="bg-white border-b sticky top-0 z-10">
            <div className="flex overflow-x-auto scrollbar-hide px-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`py-3 px-4 whitespace-nowrap border-b-2 transition-all ${
                    activeCategory === category 
                      ? 'border-black font-medium' 
                      : 'border-transparent text-gray-600 hover:text-black'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Content Area - Show different views for desktop and mobile */}
          <div className="overflow-y-auto h-[calc(100%-112px)]">
            <div className="p-4 md:p-8 max-w-5xl mx-auto">
              {/* Desktop: Organized category view */}
              <div className="hidden md:block">
                {activeCategory && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-6">{activeCategory}</h2>
                    
                    {/* Simple Grid for Desktop */}
                    <div className="grid grid-cols-2 gap-6">
                      {categoriesMap[activeCategory]?.map(image => (
                        <div key={image.id} className="mb-4">
                          <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full rounded-lg object-contain max-h-[70vh]"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Mobile: Simple Thumbnail Grid */}
              <div className="md:hidden">
                {activeCategory && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">{activeCategory}</h2>
                    
                    {/* Thumbnail Grid - 2 columns for mobile */}
                    <div className="grid grid-cols-2 gap-2">
                      {categoriesMap[activeCategory]?.map((image, index) => (
                        <div 
                          key={image.id} 
                          className="aspect-square relative cursor-pointer" 
                          onClick={() => openFullscreen(activeCategory, index)}
                        >
                          <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-full object-cover rounded-md"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Mobile Fullscreen Image View */}
      {showFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Fullscreen Header */}
          <div className="p-4 flex items-center justify-between text-white">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full text-white" 
              onClick={() => setShowFullscreen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
            <p className="text-sm">
              {currentImageIndex + 1} / {currentCategoryImages.length}
            </p>
          </div>
          
          {/* Fullscreen Image */}
          <div className="flex-1 relative touch-pan-y">
            {currentCategoryImages[currentImageIndex] && (
              <img
                src={currentCategoryImages[currentImageIndex].url}
                alt={currentCategoryImages[currentImageIndex].alt}
                className="w-full h-full object-contain"
              />
            )}
            
            {/* Navigation Buttons */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full" 
              onClick={handlePrev}
              disabled={currentImageIndex === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full" 
              onClick={handleNext}
              disabled={currentImageIndex === currentCategoryImages.length - 1}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
