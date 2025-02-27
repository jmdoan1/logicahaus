"use client";

import { useEffect, useRef } from "react";

export default function Isometric() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;
    let animationFrameId: number;

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
      draw();
    };

    const draw = () => {
      const s = Math.min(canvas.width, canvas.height) / 15;
      const g = Math.ceil(canvas.width / s) * 2;
      const h = Math.ceil(canvas.height / (s * 0.5)) * 2;
      const w = canvas.width / 2;
      const v = canvas.height / 2;

      for (let y = -h; y < h; y++) {
        for (let i = -g; i < g; i++) {
          const p = w + ((i - y) * s) / 2;
          const q = v + ((i + y) * s) / 4;
          const m = Math.sqrt(i * i + y * y);
          const n = Math.sqrt(g * g + h * h);
          const e = 1 - m / n;
          const f = s * e * Math.abs(Math.sin(m * 0.5 + t));

          ctx.beginPath();
          ctx.moveTo(p, q - f);
          ctx.lineTo(p + s / 2, q - s / 2 - f);
          ctx.lineTo(p + s, q - f);
          ctx.lineTo(p + s, q);
          ctx.lineTo(p + s / 2, q + s / 2);
          ctx.lineTo(p, q);
          ctx.closePath();

          const grad = ctx.createLinearGradient(p, q - f, p + s, q);
          grad.addColorStop(0, "rgba(0,255,255,.8)");
          grad.addColorStop(1, "rgba(255,0,255,.8)");
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.strokeStyle = "rgba(255,255,0,.5)";
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(p, q);
          ctx.lineTo(p, q - f);
          ctx.moveTo(p + s, q);
          ctx.lineTo(p + s, q - f);
          ctx.moveTo(p + s / 2, q + s / 2);
          ctx.lineTo(p + s / 2, q - s / 2 - f);
          ctx.strokeStyle = "rgba(255,255,255,.3)";
          ctx.stroke();
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0,0,0,.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      draw();
      t += 0.05;
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}
