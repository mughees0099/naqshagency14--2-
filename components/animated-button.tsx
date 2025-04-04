"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import React from "react"

interface AnimatedButtonProps {
  href?: string
  onClick?: () => void
  children: ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  external?: boolean
  type?: "button" | "submit" | "reset"
}

export default function AnimatedButton({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  type = "button",
}: AnimatedButtonProps) {
  const baseStyles =
    "relative overflow-hidden rounded-full font-medium transition-all duration-300 inline-flex items-center justify-center"

  const variantStyles = {
    primary: "bg-[#e5792c] text-white hover:bg-[#d06a25]",
    secondary: "bg-white text-[#171717] hover:bg-gray-100",
    outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50",
  }

  const sizeStyles = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4",
  }

  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  const content = (
    <>
      {typeof children === "string" || !React.isValidElement(children) ? (
        <>
          <span className="relative z-10">{children}</span>
          <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left opacity-10"></span>
          <span className="absolute -inset-[3px] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 origin-center bg-white opacity-10 group-hover:opacity-0 delay-100"></span>
        </>
      ) : (
        children
      )}
    </>
  )

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={`${buttonStyles} group`}>
          {content}
        </a>
      )
    }

    return (
      <Link href={href} className={`${buttonStyles} group`}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={`${buttonStyles} group`}>
      {content}
    </button>
  )
}

