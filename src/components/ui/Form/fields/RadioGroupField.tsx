import { type Control } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "..";
import RadioGroup, { RadioGroupsProps } from "@/components/ui/RadioGroup";

interface RadioGroupFieldProps extends RadioGroupsProps {
  description?: string;
  loading?: boolean;
  control: Control<any>;
  label: string;
}

export const RadioGroupField = ({
  loading,
  control,
  name,
  label,
  description,
  ...props
}: RadioGroupFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              disabled={loading}
              {...field}
              onValueChange={field.onChange}
              {...props}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
