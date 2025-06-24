import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Sparkles, Check } from 'lucide-react';

const CustomDropdown = ({
  name,
  value,
  onChange,
  options = [],
  placeholder = "Sélectionnez une option",
  error = null,
  label = null,
  icon: Icon = null
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const optionsRef = useRef([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev =>
          prev < options.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev =>
          prev > 0 ? prev - 1 : options.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0) {
          handleSelect(options[focusedIndex]);
        }
        break;
    }
  };

  const handleSelect = (option) => {
    onChange({
      target: {
        name: name,
        value: option
      }
    });
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const selectedOption = options.find(opt => opt === value);

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          {Icon && <Icon className="w-4 h-4 inline mr-2" />}
          {label}
        </label>
      )}

      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border text-left transition-all duration-300 focus:outline-none ${
            error
              ? 'border-red-500/50 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20'
              : 'border-slate-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 hover:border-slate-500/50'
          }`}
          tabIndex={0}
        >
          <div className="flex items-center justify-between">
            <span className={`${selectedOption ? 'text-white' : 'text-slate-400'}`}>
              {selectedOption || placeholder}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-600/50 rounded-xl shadow-2xl backdrop-blur-sm overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="max-h-60 overflow-y-auto">
              {options.map((option, index) => (
                <div
                  key={index}
                  ref={el => optionsRef.current[index] = el}
                  onClick={() => handleSelect(option)}
                  className={`w-full px-4 py-3 text-left text-white hover:bg-slate-700/50 transition-colors duration-150 flex items-center justify-between cursor-pointer ${
                    focusedIndex === index ? 'bg-slate-700/50' : ''
                  } ${
                    selectedOption === option ? 'bg-blue-500/10' : ''
                  }`}
                  role="option"
                  aria-selected={selectedOption === option}
                >
                  <span className={`${
                    selectedOption === option ? 'text-blue-400 font-medium' : ''
                  }`}>
                    {option}
                  </span>
                  {selectedOption === option && (
                    <Check className="w-4 h-4 text-blue-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
