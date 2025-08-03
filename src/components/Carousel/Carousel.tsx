import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { cn } from '@/utils'

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'fade' | 'slide' | 'zoom' | 'stacked' | 'coverflow'
  axis?: 'horizontal' | 'vertical'
  transitionType?: 'slide' | 'fade' | 'scale' | 'scroll'
  direction?: 'ltr' | 'rtl'
  loop?: boolean
  autoplay?: boolean
  autoplayInterval?: number
  duration?: number
  pauseOnHover?: boolean
  pauseOnFocus?: boolean
  keyboardNavigation?: boolean
  touchEnabled?: boolean
  swipeEnabled?: boolean
  snap?: boolean
  dragEnabled?: boolean
  lazyLoad?: boolean
  dynamicHeight?: boolean
  itemsPerSlide?: number
  responsive?: {
    [key: string]: {
      itemsPerSlide?: number
      gap?: string
    }
  }
  currentIndex?: number
  onSlideChange?: (index: number) => void
  imageMode?: 'contain' | 'cover' | 'stretch'
  // Size & Style
  height?: string
  width?: string
  maxWidth?: string
  aspectRatio?: string
  gap?: string
  spacing?: string
  padding?: string
  margin?: string
  borderRadius?: string
  boxShadow?: string
  backgroundColor?: string
  borderColor?: string
  borderWidth?: string
  borderStyle?: string
  // Component overrides
  showIndicators?: boolean
  showControls?: boolean
  indicatorPosition?: 'inside' | 'outside' | 'bottom' | 'top'
  controlPosition?: 'inside' | 'outside' | 'center' | 'corners'
  nextIcon?: React.ReactNode
  prevIcon?: React.ReactNode
  indicatorIcon?: React.ReactNode
  // Slide styles
  slideBackgroundColor?: string
  slideBorderRadius?: string
  slidePadding?: string
  slideBoxShadow?: string
  slideBorderColor?: string
  slideBorderWidth?: string
  slideBorderStyle?: string
  // Control styles
  controlBackgroundColor?: string
  controlHoverBackgroundColor?: string
  controlActiveBackgroundColor?: string
  controlTextColor?: string
  controlHoverTextColor?: string
  controlActiveTextColor?: string
  controlSize?: string
  controlBorderRadius?: string
  controlPadding?: string
  controlBoxShadow?: string
  controlBorderColor?: string
  controlBorderWidth?: string
  controlBorderStyle?: string
  controlOpacity?: string
  controlHoverOpacity?: string
  // Indicator styles
  indicatorBackgroundColor?: string
  indicatorActiveBackgroundColor?: string
  indicatorHoverBackgroundColor?: string
  indicatorSize?: string
  indicatorBorderRadius?: string
  indicatorMargin?: string
  indicatorBoxShadow?: string
  indicatorBorderColor?: string
  indicatorBorderWidth?: string
  indicatorBorderStyle?: string
  indicatorOpacity?: string
  indicatorActiveOpacity?: string
  // Focus styles
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusRingOffsetColor?: string
  // Typography
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  textColor?: string
  // Loading state
  loading?: boolean
  loadingMessage?: string
  children: React.ReactNode
}

interface CarouselContextValue {
  currentIndex: number
  totalSlides: number
  goTo: (index: number) => void
  next: () => void
  prev: () => void
  variant?: 'default' | 'fade' | 'slide' | 'zoom' | 'stacked' | 'coverflow'
  axis?: 'horizontal' | 'vertical'
  transitionType?: 'slide' | 'fade' | 'scale' | 'scroll'
  direction?: 'ltr' | 'rtl'
  loop?: boolean
  duration?: number
  imageMode?: 'contain' | 'cover' | 'stretch'
  gap?: string
  itemsPerSlide?: number
  // Pass through style props
  slideBackgroundColor?: string
  slideBorderRadius?: string
  slidePadding?: string
  slideBoxShadow?: string
  slideBorderColor?: string
  slideBorderWidth?: string
  slideBorderStyle?: string
  controlBackgroundColor?: string
  controlHoverBackgroundColor?: string
  controlActiveBackgroundColor?: string
  controlTextColor?: string
  controlHoverTextColor?: string
  controlActiveTextColor?: string
  controlSize?: string
  controlBorderRadius?: string
  controlPadding?: string
  controlBoxShadow?: string
  controlBorderColor?: string
  controlBorderWidth?: string
  controlBorderStyle?: string
  controlOpacity?: string
  controlHoverOpacity?: string
  indicatorBackgroundColor?: string
  indicatorActiveBackgroundColor?: string
  indicatorHoverBackgroundColor?: string
  indicatorSize?: string
  indicatorBorderRadius?: string
  indicatorMargin?: string
  indicatorBoxShadow?: string
  indicatorBorderColor?: string
  indicatorBorderWidth?: string
  indicatorBorderStyle?: string
  indicatorOpacity?: string
  indicatorActiveOpacity?: string
  focusRingColor?: string
  focusRingWidth?: string
  focusRingOffset?: string
  focusRingOffsetColor?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  textColor?: string
}

