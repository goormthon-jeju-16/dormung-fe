import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Text, VStack, Box } from '@vapor-ui/core'
import { MeetingCard } from '@/components/Meeting/MeetingCard'
import { RecommendBottomSheet } from '@/components/Meeting/RecommendBottomSheet'
import NavigationBar from '@/components/NavigationBar/NavigationBar'
import ConfirmModal from '@/components/Modal/ConfirmModal'
import { RouterPath } from '@/routes/path'
import dormungLogo from '@/assets/dormung_logo.svg'
import character from '@/assets/character_logo.svg'
import { getUserInfo, getMyMeetingList, leaveMeeting } from '@/api/user'
import type { MyMeeting } from '@/api/user'

const MainPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [nickname, setNickname] = useState<string>('')
  const [meetings, setMeetings] = useState<MyMeeting[]>([])
  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [userInfo, meetingList] = await Promise.all([
          getUserInfo(),
          getMyMeetingList(),
        ])
        setNickname(userInfo.nickname)
        setMeetings(meetingList)
      } catch (error) {
        console.error('데이터 조회 실패: ', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const meetingIdParam = searchParams.get('meetingId')
    if (meetingIdParam && meetings.length > 0) {
      const meetingId = Number(meetingIdParam)
      setSearchParams({}, { replace: true })
      const meetingExists = meetings.some(m => m.id === meetingId)
      if (meetingExists) {
        setSelectedMeetingId(meetingId)
        setIsBottomSheetOpen(true)
      }
    }
  }, [searchParams, setSearchParams, meetings])

  return (
    <>
      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #CBFFEF 100%)',
        }}
      >
        <img
          src={character}
          alt="Character Intro Background"
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '10%',
            width: '320px',
            height: '320px',
            objectFit: 'contain',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        <Box
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 'var(--vapor-size-space-500)',
            paddingBottom: 'var(--vapor-size-space-900)',
            paddingLeft: 'var(--vapor-size-space-250)',
            paddingRight: 'var(--vapor-size-space-250)',
            gap: 'var(--vapor-size-space-600)',
            zIndex: 1,
          }}
        >
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--vapor-size-space-200)',
            }}
          >
            <img
              src={dormungLogo}
              alt="Dormung Logo"
              style={{
                width: 'auto',
                height: '32px',
              }}
            />
          </Box>
          <VStack gap="var(--vapor-size-space-600)">
            <Text typography="heading3" foreground="normal-200">
              {nickname ? `${nickname}님 안녕하세요.` : '안녕하세요.'}
            </Text>
            <VStack gap="var(--vapor-size-space-200)">
              {isLoading ? (
                <Text typography="body1" foreground="secondary-200">
                  로딩 중...
                </Text>
              ) : meetings.length > 0 ? (
                meetings.map(meeting => (
                  <MeetingCard
                    key={meeting.id}
                    title={meeting.name}
                    duration=""
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
                ))
              ) : (
                <Text typography="body1" foreground="secondary-200">
                  참여 중인 모임이 없습니다.
                </Text>
              )}
            </VStack>
          </VStack>
        </Box>
      </div>
      <RecommendBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => {
          setIsBottomSheetOpen(false)
          setSelectedMeetingId(null)
        }}
        meetingId={selectedMeetingId}
        meetings={meetings.map(m => ({
          id: m.id,
          name: m.name,
          area: m.area,
          isActive: m.isActive,
          createdAt: '',
          periodLabel: '',
          meetingUsers: m.meetingUsers,
        }))}
        leftButtonText="닫기"
        rightButtonText="탈퇴하기"
        onRightButtonClick={() => {
          setIsBottomSheetOpen(false)
          setIsConfirmModalOpen(true)
        }}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false)
          setIsBottomSheetOpen(true)
        }}
        onLeave={async () => {
          setIsConfirmModalOpen(false)
          if (selectedMeetingId) {
            try {
              const success = await leaveMeeting(selectedMeetingId)
              if (success) {
                setSelectedMeetingId(null)
                const meetingList = await getMyMeetingList()
                setMeetings(meetingList)
                navigate(RouterPath.HOME)
              }
            } catch (error) {
              console.error('모임 탈퇴 실패:', error)
            }
          }
        }}
      />
      <NavigationBar />
    </>
  )
}

export default MainPage
