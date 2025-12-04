import { useState } from 'react'
import { Text, VStack } from '@vapor-ui/core'
import { MeetingCard } from '@/components/Meeting/MeetingCard'
import { RecommendBottomSheet } from '@/components/Meeting/RecommendBottomSheet'

const MainPage = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)

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
        }}
      >
        <VStack gap="var(--vapor-size-space-600)">
          <Text typography="heading3" foreground="normal-200">
            토박이님 안녕하세요.
          </Text>
          <VStack gap="var(--vapor-size-space-200)">
            <MeetingCard
              title="취미/여가 활동"
              duration="신규"
              onCheckClick={() => setIsBottomSheetOpen(true)}
            />
          </VStack>
        </VStack>
      </div>
      <RecommendBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        leftButtonText="닫기"
        rightButtonText="탈퇴하기"
        onRightButtonClick={() => {
          setIsBottomSheetOpen(false)
        }}
      />
    </>
  )
}

export default MainPage
