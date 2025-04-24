import { X } from "lucide-react";
import Button from "./Button";

export default function Modal({ isOpen, onClose, children, title, footer }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative z-50 w-full max-w-3xl rounded-lg bg-white p-6 shadow-xl dark:bg-zinc-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-600 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        {children}

        {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
}

// Add Footer component as a static property of Modal
Modal.Footer = function Footer({
  onCancel,
  onConfirm,
  cancelText = "Cancel",
  confirmText = "Submit",
  isLoading = false,
}) {
  return (
    <>
      <Button variant="danger">{cancelText}</Button>
      <Button onClick={onConfirm} disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center">
            <svg
              className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </div>
        ) : (
          confirmText
        )}
      </Button>
    </>
  );
};