const CarouselContext = createContext<CarouselContextValue | undefined>(undefined)

export const useCarousel = () => {
  const context = useContext(CarouselContext)
  if (!context) {
    throw new Error('useCarousel must be used within a Carousel')
  }
  return context
}

// Context for slide index
const SlideIndexContext = React.createContext<number>(0)

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      className,
      variant = 'default',
      axis = 'horizontal',
      transitionType = 'slide',
      direction = 'ltr',
      loop = false,
      autoplay = false,
      autoplayInterval = 3000,
      duration = 500,
      pauseOnHover = true,
      pauseOnFocus = true,
      keyboardNavigation = true,
      touchEnabled = true,
      swipeEnabled = true,
      snap: _snap = true,
      dragEnabled: _dragEnabled = false,
      lazyLoad: _lazyLoad = false,
      dynamicHeight: _dynamicHeight = false,
      itemsPerSlide = 1,
      responsive: _responsive,
      currentIndex: controlledIndex,
      onSlideChange,
      imageMode = 'cover',
      // Size & Style
      height,
      width,
      maxWidth,
      aspectRatio,
      gap = '0',
      spacing,
      padding,
      margin,
      borderRadius,
      boxShadow,
      backgroundColor,
      borderColor,
      borderWidth,
      borderStyle,
      // Component overrides
      showIndicators = true,
      showControls = true,
      indicatorPosition = 'bottom',
      controlPosition = 'center',
      nextIcon,
      prevIcon,
      indicatorIcon,
      // Slide styles
      slideBackgroundColor,
      slideBorderRadius,
      slidePadding,
      slideBoxShadow,
      slideBorderColor,
      slideBorderWidth,
      slideBorderStyle,
      // Control styles
      controlBackgroundColor,
      controlHoverBackgroundColor,
      controlActiveBackgroundColor,
      controlTextColor,
      controlHoverTextColor,
      controlActiveTextColor,
      controlSize,
      controlBorderRadius,
      controlPadding,
      controlBoxShadow,
      controlBorderColor,
      controlBorderWidth,
      controlBorderStyle,
      controlOpacity,
      controlHoverOpacity,
      // Indicator styles
      indicatorBackgroundColor,
      indicatorActiveBackgroundColor,
      indicatorHoverBackgroundColor,
      indicatorSize,
      indicatorBorderRadius,
      indicatorMargin,
      indicatorBoxShadow,
      indicatorBorderColor,
      indicatorBorderWidth,
      indicatorBorderStyle,
      indicatorOpacity,
      indicatorActiveOpacity,
      // Focus styles
      focusRingColor,
      focusRingWidth,
      focusRingOffset,
      focusRingOffsetColor,
      // Typography
      fontSize,
      fontWeight,
      fontFamily,
      textColor,
      // Loading state
      loading = false,
      loadingMessage = 'Loading...',
      children,
      style,
      ...props
    },
    ref
  ) => {
    const [uncontrolledIndex, setUncontrolledIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const touchStartX = useRef<number | null>(null)
    const touchStartY = useRef<number | null>(null)

    const slides = React.Children.toArray(children).filter(
      (child): child is React.ReactElement =>
        React.isValidElement(child) &&
        (child.type as React.ComponentType)?.displayName === 'CarouselSlide'
    )

    const totalSlides = slides.length

    const currentIndex = controlledIndex !== undefined ? controlledIndex : uncontrolledIndex

    const goTo = useCallback(
      (index: number) => {
        let newIndex = index

        if (loop) {
          if (index < 0) {
            newIndex = totalSlides - 1
          } else if (index >= totalSlides) {
            newIndex = 0
          }
        } else {
          newIndex = Math.max(0, Math.min(index, totalSlides - 1))
        }

        if (controlledIndex === undefined) {
          setUncontrolledIndex(newIndex)
        }

        onSlideChange?.(newIndex)
      },
      [loop, totalSlides, controlledIndex, onSlideChange]
    )

    const next = useCallback(() => {
      goTo(currentIndex + 1)
    }, [currentIndex, goTo])

    const prev = useCallback(() => {
      goTo(currentIndex - 1)
    }, [currentIndex, goTo])

    // Autoplay
    useEffect(() => {
      if (autoplay && !isPaused && totalSlides > 1) {
        const timer = setInterval(() => {
          next()
        }, autoplayInterval)

        return () => clearInterval(timer)
      }
    }, [autoplay, isPaused, autoplayInterval, next, totalSlides])

    // Keyboard navigation
    useEffect(() => {
      if (!keyboardNavigation) return

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault()
          prev()
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault()
          next()
        }
      }

      const container = containerRef.current
      if (container) {
        container.addEventListener('keydown', handleKeyDown)
        return () => container.removeEventListener('keydown', handleKeyDown)
      }
    }, [keyboardNavigation, prev, next])

    // Touch/swipe handling
    const handleTouchStart = useCallback(
      (e: React.TouchEvent) => {
        if (!touchEnabled || !swipeEnabled) return
        touchStartX.current = e.touches[0].clientX
        touchStartY.current = e.touches[0].clientY
      },
      [touchEnabled, swipeEnabled]
    )

    const handleTouchMove = useCallback(
      (e: React.TouchEvent) => {
        if (!touchEnabled || !swipeEnabled) return
        if (touchStartX.current === null || touchStartY.current === null) return

        const touchEndX = e.touches[0].clientX
        const touchEndY = e.touches[0].clientY
        const diffX = touchStartX.current - touchEndX
        const diffY = touchStartY.current - touchEndY

        if (Math.abs(diffX) > Math.abs(diffY)) {
          if (axis === 'horizontal') {
            if (diffX > 50) {
              next()
            } else if (diffX < -50) {
              prev()
            }
          }
        } else {
          if (axis === 'vertical') {
            if (diffY > 50) {
              next()
            } else if (diffY < -50) {
              prev()
            }
          }
        }
      },
      [touchEnabled, swipeEnabled, axis, next, prev]
    )

    const handleTouchEnd = useCallback(() => {
      touchStartX.current = null
      touchStartY.current = null
    }, [])

    const baseStyles = 'relative w-full overflow-hidden'

    const customStyles: React.CSSProperties = {
      height,
      width,
      maxWidth,
      aspectRatio,
      padding,
      margin,
      borderRadius,
      boxShadow,
      backgroundColor,
      borderColor,
      borderWidth,
      borderStyle,
      fontSize,
      fontWeight,
      fontFamily,
      color: textColor,
      ...style,
    }

    const contextValue: CarouselContextValue = {
      currentIndex,
      totalSlides,
      goTo,
      next,
      prev,
      variant,
      axis,
      transitionType,
      direction,
      loop,
      duration,
      imageMode,
      gap,
      itemsPerSlide,
      // Style props
      slideBackgroundColor,
      slideBorderRadius,
      slidePadding,
      slideBoxShadow,
      slideBorderColor,
      slideBorderWidth,
      slideBorderStyle,
      controlBackgroundColor,
      controlHoverBackgroundColor,
      controlActiveBackgroundColor,
      controlTextColor,
      controlHoverTextColor,
      controlActiveTextColor,
      controlSize,
      controlBorderRadius,
      controlPadding,
      controlBoxShadow,
      controlBorderColor,
      controlBorderWidth,
      controlBorderStyle,
      controlOpacity,
      controlHoverOpacity,
      indicatorBackgroundColor,
      indicatorActiveBackgroundColor,
      indicatorHoverBackgroundColor,
      indicatorSize,
      indicatorBorderRadius,
      indicatorMargin,
      indicatorBoxShadow,
      indicatorBorderColor,
      indicatorBorderWidth,
      indicatorBorderStyle,
      indicatorOpacity,
      indicatorActiveOpacity,
      focusRingColor,
      focusRingWidth,
      focusRingOffset,
      focusRingOffsetColor,
      fontSize,
      fontWeight,
      fontFamily,
      textColor,
    }

    return (
      <CarouselContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(baseStyles, loading && 'animate-pulse', className)}
          style={customStyles}
          onMouseEnter={() => pauseOnHover && setIsPaused(true)}
          onMouseLeave={() => pauseOnHover && setIsPaused(false)}
          onFocus={() => pauseOnFocus && setIsPaused(true)}
          onBlur={() => pauseOnFocus && setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          tabIndex={keyboardNavigation ? 0 : undefined}
          role="region"
          aria-roledescription="carousel"
          aria-label="Image carousel"
          {...props}
        >
          {loading ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              {loadingMessage}
            </div>
          ) : (
            <>
              <div
                ref={containerRef}
                className="relative h-full w-full overflow-hidden"
                style={{ gap: spacing || gap }}
              >
                {React.Children.map(children, (child, index) => {
                  if (
                    React.isValidElement(child) &&
                    (child.type as React.ComponentType)?.displayName === 'CarouselSlide'
                  ) {
                    return (
                      <SlideIndexContext.Provider value={index}>{child}</SlideIndexContext.Provider>
                    )
                  }
                  return child
                })}
              </div>
              {showControls && totalSlides > 1 && (
                <CarouselControls position={controlPosition}>
                  <CarouselPrev icon={prevIcon} />
                  <CarouselNext icon={nextIcon} />
                </CarouselControls>
              )}
              {showIndicators && totalSlides > 1 && (
                <CarouselIndicators position={indicatorPosition} icon={indicatorIcon} />
              )}
            </>
          )}
        </div>
      </CarouselContext.Provider>
    )
  }
)

