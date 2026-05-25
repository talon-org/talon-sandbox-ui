import {
  useRef,
  useState,
  useId,
  useCallback,
  useMemo,
  useEffect,
  type KeyboardEvent,
} from 'react';
import {
  useFloating,
  useListNavigation,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  offset,
  flip,
  size as floatingSize,
  autoUpdate,
} from '@floating-ui/react';
import { cx } from '../../primitives/clsx.js';
import { useFormField } from '../../primitives/FormFieldContext.js';
import type { ComboboxProps, ComboboxOption } from './Combobox.types.js';

/**
 * Combobox — searchable select with a Floating UI positioned dropdown.
 *
 * Internal-filter mode (default):
 *   <Combobox options={allOptions} value={val} onChange={setVal} />
 *
 * External-filter mode (async/server search):
 *   <Combobox
 *     options={filteredOptions}
 *     filterExternal
 *     onQueryChange={(q) => fetchOptions(q)}
 *     value={val}
 *     onChange={setVal}
 *   />
 */
export function Combobox({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  filterExternal = false,
  onQueryChange,
  placeholder = 'Select…',
  disabled = false,
  size = 'md',
  emptyLabel = 'No options',
  id: idProp,
  name,
  className,
  loading = false,
}: ComboboxProps) {
  const field = useFormField();
  const generatedId = useId();
  const resolvedId = idProp ?? field?.controlId ?? generatedId;
  const hasError = field?.hasError ?? false;

  // ── controlled/uncontrolled value ─────────────────────────────────
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string>(defaultValue ?? '');
  const selectedValue = isControlled ? (controlledValue ?? '') : internalValue;

  const selectedOption = useMemo(
    () => options.find((o) => o.value === selectedValue) ?? null,
    [options, selectedValue],
  );

  // ── input / query ──────────────────────────────────────────────────
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  // When closed, the input displays the selected label.
  // When open, it displays the query.
  const inputDisplayValue = isOpen ? query : (selectedOption?.label ?? '');

  const filteredOptions = useMemo(() => {
    if (filterExternal || !isOpen) return options;
    const q = query.toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query, filterExternal, isOpen]);

  // ── list navigation ───────────────────────────────────────────────
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<Array<HTMLElement | null>>([]);

  // ── floating ──────────────────────────────────────────────────────
  const { refs, floatingStyles, context } = useFloating<HTMLInputElement>({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip({ padding: 8 }),
      floatingSize({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
        padding: 8,
      }),
    ],
  });

  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
  });

  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    listNavigation,
    dismiss,
    role,
  ]);

  // ── callbacks ─────────────────────────────────────────────────────
  const openDropdown = useCallback(() => {
    setQuery('');
    setActiveIndex(null);
    setIsOpen(true);
  }, []);

  const selectOption = useCallback(
    (opt: ComboboxOption) => {
      if (opt.disabled) return;
      if (!isControlled) setInternalValue(opt.value);
      onChange?.(opt.value);
      setIsOpen(false);
      setQuery('');
    },
    [isControlled, onChange],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      onQueryChange?.(e.target.value);
      if (!isOpen) setIsOpen(true);
    },
    [isOpen, onQueryChange],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        if (activeIndex !== null && filteredOptions[activeIndex] != null) {
          selectOption(filteredOptions[activeIndex]!);
        }
        e.preventDefault();
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      } else if (e.key === 'Tab') {
        setIsOpen(false);
      }
    },
    [activeIndex, filteredOptions, selectOption],
  );

  // sync query with external options (filterExternal mode: reset active on options change)
  useEffect(() => {
    setActiveIndex(null);
  }, [filteredOptions]);

  return (
    <div className={cx('tln-combobox', `tln-combobox--${size}`, className)}>
      {/* hidden native select for form participation */}
      {name != null && (
        <select name={name} value={selectedValue} onChange={() => {}} tabIndex={-1} aria-hidden="true"
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}>
          <option value="" />
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      )}

      {/* trigger input */}
      <div
        className={cx(
          'tln-combobox__input-wrap',
          hasError && 'is-invalid',
          disabled && 'is-disabled',
          isOpen && 'is-open',
        )}
      >
        <input
          ref={refs.setReference}
          id={resolvedId}
          type="text"
          role="combobox"
          className="tln-combobox__input"
          value={inputDisplayValue}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls={isOpen ? `${resolvedId}-listbox` : undefined}
          aria-activedescendant={
            activeIndex !== null ? `${resolvedId}-option-${activeIndex}` : undefined
          }
          aria-invalid={hasError || undefined}
          onChange={handleInputChange}
          onFocus={openDropdown}
          onKeyDown={handleKeyDown}
          {...getReferenceProps()}
        />
        <span className="tln-combobox__chevron" aria-hidden="true">
          {loading ? (
            <span className="tln-combobox__loading" />
          ) : (
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      </div>

      {/* dropdown portal */}
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            id={`${resolvedId}-listbox`}
            role="listbox"
            className="tln-combobox__listbox"
            style={floatingStyles}
            aria-label="Options"
            {...getFloatingProps()}
          >
            {filteredOptions.length === 0 ? (
              <div className="tln-combobox__empty">{emptyLabel}</div>
            ) : (
              filteredOptions.map((opt, i) => (
                <div
                  key={opt.value}
                  id={`${resolvedId}-option-${i}`}
                  role="option"
                  aria-selected={opt.value === selectedValue}
                  aria-disabled={opt.disabled}
                  className={cx(
                    'tln-combobox__option',
                    opt.value === selectedValue && 'is-selected',
                    i === activeIndex && 'is-active',
                    opt.disabled && 'is-disabled',
                  )}
                  ref={(node) => { listRef.current[i] = node; }}
                  {...getItemProps({
                    onClick: () => selectOption(opt),
                  })}
                >
                  {opt.label}
                  {opt.value === selectedValue && (
                    <span className="tln-combobox__check" aria-hidden="true">✓</span>
                  )}
                </div>
              ))
            )}
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}
