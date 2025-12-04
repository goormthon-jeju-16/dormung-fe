import { Card, Text, Box, VStack, HStack } from '@vapor-ui/core'
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

interface MeetingProfileCardProps {
  nickname?: string
  profileImagePath?: string
  residence?: string
  location?: string
  message?: string
  avatarInitial?: string
}

export const MeetingProfileCard = ({
  nickname,
  profileImagePath,
  residence,
  location,
  message,
  avatarInitial = '1',
}: MeetingProfileCardProps) => {
  return (
    <Card.Root
      style={{
        border: '1px solid var(--color-border-normal)',
        backgroundColor: '#ffffff',
        borderRadius: 'var(--vapor-size-borderRadius-300)',
        width: '100%',
      }}
    >
      <HStack gap="var(--vapor-size-space-400)">
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar
            className="rounded-md"
            style={{
              width: '88px',
              height: '88px',
              backgroundColor: '#f5f5f5',
              border: '1px dashed var(--color-border-normal)',
            }}
          >
            {profileImagePath && (
              <AvatarImage src={getImageUrl(profileImagePath)} alt={nickname} />
            )}
            <AvatarFallback>{nickname?.[0] || avatarInitial}</AvatarFallback>
          </Avatar>
        </Box>

        <VStack>
          {nickname && (
            <Text typography="body2" foreground="normal-200">
              • 닉네임: {nickname}
            </Text>
          )}
          {residence && (
            <Text typography="body2" foreground="normal-200">
              • {residence}
            </Text>
          )}
          {location && (
            <Text typography="body2" foreground="normal-200">
              • 거주지: {location}
            </Text>
          )}
          {message && (
            <Text typography="body2" foreground="normal-200">
              • 한마디: {message}
            </Text>
          )}
        </VStack>
      </HStack>
    </Card.Root>
  )
}
