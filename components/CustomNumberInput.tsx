import { TextInput, TextInputProps, View, Text } from "react-native";

interface CustomNumberInputProps
  extends Omit<TextInputProps, "value" | "onChangeText"> {
  value: number;
  label: string;
  onChangeValue: (value: number) => void;
}

const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
  value,
  label,
  onChangeValue,
  ...props
}) => {
  const handleChange = (text: string) => {
    const numericValue = parseInt(text, 10);
    if (!isNaN(numericValue)) {
      onChangeValue(numericValue);
    } else {
      onChangeValue(0); // Fallback to 0 if the input is not a number
    }
  };

  return (
    <View>
        <Text className="text-xl mb-1 text-foreground">{label}</Text>
        <TextInput
          className="border border-gray-700 rounded-xl p-4 mb-6 text-white bg-gray-800 placeholder:text-white"
          keyboardType="numeric"
          value={value.toString()}
          onChangeText={handleChange}
          {...props}
        />
    </View>
  );
};

export default CustomNumberInput;