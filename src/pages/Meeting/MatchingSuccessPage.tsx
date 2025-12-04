import { Text, VStack } from '@vapor-ui/core'
import { MeetingCard } from '@/components/Meeting/MeetingCard'
import { ChevronLeftOutlineIcon } from '@vapor-ui/icons'
import { Callout } from '@vapor-ui/core'
import NavigationBar from '@/components/NavigationBar/NavigationBar'

const MatchingSuccessPage = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 'var(--vapor-size-space-500)',
          paddingBottom: 'var(--vapor-size-space-500)',
          paddingLeft: 'var(--vapor-size-space-250)',
          paddingRight: 'var(--vapor-size-space-250)',
          gap: 'var(--vapor-size-space-600)',
        }}
      >
        <ChevronLeftOutlineIcon style={{ width: '32px', height: '32px' }} />
        <VStack gap="var(--vapor-size-space-600)">
          <Text typography="heading3" foreground="normal-200">
            만남이 성사됐어요!
          </Text>
          <VStack gap="var(--vapor-size-space-200)">
            <MeetingCard title="취미/여가 활동" duration="신규" />
          </VStack>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Callout.Root
              colorPalette="contrast"
              style={{
                backgroundColor: 'var(--vapor-color-background-secondary-100)',
                color: 'var(--vapor-color-foreground-secondary-100)',
                border: 'none',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              게시판에 들어가 보세요.
            </Callout.Root>
          </div>
        </VStack>
        <NavigationBar />
      </div>
    </>
  )
}

export default MatchingSuccessPage
