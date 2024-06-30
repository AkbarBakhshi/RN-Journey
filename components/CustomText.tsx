import { Text, TextProps, StyleProp, TextStyle } from "react-native";
import { ReactNode } from "react";

interface CustomTextProps extends TextProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

const CustomText = ({ children, style, ...props }: CustomTextProps) => {
  return (
    <Text style={[{fontFamily:"Exo_400Regular"}, style]} {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
