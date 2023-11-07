import { Button, IButtonProps } from "native-base";
import { ReactNode } from "react";

interface ButtonProps extends IButtonProps {
  children: ReactNode;
  autoSize?: boolean;
  color?: string;
}

export function Botao({
  children,
  autoSize = false,
  color,
  ...rest
}: ButtonProps) {
  return (
    <Button
      w={autoSize ? "auto" : "100%"}
      // bg={color || "blue.800"}
      mt={7}
      borderRadius="lg"
      _text={{ color: "white" }}
      shadow={3}
      {...rest}
    >
      {children}
    </Button>
  );
}
