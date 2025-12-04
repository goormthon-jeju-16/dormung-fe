import { Button, HStack, Text, VStack, Box } from '@vapor-ui/core'

interface SelectButtonGroupProps {
  label: string
  options: Array<{ id: string; label: string }>
  selectedValue: string | null
  onSelect: (value: string) => void
  gap?: string
  multiLine?: boolean
}

export const SelectButtonGroup = ({
  label,
  options,
  selectedValue,
  onSelect,
  gap = '$100',
  multiLine = false,
}: SelectButtonGroupProps) => {
  return (
    <VStack className="gap-4">
      <Text render={<h5 />} foreground="secondary-100">
        {label}
      </Text>
      {multiLine ? (
        <Box display="flex" gap={gap} width="100%" style={{ flexWrap: 'wrap' }}>
          {options.map(option => (
            <Button
              key={option.id}
              variant="fill"
              size="md"
              style={{
                backgroundColor:
                  selectedValue === option.id ? '#3b82f6' : '#e5e7eb',
                color: selectedValue === option.id ? '#ffffff' : '#374151',
                borderRadius: 'var(--vapor-size-space-500)',
              }}
              onClick={() => onSelect(option.id)}
            >
              {option.label}
            </Button>
          ))}
        </Box>
      ) : (
        // 한 줄로 배치
        <HStack gap={gap}>
          {options.map(option => (
            <Box display="inline-block">
              <Button
                variant="fill"
                size="md"
                style={{
                  backgroundColor:
                    selectedValue === option.id ? '#3b82f6' : '#e5e7eb',
                  color: selectedValue === option.id ? '#ffffff' : '#374151',
                  borderRadius: 'var(--vapor-size-space-500)',
                }}
                onClick={() => onSelect(option.id)}
              >
                {option.label}
              </Button>
            </Box>
          ))}
        </HStack>
      )}
    </VStack>
  )
}
