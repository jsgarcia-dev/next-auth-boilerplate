import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";
import { ReactNode } from "react";

type FormInputProps<T extends FieldValues> =
  React.ComponentPropsWithRef<"input"> & {
    control: Control<T>;
    name: Path<T>;
    label: string;
    isPending?: boolean;
    icon?: ReactNode;
  };

export const FormInput = <T extends FieldValues>(props: FormInputProps<T>) => {
  const {
    control,
    name,
    label,
    isPending,
    disabled,
    icon,
    className,
    ...rest
  } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              {icon && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  {icon}
                </div>
              )}
              <Input
                {...field}
                {...rest}
                className={cn(
                  icon && "pl-10",
                  fieldState.error && "border-red-500",
                  className
                )}
                disabled={isPending || disabled}
              />
            </div>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};
