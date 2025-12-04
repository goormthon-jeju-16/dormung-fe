import { Sheet, Box, VStack, Button } from '@vapor-ui/core'

interface ExitConfirmBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  onExit: () => void
  exitButtonText?: string
  closeButtonText?: string
}

export const ExitConfirmBottomSheet = ({
  isOpen,
  onClose,
  onExit,
  exitButtonText = '저장하지 않고 나가기',
  closeButtonText = '닫기',
}: ExitConfirmBottomSheetProps) => {
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
          maxHeight: '200px',
          height: 'auto',
        }}
      >
        <Box
          style={{
            padding: 'var(--vapor-size-space-500)',
          }}
        >
          <VStack gap="$200">
            <Button
              variant="fill"
              size="lg"
              width="100%"
              onClick={onExit}
              colorPalette="danger"
            >
              {exitButtonText}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              width="100%"
              onClick={onClose}
              color="black"
              style={{
                border: '1px solid var(--color-gray-200)',
              }}
            >
              {closeButtonText}
            </Button>
          </VStack>
        </Box>
      </Sheet.Content>
    </Sheet.Root>
  )
}
