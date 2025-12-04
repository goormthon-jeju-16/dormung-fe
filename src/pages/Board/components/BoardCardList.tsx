import { Box, Flex, Text, Button, VStack } from '@vapor-ui/core'
import { useNavigate } from 'react-router-dom'
import { MOCK_MEETINGS } from '@/mockdata/boardData'

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

  const handleEnter = (meetingId: number) => {
    navigate(`/board/${meetingId}`)
  }

  return (
    <VStack gap="$175">
      {MOCK_MEETINGS.map(meeting => (
        <BoardCardListItem
          key={meeting.id}
          meetingName={meeting.name}
          onEnter={() => handleEnter(meeting.id)}
        />
      ))}
    </VStack>
  )
}
