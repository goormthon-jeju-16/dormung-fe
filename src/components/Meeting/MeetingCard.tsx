import { Card, Text, Button, Box } from '@vapor-ui/core'
import { AvatarGroup } from '@/components/animate-ui/components/animate/avatar-group'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface MeetingCardProps {
  title: string
  duration?: string
  memberCount?: number
  onCheckClick?: () => void
}

export const MeetingCard = ({
  title,
  duration,
  memberCount = 5,
  onCheckClick,
}: MeetingCardProps) => {
  return (
    <Card.Root
      style={{
        border: '1px solid green',
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
        {duration && (
          <Text typography="body2" foreground="secondary-200">
            {duration}
          </Text>
        )}
      </Box>

      <Box
        style={{
          marginBottom: 'var(--vapor-size-space-400)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AvatarGroup>
          {Array.from({ length: memberCount }).map((_, index) => (
            <Avatar
              key={index}
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#f5f5f5',
                border: '1px dashed var(--color-border-normal)',
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
          size="md"
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
