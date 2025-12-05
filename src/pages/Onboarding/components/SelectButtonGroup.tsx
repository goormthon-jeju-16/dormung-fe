import { Button, HStack, VStack, Box, Text } from '@vapor-ui/core'

interface SelectButtonGroupProps {
  label: string
  options: Array<{ id: string; label: string }>
  selectedValue?: string | null // 단일 선택
  selectedValues?: string[] // 다중 선택
  onSelect?: (value: string) => void
  onSelectMultiple?: (values: string[]) => void // 다중 선택
  gap?: string
  multiLine?: boolean
  helperText?: string
  showHash?: boolean
  multiple?: boolean
}

export const SelectButtonGroup = ({
  label,
  options,
  selectedValue,
  selectedValues,
  onSelect,
  onSelectMultiple,
  gap = '$100',
  multiLine = false,
  helperText,
  showHash = false,
  multiple = false,
}: SelectButtonGroupProps) => {
  const isSelected = (optionId: string) => {
    if (multiple) {
      return selectedValues?.includes(optionId) ?? false
    }
    return selectedValue === optionId
  }

  const handleClick = (optionId: string) => {
    if (multiple && onSelectMultiple) {
      const currentValues = selectedValues ?? []
      const newValues = currentValues.includes(optionId)
        ? currentValues.filter(id => id !== optionId)
        : [...currentValues, optionId]
      onSelectMultiple(newValues)
    } else if (!multiple && onSelect) {
      onSelect(optionId)
    }
  }

  return (
    <VStack>
      <Box marginBottom="$100">
        <Text typography="heading5">{label}</Text>
        {helperText && (
          <Text
            typography="body2"
            style={{
              marginTop: '4px',
              color: 'var(--vapor-color-foreground-primary-200)',
              whiteSpace: 'pre-line',
            }}
          >
            {helperText}
          </Text>
        )}
      </Box>

      <VStack className="gap-4">
        {multiLine ? (
          <Box
            display="flex"
            gap={gap}
            width="100%"
            style={{ flexWrap: 'wrap' }}
          >
            {options.map(option => (
              <Button
                key={option.id}
                variant="fill"
                size="md"
                style={{
                  backgroundColor: isSelected(option.id)
                    ? 'var(--vapor-color-background-primary-200)'
                    : 'var(--vapor-color-background-secondary-100)',
                  borderRadius: 'var(--vapor-size-space-500)',
                }}
                onClick={() => handleClick(option.id)}
              >
                <Text
                  typography="heading6"
                  style={{
                    color: isSelected(option.id)
                      ? 'var(--vapor-color-button-foreground-primary)'
                      : 'var(--vapor-color-foreground-secondary-100)',
                  }}
                >
                  {showHash ? `#${option.label}` : option.label}
                </Text>
              </Button>
            ))}
          </Box>
        ) : (
          <HStack
            gap={gap}
            width="100%"
            style={{ flexWrap: 'wrap', overflow: 'hidden' }}
          >
            {options.map(option => (
              <Button
                key={option.id}
                variant="fill"
                size="md"
                style={{
                  backgroundColor: multiple
                    ? isSelected(option.id)
                      ? 'var(--vapor-color-background-primary-200)'
                      : 'var(--vapor-color-background-secondary-100)'
                    : selectedValue === option.id
                      ? 'var(--vapor-color-background-primary-200)'
                      : 'var(--vapor-color-background-secondary-100)',
                  borderRadius: 'var(--vapor-size-space-500)',
                }}
                onClick={() => handleClick(option.id)}
              >
                <Text
                  typography="heading6"
                  style={{
                    color: isSelected(option.id)
                      ? 'var(--vapor-color-button-foreground-primary)'
                      : 'var(--vapor-color-foreground-secondary-100)',
                  }}
                >
                  {showHash ? `# ${option.label}` : option.label}
                </Text>
              </Button>
            ))}
          </HStack>
        )}
      </VStack>
    </VStack>
  )
}
