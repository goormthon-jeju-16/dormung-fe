import { Box, HStack, VStack, Text } from '@vapor-ui/core'

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

      <VStack gap="$100">
        <Text typography="heading6">{nickname}</Text>
        <Text
          marginBottom="var(--vapor-size-space-075)"
          typography="body2"
          foreground="normal-200"
        >
          {comment}
        </Text>
      </VStack>
    </HStack>
  )
}

interface CommentListProps {
  comments: Array<{
    id: number
    reply: string
    user: {
      nickname: string
    }
  }>
}

export const CommentList = ({ comments }: CommentListProps) => {
  return (
    <VStack gap="$200">
      {comments.map(comment => (
        <CommentCard
          key={comment.id}
          nickname={comment.user.nickname}
          comment={comment.reply}
        />
      ))}
    </VStack>
  )
}
