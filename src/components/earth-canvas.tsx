import { useEffect, useRef, useState } from "react";

export function EarthCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const earthRotation = useRef({ x: 0, y: 0 });
  const animationId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const size = Math.min(500, window.innerWidth * 0.9);
    canvas.width = size;
    canvas.height = size;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    // Earth properties
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.35;
    
    let time = 0;

    const drawEarth = () => {
      ctx.clearRect(0, 0, size, size);

      // Draw main earth sphere
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(earthRotation.current.y * 0.01);

      // Create radial gradient for 3D effect
      const gradient = ctx.createRadialGradient(
        -radius * 0.3, -radius * 0.3, 0,
        0, 0, radius
      );
      gradient.addColorStop(0, 'hsl(207, 90%, 64%)');
      gradient.addColorStop(0.7, 'hsl(207, 90%, 54%)');
      gradient.addColorStop(1, 'hsl(207, 90%, 34%)');

      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Add wireframe grid
      ctx.strokeStyle = 'hsla(187, 95%, 43%, 0.4)';
      ctx.lineWidth = 1;
      
      // Longitude lines
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + earthRotation.current.y * 0.01;
        const radiusX = Math.abs(radius * Math.cos(angle));
        if (radiusX > 1) {
          ctx.beginPath();
          ctx.ellipse(0, 0, radiusX, radius, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Latitude lines
      for (let i = 1; i < 4; i++) {
        const y = (radius * i) / 4;
        const rx = Math.sqrt(Math.max(0, radius * radius - y * y));
        
        if (rx > 0) {
          ctx.beginPath();
          ctx.ellipse(0, y, rx, Math.max(1, rx * 0.2), 0, 0, Math.PI * 2);
          ctx.stroke();
          
          ctx.beginPath();
          ctx.ellipse(0, -y, rx, Math.max(1, rx * 0.2), 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      ctx.restore();

      // Add floating points around earth
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2 + time * 0.02;
        const distance = radius + 50 + Math.sin(time * 0.05 + i) * 20;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'hsl(187, 95%, 43%)';
        ctx.fill();
      }

      if (!isInteracting) {
        earthRotation.current.y += 0.01;
      }
      time += 0.016;

      animationId.current = requestAnimationFrame(drawEarth);
    };

    setIsLoading(false);
    drawEarth();

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [isInteracting]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsInteracting(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isInteracting || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    const deltaX = currentX - mousePos.current.x;
    const deltaY = currentY - mousePos.current.y;
    
    earthRotation.current.y += deltaX * 0.01;
    earthRotation.current.x += deltaY * 0.01;
    
    mousePos.current = { x: currentX, y: currentY };
  };

  const handleMouseUp = () => {
    setIsInteracting(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsInteracting(true);
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        mousePos.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isInteracting || e.touches.length !== 1 || !canvasRef.current) return;

    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = e.touches[0].clientX - rect.left;
    const currentY = e.touches[0].clientY - rect.top;
    
    const deltaX = currentX - mousePos.current.x;
    const deltaY = currentY - mousePos.current.y;
    
    earthRotation.current.y += deltaX * 0.01;
    earthRotation.current.x += deltaY * 0.01;
    
    mousePos.current = { x: currentX, y: currentY };
  };

  const handleTouchEnd = () => {
    setIsInteracting(false);
  };

  return (
    <div className="relative flex justify-center">
      <canvas
        ref={canvasRef}
        data-testid="earth-canvas"
        className="max-w-full h-auto cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          background: 'transparent'
        }}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-accent"></div>
        </div>
      )}
    </div>
  );
}
