import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Text, VStack } from '@vapor-ui/core'
import { MeetingCard } from '@/components/Meeting/MeetingCard'
import { ChevronLeftOutlineIcon } from '@vapor-ui/icons'
import { Callout } from '@vapor-ui/core'
import { InfoCircleOutlineIcon } from '@vapor-ui/icons'
import NavigationBar from '@/components/NavigationBar/NavigationBar'
import { getMeetingDetail } from '@/api/user'
import type { RecommendedMeeting } from '@/api/user'
import { RouterPath } from '@/routes/path'

const MatchingSuccessPage = () => {
  const navigate = useNavigate()
  const { meetingId } = useParams<{ meetingId: string }>()
  const [meeting, setMeeting] = useState<RecommendedMeeting | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMeeting = async () => {
      if (!meetingId) {
        setIsLoading(false)
        return
      }
      try {
        setIsLoading(true)
        const data = await getMeetingDetail(Number(meetingId))
        setMeeting(data)
      } catch (error) {
        console.error('모임 정보 조회 실패:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMeeting()
  }, [meetingId])

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
            {isLoading ? (
              <Text typography="body1" foreground="secondary-200">
                로딩 중...
              </Text>
            ) : meeting ? (
              <MeetingCard
                title={meeting.name}
                duration={meeting.periodLabel}
                memberCount={meeting.meetingUsers.length}
                profileImages={meeting.meetingUsers.map(mu => ({
                  id: mu.user.id,
                  profileImagePath: mu.user.profileImagePath,
                }))}
                meetingId={meeting.id}
                onCheckClick={() => {
                  navigate(`${RouterPath.MAIN}?meetingId=${meeting.id}`)
                }}
              />
            ) : (
              <MeetingCard title="취미/여가 활동" duration="신규" />
            )}
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
              }}
            >
              <Callout.Icon>
                <InfoCircleOutlineIcon />
              </Callout.Icon>
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
