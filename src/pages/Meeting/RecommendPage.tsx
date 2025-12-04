import { useState } from 'react'
import { Text, VStack } from '@vapor-ui/core'
import { MeetingCard } from '@/components/Meeting/MeetingCard'
import { RecommendBottomSheet } from '@/components/Meeting/RecommendBottomSheet'

const RecommendPage = () => {
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
            이런 모임은 어떠세요?
          </Text>
          <VStack gap="var(--vapor-size-space-200)">
            <MeetingCard
              title="취미/여가 활동"
              duration="신규"
              onCheckClick={() => setIsBottomSheetOpen(true)}
            />
            <MeetingCard
              title="취미/여가 활동"
              duration="1개월 이상"
              onCheckClick={() => setIsBottomSheetOpen(true)}
            />
            <MeetingCard
              title="취미/여가 활동"
              duration="2개월 이상"
              onCheckClick={() => setIsBottomSheetOpen(true)}
            />
          </VStack>
        </VStack>
      </div>
      <RecommendBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
      />
    </>
  )
}

export default RecommendPage
