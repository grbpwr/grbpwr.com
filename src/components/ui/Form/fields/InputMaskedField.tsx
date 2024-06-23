import { type Control } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "..";
import InputMask, { InputMaskProps } from "@/components/ui/InputMask";

type Props = InputMaskProps & {
  description?: string;
  loading?: boolean;
  control: Control<any>;
};

export const InputMaskedField = ({
  loading,
  control,
  name,
  label,
  description,
  ...props
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <InputMask disabled={loading} {...field} {...props} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
