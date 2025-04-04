import type { ReactNode } from "react"

interface SectionHeadingProps {
  title: string
  subtitle?: string | ReactNode
  alignment?: "left" | "center" | "right"
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  withLine?: boolean
}

export default function SectionHeading({
  title,
  subtitle,
  alignment = "center",
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  withLine = true,
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  }

  return (
    <div className={`mb-12 ${alignmentClasses[alignment]} ${className}`}>
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 relative inline-block ${titleClassName}`}>
        {title}
        {withLine && (
          <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#e5792c] rounded-full transform transition-all duration-300 group-hover:w-full"></span>
        )}
      </h2>
      {subtitle && (
        <p
          className={`text-lg text-gray-600 max-w-2xl ${alignment === "center" ? "mx-auto" : ""} ${subtitleClassName}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

