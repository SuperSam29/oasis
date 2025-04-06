"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GridIcon, X } from "lucide-react";

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

// Helper to generate slug for ID
const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

export default function PropertyImageGallery({
  images,
  title,
}: PropertyImageGalleryProps) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Basic validation
  if (!images || images.length === 0) {
    return (
      <div className="relative w-full h-[300px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  // --- Category Processing ---
  const categoriesMap: Record<string, PropertyImage[]> = {};
  const categories: string[] = [];
  images.forEach(image => {
    if (!image.category) return;
    if (!categoriesMap[image.category]) {
      categoriesMap[image.category] = [];
      categories.push(image.category); // Keep track of category order
    }
    categoriesMap[image.category].push(image);
  });

  // Set default category on modal open
  useEffect(() => {
    if (showAllPhotos && !selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [showAllPhotos, categories, selectedCategory]);

  // --- Preview Grid Images ---
  const previewImages = [...images];
  while (previewImages.length < 5) {
    previewImages.push(...images.slice(0, 5 - previewImages.length));
  }
  const mainImage = previewImages[0];
  const secondaryImages = previewImages.slice(1, 5);
  
  // --- Scroll Handling ---
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    const categoryId = slugify(category);
    const element = document.getElementById(categoryId);
    if (element && imageContainerRef.current) {
      const headerOffset = 80; // Adjust based on sticky header/tabs height
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;
      
      imageContainerRef.current.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* --- Grid Preview (Existing Airbnb-style) --- */}
      <div className="relative w-full mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[300px] md:h-[450px] rounded-lg overflow-hidden">
          {/* Main image */}
          <div className="md:col-span-2 md:row-span-2 h-full relative cursor-pointer" onClick={() => setShowAllPhotos(true)}>
            <img src={mainImage.url} alt={mainImage.alt} className="w-full h-full object-cover" />
            <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm md:hidden">+{images.length - 1} photos</div>
          </div>
          {/* Secondary images */}
          {secondaryImages.map((image) => (
            <div key={image.id} className="hidden md:block h-full relative cursor-pointer" onClick={() => setShowAllPhotos(true)}>
              <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <Button variant="secondary" size="sm" className="mt-2 md:absolute md:bottom-4 md:right-4 w-full md:w-auto bg-white hover:bg-gray-100 text-black shadow-md" onClick={() => setShowAllPhotos(true)}>
          <GridIcon className="h-4 w-4 mr-2" /> Show all photos
        </Button>
      </div>

      {/* --- Redesigned Full Photo Gallery Modal --- */}
      <Dialog open={showAllPhotos} onOpenChange={setShowAllPhotos}>
        {/* Responsive Dialog Content - Removed overflow-hidden */}
        <DialogContent className="max-w-none w-full h-full md:max-w-7xl md:h-[95vh] p-0 bg-white rounded-none md:rounded-lg">
          <div className="flex flex-col h-full">
            {/* --- Modal Header --- */}
            <div className="p-4 border-b sticky top-0 bg-white z-30 flex items-center justify-between flex-shrink-0">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowAllPhotos(false)}>
                <X className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-semibold hidden md:block">Photo tour</h2> 
              <div className="w-8"></div> {/* Spacer */} 
            </div>

            {/* --- Main Content Area (Categories + Images) --- */}
            <div className="flex flex-col md:flex-row h-full">
              
              {/* --- Category Navigation (Sidebar - Desktop) --- */}
              <nav className="hidden md:block w-60 border-r p-4 overflow-y-auto flex-shrink-0 scrollbar-hide">
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category}>
                      <button 
                        onClick={() => handleCategoryClick(category)}
                        className={`block w-full text-left px-3 py-2 rounded-md ${selectedCategory === category ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* --- Category Navigation (Tabs - Mobile) --- */}
              <nav className="md:hidden w-full border-b sticky top-[57px] md:top-0 bg-white z-20 flex-shrink-0">
                 <div className="flex space-x-4 overflow-x-auto scrollbar-hide px-4">
                   {categories.map((category) => (
                     <button
                       key={category}
                       onClick={() => handleCategoryClick(category)}
                       className={`py-3 px-1 border-b-2 flex-shrink-0 whitespace-nowrap ${selectedCategory === category ? 'border-black font-medium' : 'border-transparent text-gray-600 hover:text-black'}`}
                     >
                       {category}
                     </button>
                   ))}
                 </div>
              </nav>
              
              {/* --- Scrollable Images Area --- */} 
              <div ref={imageContainerRef} className="flex-1 h-full overflow-y-auto scroll-smooth min-h-0" >
                 <div className="max-w-3xl mx-auto px-4 md:px-8 py-6">
                   {categories.map((category) => (
                     <section key={category} id={slugify(category)} className="mb-12 scroll-mt-24 md:scroll-mt-20">
                       <h2 className="text-2xl font-semibold mb-6">{category}</h2>
                       <div className="space-y-6">
                         {categoriesMap[category]?.map((image) => (
                           <div key={image.id}>
                             <img
                               src={image.url}
                               alt={image.alt}
                               className="block w-full h-auto rounded-lg object-contain max-h-[50vh] md:max-h-[85vh] md:max-w-3xl"
                               loading="lazy"
                             />
                           </div>
                         ))}
                       </div>
                     </section>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
