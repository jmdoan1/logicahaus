"use client";

import { useEffect, useRef } from "react";

export default function BallTrail() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    // Initialize mouse position to the center of the container.
    let mouseX = rect.width / 2;
    let mouseY = rect.height / 2;

    const numBalls = 30;
    const balls: {
      element: HTMLDivElement;
      x: number;
      y: number;
      scale: number;
    }[] = [];

    // Create balls and start them at the initial position.
    for (let i = 0; i < numBalls; i++) {
      const ball = document.createElement("div");
      ball.classList.add("ball");
      container.appendChild(ball);
      balls.push({ element: ball, x: mouseX, y: mouseY, scale: 1 });
    }

    // Handle mouse moves by calculating the target relative to the container.
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Clamp the coordinates to the container bounds.
      mouseX = Math.min(Math.max(x, 0), rect.width);
      mouseY = Math.min(Math.max(y, 0), rect.height);
    };

    document.addEventListener("mousemove", handleMouseMove);

    function animate() {
      let prevX = mouseX;
      let prevY = mouseY;

      balls.forEach((ball) => {
        const dx = prevX - ball.x;
        const dy = prevY - ball.y;

        ball.x += dx * 0.15;
        ball.y += dy * 0.15;

        const distance = Math.sqrt(dx * dx + dy * dy);
        ball.scale = Math.max(0.3, 1 - distance / 100);

        // Use calc() to offset the ball's position by 50% of its size.
        ball.element.style.transform = `translate(calc(${ball.x}px - 50%), calc(${ball.y}px - 50%)) scale(${ball.scale})`;

        prevX = ball.x;
        prevY = ball.y;
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      balls.forEach((ball) => ball.element.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full aspect-video bg-black overflow-hidden cursor-none relative"
    >
      <style jsx global>{`
        .ball {
          position: absolute;
          width: 20px;
          height: 20px;
          background-color: white;
          border-radius: 50%;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
