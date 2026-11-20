import { BaseSyntheticEvent, useCallback } from "react";

interface Props {
  label: string;
  value: string;
  onChange: (val: string) => void;
  infoText?: string;
  placeholder: string;
}
export default function TextInput({
  value,
  placeholder,
  onChange,
  label,
  infoText,
}: Props) {
  const handleChange = useCallback(
    (e: BaseSyntheticEvent) => {
      onChange(e.target.value || "");
    },
    [onChange]
  );
  return (
    <div className="flex flex-col">
      <label className="font-bold text-neutral mb-2">{label}</label>
      <input
        className="mb-2 px-5 py-3 text-base-100 rounded placeholder:text-neutral-content"
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
      />
      {infoText && <label className="text-sm">{infoText}</label>}
    </div>
  );
}
