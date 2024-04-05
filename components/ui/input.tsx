/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import * as React from 'react'

import { cn } from '@/lib/utils'

import { useMotionTemplate, useMotionValue, motion } from 'framer-motion'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const radius = 100 // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      const { left, top } = currentTarget.getBoundingClientRect()

      mouseX.set(clientX - left)
      mouseY.set(clientY - top)
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          var(--primary),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/input rounded-lg p-[2px] transition duration-300"
      >
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input  bg-background px-3 py-2 text-sm shadow-input ring-offset-background transition  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:shadow-none dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]',
            className,
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    )
  },
)
Input.displayName = 'Input'

export {
  Input, // Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
}
