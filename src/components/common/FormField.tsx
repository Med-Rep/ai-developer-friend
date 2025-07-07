
import React from 'react';
import { Label } from '@/components/ui/label';
import { VoiceSearchInput } from './VoiceSearchInput';
import { EnhancedTextarea } from './EnhancedTextarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'textarea' | 'select';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  context?: 'search' | 'legal' | 'procedure' | 'general';
  enableVoice?: boolean;
  required?: boolean;
  className?: string;
}

export function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  options = [],
  context = 'general',
  enableVoice = true,
  required = false,
  className = ""
}: FormFieldProps) {
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <EnhancedTextarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            context={context}
            enableVoice={enableVoice}
            className={className}
          />
        );
      case 'select':
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={className}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return (
          <VoiceSearchInput
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            context={context}
            showVoiceButton={enableVoice}
            className={className}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderInput()}
    </div>
  );
}
