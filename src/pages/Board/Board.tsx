import { Text, VStack, Button } from '@vapor-ui/core'
import { useNavigate } from 'react-router-dom'
import { RouterPath } from '@/routes/path'
import { MOCK_BOARDS } from '@/mockdata/boardData'
import { BoardCard } from '@/pages/Board/components/BoardCard'

const BoardPage = () => {
  const navigate = useNavigate()

  const handleBoardWrite = () => {
    navigate(RouterPath.BOARD_WRITE)
  }
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--vapor-size-space-600)',
          paddingTop: 'var(--vapor-size-space-500)',
          paddingBottom: 'var(--vapor-size-space-500)',
          paddingLeft: 'var(--vapor-size-space-250)',
          paddingRight: 'var(--vapor-size-space-250)',
        }}
      >
        <Text typography="heading3" marginBottom="$200">
          어쩌구 게시판
        </Text>
        <VStack>
          {MOCK_BOARDS.map(board => (
            <BoardCard
              key={board.id}
              id={board.id}
              title={board.title}
              content={board.content}
              commentCount={board.commentCount}
            />
          ))}
        </VStack>
      </div>
      <Button
        colorPalette="primary"
        size="sm"
        variant="fill"
        onClick={handleBoardWrite}
        style={{
          height: 'var(--vapor-size-demension-600)',
          position: 'fixed',
          bottom: 'var(--vapor-size-space-300)',
          right: 'var(--vapor-size-space-300)',
          borderRadius: 'var(--vapor-size-space-900)',
          paddingTop: 'var(--vapor-size-space-100)',
          paddingBottom: 'var(--vapor-size-space-100)',
          paddingLeft: 'var(--vapor-size-space-300)',
          paddingRight: 'var(--vapor-size-space-300)',
          zIndex: 1000,
        }}
      >
        + 글쓰기
      </Button>
    </>
  )
}

export default BoardPage
