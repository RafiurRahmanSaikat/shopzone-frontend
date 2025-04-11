"use client"

import { X } from "lucide-react"
import Button from "./Button"

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlayClick = true,
  className = "",
  ...props
}) => {
  if (!isOpen) return null

  // Size styles
  const sizeStyles = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4",
  }

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
      onClick={handleOverlayClick}
    >
      <div
        className={`
          relative w-full rounded-lg bg-white shadow-xl transition-all dark:bg-zinc-900
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-zinc-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:text-gray-500 dark:hover:bg-zinc-800 dark:hover:text-gray-400"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">{children}</div>

        {/* Footer */}
        {footer && <div className="border-t border-gray-200 px-6 py-4 dark:border-zinc-700">{footer}</div>}
      </div>
    </div>
  )
}

// Preset footer with cancel/confirm buttons
Modal.Footer = ({
  onCancel,
  onConfirm,
  cancelText = "Cancel",
  confirmText = "Confirm",
  confirmVariant = "primary",
  isLoading = false,
  ...props
}) => (
  <div className="flex justify-end space-x-2" {...props}>
    <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
      {cancelText}
    </Button>
    <Button variant={confirmVariant} onClick={onConfirm} isLoading={isLoading}>
      {confirmText}
    </Button>
  </div>
)

export default Modal
