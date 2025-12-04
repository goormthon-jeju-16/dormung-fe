import { useState, useEffect } from 'react'
import { Text, VStack } from '@vapor-ui/core'
import { MeetingCard } from '@/components/Meeting/MeetingCard'
import { RecommendBottomSheet } from '@/components/Meeting/RecommendBottomSheet'
import { getRecommendedMeetingList } from '@/api/user'
import type { RecommendedMeeting } from '@/api/user'
import { calculatePeriodLabel } from '@/lib/utils'

const RecommendPage = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [meetings, setMeetings] = useState<RecommendedMeeting[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setIsLoading(true)
        const data = await getRecommendedMeetingList()
        setMeetings(data)
      } catch (error) {
        console.error('모임 목록 조회 실패:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMeetings()
  }, [])

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
          {isLoading ? (
            <Text typography="body1" foreground="secondary-200">
              로딩 중...
            </Text>
          ) : (
            <VStack gap="var(--vapor-size-space-200)">
              {meetings.map(meeting => (
                <MeetingCard
                  key={meeting.id}
                  title={meeting.name}
                  duration={calculatePeriodLabel(meeting.createdAt)}
                  memberCount={meeting.meetingUsers.length}
                  profileImages={meeting.meetingUsers.map(mu => ({
                    id: mu.user.id,
                    profileImagePath: mu.user.profileImagePath,
                  }))}
                  onCheckClick={() => setIsBottomSheetOpen(true)}
                />
              ))}
            </VStack>
          )}
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
