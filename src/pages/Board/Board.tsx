import { Text, VStack, Button } from '@vapor-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import { RouterPath } from '@/routes/path'
import { MOCK_BOARDS } from '@/mockdata/boardData'
import { BoardCard } from '@/pages/Board/components/BoardCard'
import NavigationBar from '@/components/NavigationBar/NavigationBar'

const BoardPage = () => {
  const navigate = useNavigate()
  const { boardId } = useParams<{ boardId: string }>()

  const handleBoardWrite = () => {
    navigate(RouterPath.BOARD_WRITE)
  }

  const handleCardClick = (cardId: number) => {
    if (boardId) {
      navigate(`/board/${boardId}/${cardId}`)
    }
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--vapor-size-space-600)',
          paddingTop: 'var(--vapor-size-space-500)',
          paddingBottom: 'calc(var(--vapor-size-space-500) + 80px)',
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
              onClick={() => handleCardClick(board.id)}
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
          bottom: 'calc(50px + var(--vapor-size-space-300))',
          right: 'var(--vapor-size-space-250)',
          borderRadius: 'var(--vapor-size-space-900)',
          paddingTop: 'var(--vapor-size-space-100)',
          paddingBottom: 'var(--vapor-size-space-100)',
          paddingLeft: 'var(--vapor-size-space-300)',
          paddingRight: 'var(--vapor-size-space-300)',
          zIndex: 1001,
        }}
      >
        + 글쓰기
      </Button>
      <NavigationBar />
    </>
  )
}

export default BoardPage
