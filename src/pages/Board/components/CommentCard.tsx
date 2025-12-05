import { HStack, VStack, Text } from '@vapor-ui/core'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://goormthon-2.goorm.training/api'

const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  if (imagePath.startsWith('public/')) {
    return `/${imagePath.replace('public/', '')}`
  }
  if (imagePath.startsWith('/')) {
    return `${API_BASE_URL}${imagePath}`
  }
  return `${API_BASE_URL}/${imagePath}`
}

interface CommentCardProps {
  nickname: string
  comment: string
  profileImagePath?: string
}

export const CommentCard = ({
  nickname,
  comment,
  profileImagePath,
}: CommentCardProps) => {
  return (
    <HStack
      style={{
        borderBottom: '1px solid var(--color-gray-50)',
      }}
      alignItems="flex-start"
      gap="$200"
    >
      <Avatar
        style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--vapor-size-borderRadius-300)',
          backgroundColor: '#f5f5f5',
          flexShrink: 0,
        }}
      >
        {profileImagePath && (
          <AvatarImage src={getImageUrl(profileImagePath)} alt={nickname} />
        )}
        <AvatarFallback>{nickname.charAt(0)}</AvatarFallback>
      </Avatar>

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
      profileImagePath?: string
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
          profileImagePath={comment.user.profileImagePath}
        />
      ))}
    </VStack>
  )
}
