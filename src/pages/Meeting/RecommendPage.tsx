import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HStack, Box, Text, VStack } from '@vapor-ui/core'
import { ChevronLeftOutlineIcon } from '@vapor-ui/icons'
import { MeetingCard } from '@/components/Meeting/MeetingCard'
import { RecommendBottomSheet } from '@/components/Meeting/RecommendBottomSheet'
import { getRecommendedMeetingList, joinMeeting } from '@/api/user'
import type { RecommendedMeeting } from '@/api/user'
import { RouterPath } from '@/routes/path'
import LoadingPage from './LoadingPage'

const RecommendPage = () => {
  const navigate = useNavigate()
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(
    null
  )
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
          <HStack alignItems="center" gap="var(--vapor-size-space-200)">
            <Box
              onClick={() => navigate(RouterPath.MAIN)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ChevronLeftOutlineIcon
                style={{ width: '32px', height: '32px' }}
              />
            </Box>
            <Text typography="heading3" foreground="normal-200">
              이런 모임은 어떠세요?
            </Text>
          </HStack>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <VStack gap="var(--vapor-size-space-200)">
              {meetings.map(meeting => (
                <MeetingCard
                  key={meeting.id}
                  title={meeting.name}
                  duration={meeting.periodLabel}
                  memberCount={meeting.meetingUsers.length}
                  profileImages={meeting.meetingUsers.map(mu => ({
                    id: mu.user.id,
                    profileImagePath: mu.user.profileImagePath,
                  }))}
                  meetingId={meeting.id}
                  onCheckClick={meetingId => {
                    setSelectedMeetingId(meetingId || null)
                    setIsBottomSheetOpen(true)
                  }}
                />
              ))}
            </VStack>
          )}
        </VStack>
      </div>
      <RecommendBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => {
          setIsBottomSheetOpen(false)
          setSelectedMeetingId(null)
        }}
        meetingId={selectedMeetingId}
        meetings={meetings}
        onRightButtonClick={async () => {
          if (selectedMeetingId) {
            try {
              const success = await joinMeeting(selectedMeetingId)
              if (success) {
                setIsBottomSheetOpen(false)
                setSelectedMeetingId(null)
                navigate(
                  RouterPath.MATCHING_SUCCESS.replace(
                    ':meetingId?',
                    String(selectedMeetingId)
                  )
                )
              }
            } catch (error) {
              console.error('모임 가입 실패:', error)
            }
          }
        }}
      />
    </>
  )
}

export default RecommendPage
