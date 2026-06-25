<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useDevicePixelRatio, useMouseInElement, useRafFn, useWindowSize } from '@vueuse/core'

interface Dot {
  homeX: number
  homeY: number
  x: number
  y: number
  vx: number
  vy: number
}

interface GridConfig {
  spacing: number // distance between dots, in px
  dotRadius: number // resting radius of each dot
  maxDotRadius: number // radius a dot grows to when pushed (purely visual)
  repelRadius: number // how far from the cursor dots start reacting
  repelStrength: number // max distance a dot gets pushed away, in px
  springStrength: number // how strongly a dot eases back home (0–1, higher = snappier)
  damping: number // velocity damping per frame (lower = more "floaty")
  dotColor: string
}

const config: GridConfig = {
  spacing: 18,
  dotRadius: 1,
  maxDotRadius: 1.7,
  repelRadius: 250,
  repelStrength: -5,
  springStrength: 0.4,
  damping: 0.3,
  dotColor: '#dddddd',
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let dots: Dot[] = []

// Reactive window size + DPR — replaces the manual `resize` listener/handler.
const { width, height } = useWindowSize()
const { pixelRatio } = useDevicePixelRatio()

// Mouse position relative to the canvas itself, plus a built-in `isOutside`
// flag — replaces the manual mousemove/mouseleave listeners and the -9999
// "off-screen" sentinel trick.
const { elementX, elementY, isOutside } = useMouseInElement(canvasRef)

function buildGrid(w: number, h: number): void {
  dots = []
  const cols = Math.ceil(w / config.spacing) + 1
  const rows = Math.ceil(h / config.spacing) + 1

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // offset by half the spacing so the grid isn't clipped at the top/left edges
      const homeX = col * config.spacing + config.spacing / 2
      const homeY = row * config.spacing + config.spacing / 2
      dots.push({ homeX, homeY, x: homeX, y: homeY, vx: 0, vy: 0 })
    }
  }
}

function resizeCanvas(w: number, h: number, dpr: number): void {
  const canvas = canvasRef.value
  if (!canvas || !ctx) return

  canvas.width = w * dpr
  canvas.height = h * dpr
  canvas.style.width = `${w}px`
  canvas.style.height = `${h}px`
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

// Rebuild on viewport or DPR changes (resizing the window, moving to a
// different-density monitor, rotating a tablet, etc).
watch([width, height, pixelRatio], ([w, h, dpr]) => {
  resizeCanvas(w, h, dpr)
  buildGrid(w, h)
})

function currentMouse(): { x: number; y: number } {
  return isOutside.value ? { x: -9999, y: -9999 } : { x: elementX.value, y: elementY.value }
}

function update(): void {
  const mouse = currentMouse()

  for (const d of dots) {
    const dx = d.x - mouse.x
    const dy = d.y - mouse.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < config.repelRadius) {
      const force = (1 - dist / config.repelRadius) * config.repelStrength
      const angle = Math.atan2(dy, dx)
      const targetX = d.x + Math.cos(angle) * force * 0.2
      const targetY = d.y + Math.sin(angle) * force * 0.2
      d.vx += (targetX - d.x) * 0.5
      d.vy += (targetY - d.y) * 0.5
    }

    // spring back toward home position
    d.vx += (d.homeX - d.x) * config.springStrength
    d.vy += (d.homeY - d.y) * config.springStrength

    d.vx *= config.damping
    d.vy *= config.damping

    d.x += d.vx
    d.y += d.vy
  }
}

function draw(): void {
  if (!ctx) return

  // Clear only — no fillRect, so the canvas stays fully transparent and
  // only the dots themselves are ever painted.
  ctx.clearRect(0, 0, width.value, height.value)

  const mouse = currentMouse()
  ctx.fillStyle = config.dotColor

  for (const d of dots) {
    const dx = d.x - mouse.x
    const dy = d.y - mouse.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const t = Math.max(0, 1 - dist / config.repelRadius)
    const r = config.dotRadius + (config.maxDotRadius - config.dotRadius) * t

    ctx.beginPath()
    ctx.arc(d.x, d.y, r, 0, Math.PI * 2)
    ctx.fill()
  }
}

// useRafFn handles starting the loop and auto-stops it when the component
// unmounts — no manual requestAnimationFrame/cancelAnimationFrame bookkeeping.
useRafFn(() => {
  update()
  draw()
})

onMounted(() => {
  ctx = canvasRef.value?.getContext('2d') ?? null
  resizeCanvas(width.value, height.value, pixelRatio.value)
  buildGrid(width.value, height.value)
})
</script>

<template>
  <canvas ref="canvasRef" class="fixed inset-0 -z-10 block h-screen w-screen dark:invert" />
</template>
