import { Box, Text, VStack } from '@vapor-ui/core'

interface BoardCardProps {
  id: number
  title: string
  content: string
  commentCount: number
}

export const BoardCard = ({ title, content, commentCount }: BoardCardProps) => {
  return (
    <Box
      padding="$200"
      style={{
        borderBottom: '1px solid var(--color-gray-50)',
        backgroundColor: 'var(--color-background-normal)',
      }}
    >
      <VStack gap="$100">
        <Text typography="heading5">{title}</Text>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          gap="$200"
        >
          <Text
            typography="body1"
            foreground="secondary-100"
            style={{ flex: 1 }}
          >
            {content}
          </Text>
          <Text
            typography="heading6"
            style={{
              whiteSpace: 'nowrap',
              color: 'var(--color-brand-400)',
            }}
          >
            {commentCount}
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}
