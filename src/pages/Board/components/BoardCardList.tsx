import { useState, useEffect } from 'react'
import { Box, Flex, Text, Button, VStack } from '@vapor-ui/core'
import { useNavigate } from 'react-router-dom'
import { getMyMeetingList } from '@/api/user'

interface BoardCardListProps {
  meetingName: string
  onEnter?: () => void
}

export const BoardCardListItem = ({
  meetingName,
  onEnter,
}: BoardCardListProps) => {
  return (
    <Box
      paddingTop="var(--vapor-size-space-250)"
      paddingBottom="var(--vapor-size-space-250)"
      style={{
        borderBottom: '1px solid var(--color-gray-50)',
        backgroundColor: 'var(--color-background-normal)',
      }}
    >
      <Flex alignItems="center" justifyContent="space-between" gap="$200">
        <Text typography="heading5" style={{ flex: 1 }}>
          {meetingName}
        </Text>
        <Button
          borderRadius="var(--vapor-size-space-900)"
          paddingRight="var(--vapor-size-space-225)"
          paddingLeft="var(--vapor-size-space-225)"
          height="var(--vapor-size-dimension-400)"
          backgroundColor="var(--vapor-color-background-primary-200)"
          variant="fill"
          size="md"
          onClick={onEnter}
        >
          <Text typography="subtitle1" color="white">
            들어가기
          </Text>
        </Button>
      </Flex>
    </Box>
  )
}

export const BoardCardList = () => {
  const navigate = useNavigate()
  const [meetings, setMeetings] = useState<{ id: number; name: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const data = await getMyMeetingList()
        setMeetings(
          data.map(meeting => ({ id: meeting.id, name: meeting.name }))
        )
      } catch (error) {
        console.error('모임 목록을 불러오는 중 오류가 발생했습니다:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMeetings()
  }, [])

  const handleEnter = (meetingId: number, meetingName: string) => {
    navigate(`/board/${meetingId}`, { state: { meetingName } })
  }

  if (loading) {
    return <Text>로딩 중...</Text>
  }

  return (
    <VStack gap="$175">
      {meetings.map(meeting => (
        <BoardCardListItem
          key={meeting.id}
          meetingName={meeting.name}
          onEnter={() => handleEnter(meeting.id, meeting.name)}
        />
      ))}
    </VStack>
  )
}