Carousel.displayName = 'Carousel'

export interface CarouselSlideProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CarouselSlide = React.forwardRef<HTMLDivElement, CarouselSlideProps>(
  ({ className, children, style, ...props }, ref) => {
    const {
      currentIndex,
      totalSlides,
      variant,
      axis,
      transitionType,
      duration,
      imageMode,
      slideBackgroundColor,
      slideBorderRadius,
      slidePadding,
      slideBoxShadow,
      slideBorderColor,
      slideBorderWidth,
      slideBorderStyle,
    } = useCarousel()

    const slideIndex = React.useContext(SlideIndexContext)

    const isActive = currentIndex === slideIndex
    const isPrev =
      currentIndex === slideIndex + 1 || (currentIndex === 0 && slideIndex === totalSlides - 1)
    const isNext =
      currentIndex === slideIndex - 1 || (currentIndex === totalSlides - 1 && slideIndex === 0)

    const baseStyles = 'absolute inset-0 h-full w-full'

    const getTransform = () => {
      if (variant === 'fade' || transitionType === 'fade') {
        return {}
      }

      if (variant === 'slide' || transitionType === 'slide') {
        if (axis === 'horizontal') {
          if (isActive) return { transform: 'translateX(0%)' }
          if (isPrev) return { transform: 'translateX(-100%)' }
          if (isNext) return { transform: 'translateX(100%)' }
          return { transform: slideIndex < currentIndex ? 'translateX(-100%)' : 'translateX(100%)' }
        } else {
          if (isActive) return { transform: 'translateY(0%)' }
          if (isPrev) return { transform: 'translateY(-100%)' }
          if (isNext) return { transform: 'translateY(100%)' }
          return { transform: slideIndex < currentIndex ? 'translateY(-100%)' : 'translateY(100%)' }
        }
      }

      if (variant === 'zoom' || transitionType === 'scale') {
        if (isActive) return { transform: 'scale(1)', opacity: 1 }
        return { transform: 'scale(0.9)', opacity: 0 }
      }

      if (variant === 'stacked') {
        const offset = (slideIndex - currentIndex) * 20
        const scale = isActive ? 1 : 0.9
        const zIndex = totalSlides - Math.abs(slideIndex - currentIndex)
        return {
          transform: `translateX(${offset}px) scale(${scale})`,
          zIndex,
          opacity: Math.abs(slideIndex - currentIndex) > 2 ? 0 : 1,
        }
      }

      if (variant === 'coverflow') {
        const rotateY = isActive ? 0 : isPrev ? -45 : isNext ? 45 : 0
        const translateZ = isActive ? 0 : -200
        const translateX = (slideIndex - currentIndex) * 100
        return {
          transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
          opacity: Math.abs(slideIndex - currentIndex) > 1 ? 0 : 1,
        }
      }

      return {}
    }

    const getOpacity = () => {
      if (variant === 'fade' || transitionType === 'fade') {
        return isActive ? 1 : 0
      }
      return 1
    }

    const customStyles: React.CSSProperties = {
      backgroundColor: slideBackgroundColor,
      borderRadius: slideBorderRadius,
      padding: slidePadding,
      boxShadow: slideBoxShadow,
      borderColor: slideBorderColor,
      borderWidth: slideBorderWidth,
      borderStyle: slideBorderStyle,
      transition: `all ${duration}ms ease-in-out`,
      opacity: getOpacity(),
      ...getTransform(),
      ...style,
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, className)}
        style={customStyles}
        aria-hidden={!isActive}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === 'img') {
            return React.cloneElement(child as React.ReactElement, {
              style: {
                width: '100%',
                height: '100%',
                objectFit: imageMode,
                ...child.props.style,
              },
            })
          }
          return child
        })}
      </div>
    )
  }
)

