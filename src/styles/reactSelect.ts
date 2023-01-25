export const reactSelectCustomStyles = {
  menuPortal: (base: any) => ({
    ...base,
    zIndex: 9999,
  }),
  container: (provided: any) => ({
    ...provided,
    maxWidth: '24rem',
  }),
  control: (provided: any, state: { isFocused: any }) => ({
    ...provided,
    cursor: 'text',
    borderRadius: 'var(--rounded-btn)',
    borderWidth: 'var(--border-btn)',
    display: 'flex',
    minHeight: '3rem',
    fontSize: '.875rem',
    lineHeight: '2',
    backgroundColor: 'hsla(var(--b1))',
    ':hover': {
      borderColor: 'hsla(var(--bc)/ 0.2)',
    },
    borderColor: 'hsla(var(--bc)/ 0.2)',
    outline: state.isFocused ? '2px solid transparent' : undefined,
    outlineOffset: '2px',
    boxShadow: state.isFocused
      ? '0 0 0 2px hsl(var(--b1)), 0 0 0 4px hsla(var(--bc) / .2)'
      : undefined,
    transitionProperty:
      'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
    transitionDuration: '.2s',
    transitionTimingFunction: 'cubic-bezier(.4, 0, .2, 1)',
  }),
  loadingIndicator: (provided: any) => ({
    ...provided,
    cursor: 'progress',
    color: 'hsla(var(--bc)/ 0.2)',
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    cursor: 'pointer',
    color: 'hsla(var(--bc)/ 0.2)',
    ':hover': {
      color: 'hsla(var(--bc))',
    },
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    backgroundColor: 'hsl(var(--bc) / 0.2)',
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    cursor: 'pointer',
    color: 'hsla(var(--bc)/ 0.2)',
    ':hover': {
      color: 'hsla(var(--bc))',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    padding: '0.5rem',
    borderRadius: 'var(--rounded-btn)',
    backgroundColor: 'hsl(var(--b2))',
    boxShadow:
      'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  }),
  option: (provided: any, state: { isSelected: any; isFocused: any }) => ({
    ...provided,
    cursor: 'pointer',
    backgroundColor: state.isSelected
      ? 'hsl(var(--p))'
      : state.isFocused
      ? 'hsla(var(--bc) / 0.1)'
      : undefined,
    ':active': {
      backgroundColor: 'hsl(var(--p))',
      color: 'hsl(var(--pc))',
    },
    borderRadius: 'var(--rounded-btn)',
    fontSize: '.875rem',
    padding: '.75rem',
    color: state.isSelected
      ? 'hsl(var(--pc))'
      : state.isFocused
      ? 'hsla(var(--bc))'
      : undefined,
    transitionProperty:
      'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
    transitionDuration: '.15s',
    transitionTimingFunction: 'cubic-bezier(.4, 0, .2, 1)',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'hsl(var(--bc))',
  }),
  multiValue: (provided: any) => ({
    ...provided,
    color: 'hsl(var(--bc))',
    backgroundColor: 'hsl(var(--b2))',
    borderRadius: 'var(--rounded-btn)',
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: 'hsl(var(--bc))',
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    backgroundColor: 'hsl(var(--b2))',
    borderRadius: '0 var(--rounded-btn) var(--rounded-btn) 0',
    ':hover': {
      backgroundColor: 'hsl(var(--er) / 0.3)',
      color: 'hsl(var(--er))',
    },
    transitionProperty: 'background-color, color',
    transitionDuration: '.15s',
    transitionTimingFunction: 'cubic-bezier(.4, 0, .2, 1)',
  }),
}
