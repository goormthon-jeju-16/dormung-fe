import { Box, HStack, VStack, Text } from '@vapor-ui/core'
import { MOCK_COMMENTS } from '@/mockdata/boardData'

interface CommentCardProps {
  nickname: string
  comment: string
}

export const CommentCard = ({ nickname, comment }: CommentCardProps) => {
  return (
    <HStack
      style={{
        borderBottom: '1px solid var(--color-gray-50)',
      }}
      alignItems="flex-start"
      gap="$200"
    >
      <Box
        width="48px"
        height="48px"
        borderRadius="var(--vapor-size-borderRadius-300)"
        backgroundColor="$gray-050"
      />

      <VStack gap="$50">
        <Text typography="heading6">{nickname}</Text>
        <Text
          marginBottom="var(--vapor-size-space-200)"
          typography="body2"
          foreground="normal-200"
        >
          {comment}
        </Text>
      </VStack>
    </HStack>
  )
}

export const CommentList = () => {
  return (
    <VStack gap="$200">
      {MOCK_COMMENTS.map(comment => (
        <CommentCard
          key={comment.id}
          nickname={comment.nickname}
          comment={comment.comment}
        />
      ))}
    </VStack>
  )
}