CarouselSlide.displayName = 'CarouselSlide'

export interface CarouselControlsProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'inside' | 'outside' | 'center' | 'corners'
  children: React.ReactNode
}

const CarouselControls = React.forwardRef<HTMLDivElement, CarouselControlsProps>(
  ({ className, position = 'center', children, style, ...props }, ref) => {
    const positionStyles = {
      inside: 'absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-10',
      outside: 'absolute -inset-x-12 top-1/2 -translate-y-1/2 flex justify-between z-10',
      center: 'absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 z-10',
      corners: 'absolute inset-0 z-10',
    }

    return (
      <div ref={ref} className={cn(positionStyles[position], className)} style={style} {...props}>
        {children}
      </div>
    )
  }
)

CarouselControls.displayName = 'CarouselControls'

export interface CarouselButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
}

const CarouselPrev = React.forwardRef<HTMLButtonElement, CarouselButtonProps>(
  ({ className, icon, style, ...props }, ref) => {
    const {
      prev,
      currentIndex,
      loop,
      controlBackgroundColor,
      controlHoverBackgroundColor,
      controlActiveBackgroundColor,
      controlTextColor,
      controlHoverTextColor,
      controlActiveTextColor,
      controlSize,
      controlBorderRadius,
      controlPadding,
      controlBoxShadow,
      controlBorderColor,
      controlBorderWidth,
      controlBorderStyle,
      controlOpacity,
      controlHoverOpacity,
      focusRingColor,
      focusRingWidth,
      focusRingOffset,
      focusRingOffsetColor,
    } = useCarousel()

    const [isHovered, setIsHovered] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const disabled = !loop && currentIndex === 0

    const defaultIcon = (
      <svg
        width={controlSize || '24'}
        height={controlSize || '24'}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    )

    const customStyles: React.CSSProperties = {
      backgroundColor: isActive
        ? controlActiveBackgroundColor || '#1f2937'
        : isHovered
          ? controlHoverBackgroundColor || '#374151'
          : controlBackgroundColor || '#4b5563',
      color: isActive
        ? controlActiveTextColor || '#ffffff'
        : isHovered
          ? controlHoverTextColor || '#ffffff'
          : controlTextColor || '#ffffff',
      borderRadius: controlBorderRadius || '50%',
      padding: controlPadding || '0.5rem',
      boxShadow: controlBoxShadow || '0 2px 4px rgba(0, 0, 0, 0.1)',
      borderColor: controlBorderColor,
      borderWidth: controlBorderWidth,
      borderStyle: controlBorderStyle,
      opacity: isHovered ? controlHoverOpacity || '1' : controlOpacity || '0.9',
      '--tw-ring-color': focusRingColor || '#3b82f6',
      '--tw-ring-width': focusRingWidth || '2px',
      '--tw-ring-offset-width': focusRingOffset || '2px',
      '--tw-ring-offset-color': focusRingOffsetColor || '#ffffff',
      transition: 'all 200ms ease-in-out',
      ...style,
    } as React.CSSProperties

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'inline-flex items-center justify-center focus:outline-none focus-visible:ring',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        style={customStyles}
        onClick={prev}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        disabled={disabled}
        aria-label="Previous slide"
        {...props}
      >
        {icon || defaultIcon}
      </button>
    )
  }
)

