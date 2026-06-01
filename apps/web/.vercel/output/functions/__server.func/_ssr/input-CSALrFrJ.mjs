import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as LoaderCircle } from "../_libs/lucide-react.mjs";
const variantStyles = {
  primary: "bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/5",
  secondary: "bg-white/5 hover:bg-white/10 text-white border border-white/5 hover:border-white/10",
  ghost: "hover:bg-white/5 text-gray-400 hover:text-white",
  destructive: "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/10",
  outline: "border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white",
  accent: "bg-accent/15 hover:bg-accent/25 text-accent border border-accent/20 hover:border-accent/30 shadow-lg shadow-accent/5"
};
const sizeStyles = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2.5"
};
const Button = reactExports.forwardRef(
  ({
    variant = "primary",
    size = "md",
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className = "",
    disabled,
    children,
    ...props
  }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] disabled:active:scale-100";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        ref,
        disabled: disabled || isLoading,
        className: `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} ${className}`,
        ...props,
        children: [
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : leftIcon,
          children,
          !isLoading && rightIcon
        ]
      }
    );
  }
);
Button.displayName = "Button";
const Input = reactExports.forwardRef(
  ({
    leftIcon,
    rightIcon,
    error,
    fullWidth = true,
    className = "",
    disabled,
    ...props
  }, ref) => {
    const baseStyles = "bg-black/20 border rounded-xl text-white placeholder:text-gray-600 focus:outline-none transition-colors";
    const borderStyles = error ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-white/20";
    const paddingStyles = `${leftIcon ? "pl-10" : "pl-4"} ${rightIcon ? "pr-10" : "pr-4"} py-2.5`;
    const disabledStyles = disabled ? "cursor-not-allowed opacity-75" : "";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative ${fullWidth ? "w-full" : ""}`, children: [
      leftIcon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none", children: leftIcon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref,
          disabled,
          className: `${baseStyles} ${borderStyles} ${paddingStyles} ${disabledStyles} ${fullWidth ? "w-full" : ""} ${className}`,
          ...props
        }
      ),
      rightIcon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500", children: rightIcon }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-xs text-red-400", children: error })
    ] });
  }
);
Input.displayName = "Input";
export {
  Button as B,
  Input as I
};
