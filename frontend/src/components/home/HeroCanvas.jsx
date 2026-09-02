import React, { useEffect, useRef, useState } from 'react';
import './HeroCanvas.css';

export const HeroCanvas = () => {
  const canvasRef = useRef(null);
  const [interactive, setInteractive] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle / Node System
    const nodeCount = width > 768 ? 45 : 25;
    const nodes = [];
    const maxDistance = width > 768 ? 140 : 100;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.5 + 1.5,
        isGold: Math.random() > 0.75,
      });
    }

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = 1 - dist / maxDistance;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(217, 119, 6, ${alpha * 0.25})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Update & draw nodes
      nodes.forEach((node) => {
        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Bounce on borders
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse interaction
        const mdx = mouse.x - node.x;
        const mdy = mouse.y - node.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < 120) {
          const force = (120 - mDist) / 120;
          node.x -= (mdx / mDist) * force * 1.5;
          node.y -= (mdy / mDist) * force * 1.5;
        }

        // Draw
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        if (node.isGold) {
          ctx.fillStyle = '#D97706';
          ctx.shadowColor = 'rgba(217, 119, 6, 0.4)';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = '#94A3B8';
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="bf-hero-canvas-wrapper">
      <canvas ref={canvasRef} className="bf-hero-canvas" />
    </div>
  );
};