CarouselPrev.displayName = 'CarouselPrev'

const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselButtonProps>(
  ({ className, icon, style, ...props }, ref) => {
    const {
      next,
      currentIndex,
      totalSlides,
      loop,
      controlBackgroundColor,
      controlHoverBackgroundColor,
      controlActiveBackgroundColor,
      controlTextColor,
      controlHoverTextColor,
      controlActiveTextColor,
      controlSize,
      controlBorderRadius,
      controlPadding,
      controlBoxShadow,
      controlBorderColor,
      controlBorderWidth,
      controlBorderStyle,
      controlOpacity,
      controlHoverOpacity,
      focusRingColor,
      focusRingWidth,
      focusRingOffset,
      focusRingOffsetColor,
    } = useCarousel()

    const [isHovered, setIsHovered] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const disabled = !loop && currentIndex === totalSlides - 1

    const defaultIcon = (
      <svg
        width={controlSize || '24'}
        height={controlSize || '24'}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    )

    const customStyles: React.CSSProperties = {
      backgroundColor: isActive
        ? controlActiveBackgroundColor || '#1f2937'
        : isHovered
          ? controlHoverBackgroundColor || '#374151'
          : controlBackgroundColor || '#4b5563',
      color: isActive
        ? controlActiveTextColor || '#ffffff'
        : isHovered
          ? controlHoverTextColor || '#ffffff'
          : controlTextColor || '#ffffff',
      borderRadius: controlBorderRadius || '50%',
      padding: controlPadding || '0.5rem',
      boxShadow: controlBoxShadow || '0 2px 4px rgba(0, 0, 0, 0.1)',
      borderColor: controlBorderColor,
      borderWidth: controlBorderWidth,
      borderStyle: controlBorderStyle,
      opacity: isHovered ? controlHoverOpacity || '1' : controlOpacity || '0.9',
      '--tw-ring-color': focusRingColor || '#3b82f6',
      '--tw-ring-width': focusRingWidth || '2px',
      '--tw-ring-offset-width': focusRingOffset || '2px',
      '--tw-ring-offset-color': focusRingOffsetColor || '#ffffff',
      transition: 'all 200ms ease-in-out',
      ...style,
    } as React.CSSProperties

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'inline-flex items-center justify-center focus:outline-none focus-visible:ring',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        style={customStyles}
        onClick={next}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        disabled={disabled}
        aria-label="Next slide"
        {...props}
      >
        {icon || defaultIcon}
      </button>
    )
  }
)

