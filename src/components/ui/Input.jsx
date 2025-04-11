

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon,
  required = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPasswordType = type === "password"
  const inputType = isPasswordType ? (showPassword ? "text" : "password") : type

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-500">{icon}</span>
        )}

        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          className={`
            w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900
            transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none
            disabled:cursor-not-allowed disabled:opacity-70
            dark:border-gray-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-purple-800
            ${icon ? "pl-10" : ""}
            ${isPasswordType ? "pr-10" : ""}
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""}
          `}
          {...props}
        />

        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default Input
