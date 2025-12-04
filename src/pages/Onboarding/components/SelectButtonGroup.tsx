import { Button, HStack, VStack, Box, Text } from '@vapor-ui/core'

interface SelectButtonGroupProps {
  label: string
  options: Array<{ id: string; label: string }>
  selectedValue: string | null
  onSelect: (value: string) => void
  gap?: string
  multiLine?: boolean
  helperText?: string
  showHash?: boolean
}

export const SelectButtonGroup = ({
  label,
  options,
  selectedValue,
  onSelect,
  gap = '$100',
  multiLine = false,
  helperText,
  showHash = false,
}: SelectButtonGroupProps) => {
  return (
    <VStack>
      <Box marginBottom="$100">
        <Text typography="heading5">{label}</Text>
        <br />
        {helperText && (
          <Text
            typography="body2"
            style={{
              marginTop: '4px',
              color: 'var(--vapor-color-foreground-primary-200)',
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
                  backgroundColor:
                    selectedValue === option.id
                      ? 'var(--vapor-color-background-primary-300)'
                      : 'var(--vapor-color-background-secondary-100)',
                  color:
                    selectedValue === option.id
                      ? 'var(--vapor-color-foreground-inverse)'
                      : 'var(--vapor-color-foreground-secondary-100)',
                  borderRadius: 'var(--vapor-size-space-500)',
                }}
                onClick={() => onSelect(option.id)}
              >
                {showHash ? `#${option.label}` : option.label}
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
                  backgroundColor:
                    selectedValue === option.id
                      ? 'var(--vapor-color-background-primary-200)'
                      : 'var(--vapor-color-background-secondary-100)',
                  color:
                    selectedValue === option.id
                      ? 'var(--vapor-color-button-foreground-primary)'
                      : 'var(--vapor-color-foreground-secondary-100)',
                  borderRadius: 'var(--vapor-size-space-500)',
                }}
                onClick={() => onSelect(option.id)}
              >
                <Text typography="heading6">
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
