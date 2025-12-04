import {
  Sheet,
  Box,
  Text,
  VStack,
  HStack,
  Card,
  Button,
  Tooltip,
} from '@vapor-ui/core'
import { MeetingProfileCard } from '@/components/Meeting/MeetingProfileCard'
import { InfoCircleIcon } from '@vapor-ui/icons'
import type { RecommendedMeeting } from '@/api/user'

interface RecommendBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  meetingId?: number | null
  meetings?: RecommendedMeeting[]
  leftButtonText?: string
  rightButtonText?: string
  onRightButtonClick?: () => void
}

export const RecommendBottomSheet = ({
  isOpen,
  onClose,
  meetingId,
  meetings = [],
  leftButtonText = '닫기',
  rightButtonText = '수락하기',
  onRightButtonClick,
}: RecommendBottomSheetProps) => {
  const selectedMeeting = meetings.find(m => m.id === meetingId)
  const meetingUsers = selectedMeeting?.meetingUsers || []
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
        positionerProps={{
          side: 'bottom',
          style: {
            zIndex: 1000,
            position: 'fixed',
            left: '50%',
            bottom: 0,
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '393px',
          },
        }}
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
              {selectedMeeting?.name || '모임 정보'}
            </Text>
            <HStack alignItems="center" gap="var(--vapor-size-space-100)">
              <Text typography="body1" foreground="normal-200">
                새로 생성된 모임이에요!
              </Text>
              <Tooltip.Root>
                <Tooltip.Trigger>
                  <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <InfoCircleIcon
                      style={{
                        display: 'block',
                        cursor: 'pointer',
                        color: 'var(--vapor-color-foreground-primary-100)',
                        alignSelf: 'center',
                      }}
                    />
                  </Box>
                </Tooltip.Trigger>

                <Tooltip.Portal>
                  <Tooltip.Positioner>
                    <Tooltip.Popup>
                      <Box
                        style={{
                          backgroundColor: 'var(--vapor-color-gray-0)',
                          padding: 'var(--vapor-size-space-150)',
                          borderRadius: 'var(--vapor-size-borderRadius-200)',
                        }}
                      >
                        <Text typography="body2" foreground="normal-200">
                          관리자에 의해 새로 생성된 모임이에요!
                        </Text>
                      </Box>
                    </Tooltip.Popup>
                  </Tooltip.Positioner>
                </Tooltip.Portal>
              </Tooltip.Root>
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
              {meetingUsers.length > 0 ? (
                meetingUsers.map((mu, index) => (
                  <MeetingProfileCard
                    key={mu.user.id}
                    nickname={mu.user.nickname}
                    profileImagePath={mu.user.profileImagePath}
                    location={mu.user.residenceArea}
                    message={mu.user.introduceSelf}
                    avatarInitial={String(index + 1)}
                  />
                ))
              ) : (
                <Text typography="body2" foreground="secondary-200">
                  유저 정보가 없습니다.
                </Text>
              )}
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
                    backgroundColor:
                      'var(--vapor-color-background-primary-200)',
                    color: 'var(--vapor-color-canvas)',
                    paddingLeft: 0,
                    paddingRight: 0,
                  }}
                >
                  {leftButtonText}
                </Button>
                <Button
                  variant="fill"
                  size="xl"
                  width="100%"
                  onClick={onRightButtonClick}
                  style={{
                    backgroundColor:
                      'var(--vapor-color-background-secondary-200)',
                    color: 'var(--vapor-color-gray-900)',
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
