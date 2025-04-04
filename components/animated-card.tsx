"use client"

import { type ReactNode, useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface AnimatedCardProps {
  title: string
  description?: string
  image?: string
  link?: string
  icon?: ReactNode
  className?: string
  hoverEffect?: "lift" | "scale" | "glow" | "border" | "none"
}

export default function AnimatedCard({
  title,
  description,
  image,
  link,
  icon,
  className = "",
  hoverEffect = "lift",
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const hoverEffects = {
    lift: "hover:-translate-y-4 hover:shadow-xl",
    scale: "hover:scale-105",
    glow: "hover:shadow-[0_0_20px_rgba(229,121,44,0.3)]",
    border: "hover:border-[#e5792c]",
    none: "",
  }

  const cardContent = (
    <div
      className={`bg-white rounded-lg overflow-hidden transition-all duration-300 ${hoverEffects[hoverEffect]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
          />
        </div>
      )}
      <div className="p-6">
        {icon && (
          <div className="mb-4 text-[#e5792c] transition-transform duration-300 group-hover:scale-110">{icon}</div>
        )}
        <h3 className="text-xl font-bold mb-2 group-hover:text-[#e5792c] transition-colors duration-300">{title}</h3>
        {description && <p className="text-gray-600">{description}</p>}
      </div>
    </div>
  )

  if (link) {
    return (
      <Link href={link} className="group block">
        {cardContent}
      </Link>
    )
  }

  return cardContent
}

