import InputLabel from "./InputLabel";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import InputError from "./InputError";
import TextAreaInput from "./TextAreaInput";

export default function InputField(
  {
    id,
    type,
    name,
    value,
    placeholder = null,
    className,
    onChange,
    label,
    error,
    options = null,
    isFocused,
    textArea = false,
  })
{
  return (
    <div className="mt-4">
      {label && <InputLabel htmlFor={id} value={label} />}
      {type === "select" ? (
        <SelectInput
          id={id}
          name={name}
          value={value} // Ensure the value is passed correctly
          className={className}
          onChange={onChange}
        >
          <option value="">Select {label}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectInput>
      ) : textArea ? (
        <TextAreaInput
          id={id}
          name={name}
          value={value}
          className={className}
          onChange={onChange}
          isFocused={isFocused}
          placeholder={placeholder}
        />
      ) : (
        <TextInput
          id={id}
          type={type}
          name={name}
          value={value}
          className={className}
          onChange={onChange}
          isFocused={isFocused}
        />
      )}
      {error && <InputError message={error} className="mt-2" />}
    </div>
  );
}