CarouselNext.displayName = 'CarouselNext'

export interface CarouselIndicatorsProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'inside' | 'outside' | 'bottom' | 'top'
  icon?: React.ReactNode
}

const CarouselIndicators = React.forwardRef<HTMLDivElement, CarouselIndicatorsProps>(
  ({ className, position = 'bottom', icon, style, ...props }, ref) => {
    const {
      currentIndex,
      totalSlides,
      goTo,
      indicatorBackgroundColor,
      indicatorActiveBackgroundColor,
      indicatorHoverBackgroundColor,
      indicatorSize,
      indicatorBorderRadius,
      indicatorMargin,
      indicatorBoxShadow,
      indicatorBorderColor,
      indicatorBorderWidth,
      indicatorBorderStyle,
      indicatorOpacity,
      indicatorActiveOpacity,
    } = useCarousel()

    const positionStyles = {
      inside: 'absolute bottom-4 left-1/2 -translate-x-1/2 z-10',
      outside: 'absolute -bottom-8 left-1/2 -translate-x-1/2 z-10',
      bottom: 'absolute bottom-2 left-1/2 -translate-x-1/2 z-10',
      top: 'absolute top-2 left-1/2 -translate-x-1/2 z-10',
    }

    return (
      <div
        ref={ref}
        className={cn('flex gap-2', positionStyles[position], className)}
        style={style}
        aria-label="Slide indicators"
        {...props}
      >
        {Array.from({ length: totalSlides }, (_, index) => (
          <IndicatorButton
            key={index}
            index={index}
            currentIndex={currentIndex}
            goTo={goTo}
            icon={icon}
            indicatorActiveBackgroundColor={indicatorActiveBackgroundColor}
            indicatorHoverBackgroundColor={indicatorHoverBackgroundColor}
            indicatorBackgroundColor={indicatorBackgroundColor}
            indicatorSize={indicatorSize}
            indicatorBorderRadius={indicatorBorderRadius}
            indicatorMargin={indicatorMargin}
            indicatorBoxShadow={indicatorBoxShadow}
            indicatorBorderColor={indicatorBorderColor}
            indicatorBorderWidth={indicatorBorderWidth}
            indicatorBorderStyle={indicatorBorderStyle}
            indicatorOpacity={indicatorOpacity}
            indicatorActiveOpacity={indicatorActiveOpacity}
          />
        ))}
      </div>
    )
  }
)

