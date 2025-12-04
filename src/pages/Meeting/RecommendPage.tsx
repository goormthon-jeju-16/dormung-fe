import { Text, VStack } from '@vapor-ui/core'
import { MeetingCard } from '@/components/Meeting/MeetingCard'

const RecommendPage = () => {
  return (
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
          <MeetingCard title="취미/여가 활동" duration="신규" />
          <MeetingCard title="취미/여가 활동" duration="1개월 이상" />
          <MeetingCard title="취미/여가 활동" duration="2개월 이상" />
        </VStack>
      </VStack>
    </div>
  )
}

export default RecommendPage
