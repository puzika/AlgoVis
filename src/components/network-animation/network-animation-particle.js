export default class Particle {
   constructor(x, y, dx, dy, radius, color) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.color = color;
   }

   draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
   }

   update(ctx, canvas) {
      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) this.dx = -this.dx;
      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) this.dy = - this.dy;

      this.x += this.dx;
      this.y += this.dy;

      this.draw(ctx);
   }
}