import { type Control } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "..";
import Checkbox from "@/components/ui/Checkbox";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  label: string;
  description?: string;
  loading?: boolean;
  control: Control<any>;
};

export const CheckboxField = ({ label, control, name, description }: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center gap-x-2 space-y-0">
          <FormControl>
            <Checkbox
              name={name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>

          <div
            className={cn("leading-3", {
              "space-y-1": description,
            })}
          >
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
};
