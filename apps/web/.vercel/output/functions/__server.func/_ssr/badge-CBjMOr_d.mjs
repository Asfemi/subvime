import { j as jsxRuntimeExports } from "../_libs/react.mjs";
const variantStyles = {
  default: "bg-white/10 text-gray-300 border-white/10",
  success: "bg-green-500/10 text-green-400 border-green-500/20",
  warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  error: "bg-red-500/10 text-red-400 border-red-500/20",
  info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  accent: "bg-accent/10 text-accent border-accent/20"
};
const dotStyles = {
  default: "bg-gray-400",
  success: "bg-green-400",
  warning: "bg-yellow-400",
  error: "bg-red-400",
  info: "bg-blue-400",
  accent: "bg-accent"
};
const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs"
};
function Badge({
  variant = "default",
  size = "sm",
  dot = false,
  children,
  className = "",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1.5 rounded-full border font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`,
      ...props,
      children: [
        dot && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `w-1.5 h-1.5 rounded-full ${dotStyles[variant]}`
          }
        ),
        children
      ]
    }
  );
}
export {
  Badge as B
};
