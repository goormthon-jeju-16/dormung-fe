import { Card, Text, Button, Box } from '@vapor-ui/core'
import { AvatarGroup } from '@/components/animate-ui/components/animate/avatar-group'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://goormthon-2.goorm.training/api'

const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  // public/로 시작하는 경우 public 폴더의 정적 파일로 처리
  if (imagePath.startsWith('public/')) {
    return `/${imagePath.replace('public/', '')}`
  }
  if (imagePath.startsWith('/')) {
    return `${API_BASE_URL}${imagePath}`
  }
  return `${API_BASE_URL}/${imagePath}`
}

interface ProfileImageItem {
  id: number
  profileImagePath: string
}

interface MeetingCardProps {
  title: string
  duration?: string
  memberCount?: number
  profileImages?: ProfileImageItem[]
  onCheckClick?: () => void
}

export const MeetingCard = ({
  title,
  duration,
  memberCount = 5,
  profileImages = [],
  onCheckClick,
}: MeetingCardProps) => {
  return (
    <Card.Root
      style={{
        border: '1px solid var(--vapor-color-border-normal)',
        backgroundColor: '#ffffff',
        borderRadius: 'var(--vapor-size-borderRadius-300)',
        padding: 'var(--vapor-size-space-200)',
        width: '100%',
      }}
    >
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--vapor-size-space-300)',
        }}
      >
        <Text typography="heading5" foreground="normal-200">
          {title}
        </Text>
        <Box style={{ display: 'flex', gap: 'var(--vapor-size-space-100)' }}>
          {duration && (
            <Text typography="body2" foreground="secondary-200">
              {duration}
            </Text>
          )}
        </Box>
      </Box>

      <Box
        style={{
          marginBottom: 'var(--vapor-size-space-400)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'visible',
          width: '100%',
          paddingTop: '10px',
          paddingBottom: '10px',
        }}
      >
        <AvatarGroup
          style={{
            maxWidth: '100%',
            overflow: 'visible',
            flexWrap: 'nowrap',
          }}
        >
          {profileImages.length > 0
            ? profileImages.map((item, index) => (
                <Avatar
                  key={item.id}
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#f5f5f5',
                    flexShrink: 0,
                    borderRadius: '50%',
                    overflow: 'hidden',
                  }}
                >
                  <AvatarImage
                    src={getImageUrl(item.profileImagePath)}
                    alt={`Member ${index + 1}`}
                  />
                  <AvatarFallback>{index + 1}</AvatarFallback>
                </Avatar>
              ))
            : Array.from({ length: memberCount }).map((_, index) => (
                <Avatar
                  key={index}
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#f5f5f5',
                    flexShrink: 0,
                    borderRadius: '50%',
                    overflow: 'hidden',
                  }}
                >
                  <AvatarFallback>{index + 1}</AvatarFallback>
                </Avatar>
              ))}
        </AvatarGroup>
      </Box>

      <Box>
        <Button
          colorPalette="primary"
          variant="fill"
          size="lg"
          width="100%"
          onClick={onCheckClick}
          style={{
            paddingTop: '8px',
            paddingBottom: '8px',
            letterSpacing: 'var(--vapor-typography-letterSpacing-100)',
          }}
        >
          확인해보기
        </Button>
      </Box>
    </Card.Root>
  )
}
