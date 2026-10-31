import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import Link, { type LinkProps } from "next/link"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // "primary" maps to site's Signal Orange theme
        primary: "bg-[#141413] text-white hover:bg-[#CF4500] transition-colors duration-200",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        // "md" alias for default
        md: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

// ─── SatelliteButton ────────────────────────────────────────────────────────
// Pill-shaped button with optional href navigation — used in ProcedureExplorer etc.
interface SatelliteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  href?: string
  ariaLabel?: string
}

const SatelliteButton = React.forwardRef<HTMLButtonElement, SatelliteButtonProps>(
  ({ className, children, href, ariaLabel, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center gap-2 rounded-full bg-[#141413] px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#CF4500] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2400] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className,
    )

    if (href) {
      return (
        <Link href={href} className={classes} aria-label={ariaLabel}>
          {children}
        </Link>
      )
    }

    return (
      <button
        ref={ref}
        className={classes}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </button>
    )
  },
)
SatelliteButton.displayName = "SatelliteButton"

// ─── LinkButton ─────────────────────────────────────────────────────────────
// Next.js Link styled as a button — used in login, procedures pages etc.
export interface LinkButtonProps extends Omit<LinkProps, "className">, VariantProps<typeof buttonVariants> {
  className?: string
  children: React.ReactNode
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Link>
    )
  },
)
LinkButton.displayName = "LinkButton"

export { Button, buttonVariants, SatelliteButton, LinkButton }
