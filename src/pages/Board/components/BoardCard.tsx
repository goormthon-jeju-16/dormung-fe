import { Box, Text, VStack } from '@vapor-ui/core'

interface BoardCardProps {
  id: number
  title: string
  content: string
  commentCount: number
  onClick?: () => void
}

export const BoardCard = ({
  title,
  content,
  commentCount,
  onClick,
}: BoardCardProps) => {
  return (
    <Box
      padding="$200"
      onClick={onClick}
      style={{
        borderBottom: '1px solid var(--color-gray-100)',
        borderRadius: 'var(--vapor-size-borderRadius-300)',
        backgroundColor: 'var(--color-background-normal)',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onMouseDown={e => {
        e.currentTarget.style.backgroundColor = 'var(--color-gray-50)'
      }}
      onMouseUp={e => {
        e.currentTarget.style.backgroundColor = 'var(--color-background-normal)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = 'var(--color-background-normal)'
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
            foreground="primary-100"
            style={{
              whiteSpace: 'nowrap',
            }}
          >
            {commentCount}
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}
