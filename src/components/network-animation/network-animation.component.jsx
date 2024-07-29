import { useRef, useEffect, useState } from "react";
import * as S from './network-animation.styles';
import * as svar from '../../variables.styles';
import Particle from "./network-animation-particle";

function initParticles(canvas) {
   const particles = [];
   const particlesAmount = canvas.width * canvas.height / 10000;

   for (let i = 0; i < particlesAmount; i++) {
      const radius = 2;
      const x = Math.random() * (canvas.width - 2 * radius) + radius * 2;
      const y = Math.random() * (canvas.height - 2 * radius) + radius * 2;
      const dx = Math.random() * 2 - 1;
      const dy = Math.random() * 2 - 1;
      const color = svar.colorPrimary;

      const p = new Particle(x, y, dx, dy, radius, color);

      particles.push(p);
   }

   return particles;
}

function connect(particles, ctx) {
   for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
         const maxDist = 150;
         const curDist = Math.sqrt((particles[i].x - particles[j].x) ** 2 + (particles[i].y - particles[j].y) ** 2);

         if (curDist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.lineWidth = 1;
            ctx.strokeStyle = `rgba(0, 128, 255, ${1 - curDist / maxDist})`;
            ctx.stroke();
         }
      }
   }
}

function initNetwork(canvas, ctx) {
   const particles = initParticles(canvas);

   const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) particles[i].update(ctx, canvas);

      connect(particles, ctx);

      return requestAnimationFrame(animate.bind(null, particles));
   }

   return animate();
}

export default function NetworkAnimation() {
   const canvasRef = useRef(null);
   const [] = useState();

   useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let animationId;

      const setCanvasSize = () => {
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
      }

      setCanvasSize();

      animationId = initNetwork(canvas, ctx);

      window.addEventListener('resize', () => {
         setCanvasSize();

         isFinite(animationId) && cancelAnimationFrame(animationId);

         animationId = initNetwork(canvas, ctx);
      });

      return () => {
         window.removeEventListener('resize', setCanvasSize);
         cancelAnimationFrame(animationId);
      }
   }, []);

   return (
      <S.NetworkAnimation ref={canvasRef}></S.NetworkAnimation>
   )
}