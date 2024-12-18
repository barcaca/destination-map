import { ErrorTooltip } from '@/components/form/error-tooltip'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import type { Country, Region, State } from '@/types/place'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

type Option = Region | Country | State

interface CommandSelectProps {
  items: Option[]
  name: string
  label: string
  emptyMessage?: string
  placeholder?: string
  placeholderSearch?: string
}

export function CommandSelect({
  items,
  name,
  label,
  emptyMessage,
  placeholder,
  placeholderSearch,
}: CommandSelectProps) {
  const { control, setValue, clearErrors } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="relative flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  // biome-ignore lint/a11y/useSemanticElements: <explanation>
                  role="combobox"
                  className={cn(
                    'justify-between',
                    !field.value && 'text-muted-foreground'
                  )}
                  disabled={!items.length}
                >
                  {field.value.name
                    ? items.find(
                        item => item.id.toString() === field.value.id.toString()
                      )?.name
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
              <Command>
                <CommandInput placeholder={placeholderSearch} />
                <CommandList>
                  <CommandEmpty>{emptyMessage}</CommandEmpty>
                  <CommandGroup>
                    {items.map(item => (
                      <CommandItem
                        key={item.id}
                        value={item.name}
                        onSelect={() => {
                          clearErrors(name)
                          setValue(name, {
                            id: item.id,
                            name: item.name,
                          })
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            'mr-2 h-4 w-4',
                            item.name === field.value.name
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {item.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <ErrorTooltip fieldState={fieldState} />
        </FormItem>
      )}
    />
  )
}
