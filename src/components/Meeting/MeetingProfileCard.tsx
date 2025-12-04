import { Card, Text, Box, VStack, HStack } from '@vapor-ui/core'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface MeetingProfileCardProps {
  residence?: string
  gender?: string
  ageRange?: string
  location?: string
  message?: string
  avatarInitial?: string
}

export const MeetingProfileCard = ({
  residence = '제주 5년 이상 거주',
  gender = '남성',
  ageRange = '30대',
  location = '성산',
  message = '네트워킹 합시다!',
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
            <AvatarFallback>{avatarInitial}</AvatarFallback>
          </Avatar>
        </Box>

        <VStack>
          <Text typography="body2" foreground="normal-200">
            • {residence}
          </Text>
          <Text typography="body2" foreground="normal-200">
            • {gender}, {ageRange}
          </Text>
          <Text typography="body2" foreground="normal-200">
            • 거주지: {location}
          </Text>
          <Text typography="body2" foreground="normal-200">
            • 한마디: {message}
          </Text>
        </VStack>
      </HStack>
    </Card.Root>
  )
}