CarouselIndicators.displayName = 'CarouselIndicators'

// Separate component for indicator button to handle state
interface IndicatorButtonProps {
  index: number
  currentIndex: number
  goTo: (index: number) => void
  icon?: React.ReactNode
  indicatorActiveBackgroundColor?: string
  indicatorHoverBackgroundColor?: string
  indicatorBackgroundColor?: string
  indicatorSize?: string
  indicatorBorderRadius?: string
  indicatorMargin?: string
  indicatorBoxShadow?: string
  indicatorBorderColor?: string
  indicatorBorderWidth?: string
  indicatorBorderStyle?: string
  indicatorOpacity?: string
  indicatorActiveOpacity?: string
}

const IndicatorButton: React.FC<IndicatorButtonProps> = ({
  index,
  currentIndex,
  goTo,
  icon,
  indicatorActiveBackgroundColor,
  indicatorHoverBackgroundColor,
  indicatorBackgroundColor,
  indicatorSize,
  indicatorBorderRadius,
  indicatorMargin,
  indicatorBoxShadow,
  indicatorBorderColor,
  indicatorBorderWidth,
  indicatorBorderStyle,
  indicatorOpacity,
  indicatorActiveOpacity,
}) => {
  const isActive = currentIndex === index
  const [isHovered, setIsHovered] = useState(false)

  const customStyles: React.CSSProperties = {
    backgroundColor: isActive
      ? indicatorActiveBackgroundColor || '#1f2937'
      : isHovered
        ? indicatorHoverBackgroundColor || '#6b7280'
        : indicatorBackgroundColor || '#9ca3af',
    width: indicatorSize || (isActive ? '2rem' : '0.5rem'),
    height: indicatorSize || '0.5rem',
    borderRadius: indicatorBorderRadius || '9999px',
    margin: indicatorMargin,
    boxShadow: indicatorBoxShadow,
    borderColor: indicatorBorderColor,
    borderWidth: indicatorBorderWidth,
    borderStyle: indicatorBorderStyle,
    opacity: isActive ? indicatorActiveOpacity || '1' : indicatorOpacity || '0.5',
    transition: 'all 300ms ease-in-out',
    cursor: 'pointer',
  }

  return (
    <button
      type="button"
      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      style={customStyles}
      onClick={() => goTo(index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Go to slide ${index + 1}`}
      aria-current={isActive}
    >
      {icon && <span className="sr-only">Slide {index + 1}</span>}
    </button>
  )
}

// Export compound components
export { Carousel, CarouselSlide, CarouselControls, CarouselPrev, CarouselNext, CarouselIndicators }
