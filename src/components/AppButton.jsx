export default function AppButton({ children, variant = 'default', className = '', ...props }) {
  const variantClass = {
    default: '',
    primary: 'primary',
    blue: 'blue',
    soft: 'soft',
  }[variant] || '';

  return (
    <button {...props} className={`app-button ${variantClass} ${className}`.trim()}>
      {children}
    </button>
  );
}
