import React, { useState, useRef, useEffect } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  maxLength?: number;
}

const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  className = '',
  maxLength = 20
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (tempValue.trim()) {
      onChange(tempValue);
    } else {
      setTempValue(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  return isEditing ? (
    <input
      ref={inputRef}
      type="text"
      value={tempValue}
      onChange={(e) => setTempValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      maxLength={maxLength}
      className={`bg-transparent border-b-2 border-amber-500 outline-none px-1 ${className}`}
    />
  ) : (
    <span
      onDoubleClick={handleDoubleClick}
      className={`cursor-pointer hover:opacity-80 ${className}`}
      title="Double-click to edit"
    >
      {value}
    </span>
  );
};

export default EditableText;