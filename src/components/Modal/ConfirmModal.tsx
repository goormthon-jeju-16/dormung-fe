import { Box, VStack, Text, HStack, Button } from '@vapor-ui/core'

interface ConfirmExitModalProps {
  isOpen: boolean
  onClose: () => void
  onLeave: () => void
}

const ConfirmExitModal = ({
  isOpen,
  onClose,
  onLeave,
}: ConfirmExitModalProps) => {
  if (!isOpen) return null

  return (
    <Box
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <Box
        width="300px"
        padding="$300"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0px -8px 20px rgba(0,0,0,0.15)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <VStack gap="$300" alignItems="center">
          <Text typography="body1" style={{ fontWeight: 600 }}>
            진짜 나가실 거예요?
          </Text>

          <HStack gap="$200" width="100%" justifyContent="space-between">
            <Button
              size="lg"
              style={{
                flex: 1,
              }}
              onClick={onClose}
            >
              닫기
            </Button>

            <Button
              size="lg"
              variant="ghost"
              backgroundColor="var(--vapor-color-background-secondary-200)"
              color="var(--vapor-color-secondary)"
              style={{
                flex: 1,
              }}
              onClick={onLeave}
            >
              탈퇴하기
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
}

export default ConfirmExitModal
