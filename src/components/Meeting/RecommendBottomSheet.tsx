import { Sheet, Box, Text, VStack, HStack, Card, Button } from '@vapor-ui/core'
import { MeetingProfileCard } from '@/components/Meeting/MeetingProfileCard'
import { InfoCircleIcon } from '@vapor-ui/icons'

interface RecommendBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  leftButtonText?: string
  rightButtonText?: string
  onRightButtonClick?: () => void
}

export const RecommendBottomSheet = ({
  isOpen,
  onClose,
  leftButtonText = '닫기',
  rightButtonText = '수락하기',
  onRightButtonClick,
}: RecommendBottomSheetProps) => {
  return (
    <Sheet.Root
      open={isOpen}
      onOpenChange={open => {
        if (!open) {
          onClose()
        }
      }}
    >
      <Sheet.Content
        positionerProps={{ side: 'bottom' }}
        overlayProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.68)',
          },
        }}
        style={{
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 'var(--vapor-size-borderRadius-300)',
          borderTopRightRadius: 'var(--vapor-size-borderRadius-300)',
          maxHeight: '90vh',
          minHeight: '50vh',
          overflowY: 'auto',
          width: '100%',
        }}
      >
        <Box
          style={{
            backgroundColor: '#ffffff',
            width: '100%',
            minHeight: '100%',
            paddingTop: 'var(--vapor-size-space-250)',
            paddingBottom: 'var(--vapor-size-space-250)',
            paddingLeft: 'var(--vapor-size-space-250)',
            paddingRight: 'var(--vapor-size-space-250)',
          }}
        >
          <VStack>
            <Text typography="heading5" foreground="normal-200">
              취미/여가 활동
            </Text>
            <HStack alignItems="center" gap="var(--vapor-size-space-100)">
              <Text typography="body1" foreground="normal-200">
                새로 생성된 모임이에요!
              </Text>
              <InfoCircleIcon />
            </HStack>
            <Box
              style={{
                width: '100%',
                height: '1px',
                backgroundColor: 'var(--vapor-color-gray-100)',
                marginTop: 'var(--vapor-size-space-200)',
                marginBottom: 'var(--vapor-size-space-200)',
              }}
            />
            <VStack
              gap="var(--vapor-size-space-500)"
              style={{
                paddingTop: 'var(--vapor-size-space-400)',
                paddingBottom: 'var(--vapor-size-space-400)',
              }}
            >
              <MeetingProfileCard avatarInitial="1" />
              <MeetingProfileCard
                avatarInitial="2"
                residence="제주 3년 이상 거주"
                gender="여성"
                ageRange="20대"
                location="제주시"
                message="함께 즐거운 시간 보내요!"
              />
              <MeetingProfileCard
                avatarInitial="3"
                residence="제주 1년 이상 거주"
                gender="남성"
                ageRange="40대"
                location="서귀포"
                message="새로운 인연을 만들어요!"
              />
            </VStack>
            <Card.Footer
              style={{
                borderTop: 'none',
              }}
            >
              <HStack gap="var(--vapor-size-space-150)" width="100%">
                <Button
                  variant="outline"
                  size="xl"
                  width="100%"
                  onClick={onClose}
                  style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                  }}
                >
                  {leftButtonText}
                </Button>
                <Button
                  colorPalette="primary"
                  variant="fill"
                  size="xl"
                  width="100%"
                  onClick={onRightButtonClick}
                  style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                  }}
                >
                  {rightButtonText}
                </Button>
              </HStack>
            </Card.Footer>
          </VStack>
        </Box>
      </Sheet.Content>
    </Sheet.Root>
  )
}
