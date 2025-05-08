"use client"

import { useEffect, useRef } from "react"

interface Point {
  x: number
  y: number
  dx: number
  dy: number
}

interface Line {
  start: Point
  end: Point
  opacity: number
}

export default function FinancialBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create points
    const points: Point[] = []
    const numPoints = 50
    const maxSpeed = 0.3

    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * maxSpeed,
        dy: (Math.random() - 0.5) * maxSpeed,
      })
    }

    // Create lines
    const lines: Line[] = []
    const connectionDistance = 150

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update points
      points.forEach((point) => {
        point.x += point.dx
        point.y += point.dy

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.dx *= -1
        if (point.y < 0 || point.y > canvas.height) point.dy *= -1
      })

      // Clear lines
      lines.length = 0

      // Create new lines
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x
          const dy = points[i].y - points[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            lines.push({
              start: points[i],
              end: points[j],
              opacity: 1 - distance / connectionDistance,
            })
          }
        }
      }

      // Draw lines
      lines.forEach((line) => {
        ctx.beginPath()
        ctx.moveTo(line.start.x, line.start.y)
        ctx.lineTo(line.end.x, line.end.y)
        ctx.strokeStyle = `rgba(56, 227, 250, ${line.opacity * 0.2})`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Draw financial graph
      drawFinancialGraph(ctx, canvas.width, canvas.height)

      animationRef.current = requestAnimationFrame(animate)
    }

    // Draw financial graph
    const drawFinancialGraph = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const now = Date.now() / 1000
      const graphHeight = height * 0.3
      const graphWidth = width * 0.8
      const graphX = width * 0.1
      const graphY = height * 0.5

      ctx.beginPath()
      ctx.moveTo(graphX, graphY)

      for (let x = 0; x <= graphWidth; x += 5) {
        const normalizedX = x / graphWidth

        // Create a complex wave pattern using sine functions
        const y =
          Math.sin(normalizedX * 10 + now * 0.2) * 20 +
          Math.sin(normalizedX * 5 - now * 0.1) * 15 +
          Math.sin(normalizedX * 20 + now * 0.5) * 10

        ctx.lineTo(graphX + x, graphY - y)
      }

      // Create gradient
      const gradient = ctx.createLinearGradient(graphX, graphY - graphHeight / 2, graphX, graphY + 10)
      gradient.addColorStop(0, "rgba(56, 227, 250, 0.1)")
      gradient.addColorStop(1, "rgba(56, 227, 250, 0)")

      // Fill the area under the graph
      ctx.lineTo(graphX + graphWidth, graphY)
      ctx.lineTo(graphX, graphY)
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw the line
      ctx.beginPath()
      ctx.moveTo(graphX, graphY)

      for (let x = 0; x <= graphWidth; x += 5) {
        const normalizedX = x / graphWidth
        const y =
          Math.sin(normalizedX * 10 + now * 0.2) * 20 +
          Math.sin(normalizedX * 5 - now * 0.1) * 15 +
          Math.sin(normalizedX * 20 + now * 0.5) * 10

        ctx.lineTo(graphX + x, graphY - y)
      }

      ctx.strokeStyle = "rgba(56, 227, 250, 0.5)"
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ opacity: 0.6 }} />
}
