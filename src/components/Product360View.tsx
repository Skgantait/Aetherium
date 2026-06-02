import { useState, useRef, useEffect } from "react";

interface Product360ViewProps {
  images: string[];
  alt: string;
}

export function Product360View({ images, alt }: Product360ViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef(0);

  const totalImages = images.length;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartIndex(currentIndex);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const diff = e.clientX - startX;
    const threshold = 50; // pixels to move for each image
    const imageShift = Math.floor(diff / threshold);
    const newIndex = (startIndex - imageShift) % totalImages;
    const normalizedIndex = newIndex < 0 ? totalImages + newIndex : newIndex;

    setCurrentIndex(normalizedIndex);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    setStartIndex(currentIndex);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartXRef.current;
    const threshold = 50;
    const imageShift = Math.floor(diff / threshold);
    const newIndex = (startIndex - imageShift) % totalImages;
    const normalizedIndex = newIndex < 0 ? totalImages + newIndex : newIndex;

    setCurrentIndex(normalizedIndex);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove as any);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove as any);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, startX, startIndex, totalImages]);

  const rotationAngle = (currentIndex / totalImages) * 360;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none cursor-grab active:cursor-grabbing overflow-hidden"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Image carousel */}
      <div className="relative w-full h-full bg-card flex items-center justify-center" suppressHydrationWarning>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${alt} - angle ${Math.round((index / totalImages) * 360)}°`}
            width={800}
            height={1066}
            className={`absolute w-full h-full object-contain transition-opacity duration-150 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            draggable={false}
            suppressHydrationWarning
          />
        ))}
      </div>

      {/* 360 rotation indicator */}
      <div className="absolute bottom-6 left-6 glass p-4 rounded">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 40 40"
              style={{
                transform: `rotate(${rotationAngle}deg)`,
                transition: isDragging ? "none" : "transform 0.1s ease-out",
              }}
            >
              <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
              <path d="M20 2 L20 6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="mono-label text-xs">360°</div>
        </div>
      </div>

      {/* Drag instruction */}
      {totalImages > 1 && (
        <div className="absolute top-6 right-6 glass px-3 py-1.5 rounded-full mono-label text-xs opacity-60">
          ← Drag to rotate →
        </div>
      )}
    </div>
  );
}
