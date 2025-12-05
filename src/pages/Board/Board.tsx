import { Text, VStack, Button } from '@vapor-ui/core'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { RouterPath } from '@/routes/path'
import type { BoardItem } from '@/api/board'
import { getBoardList } from '@/api/board'
import { BoardCard } from '@/pages/Board/components/BoardCard'
import NavigationBar from '@/components/NavigationBar/NavigationBar'

const BoardPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const meetingName =
    (location.state as { meetingName?: string })?.meetingName || '게시판'
  const { boardId } = useParams<{ boardId: string }>()
  const [boards, setBoards] = useState<
    Array<{
      id: number
      title: string
      content: string
      commentCount: number
    }>
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBoards = async () => {
      if (!boardId) return

      try {
        setLoading(true)
        const data: BoardItem[] = await getBoardList(Number(boardId))
        setBoards(
          data.map(board => ({
            id: board.id,
            title: board.title,
            content: board.content,
            commentCount: board.boardReplies.length,
          }))
        )
      } catch (error) {
        console.error('게시판 목록을 불러오는 중 오류가 발생했습니다:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBoards()
  }, [boardId])

  const handleBoardWrite = () => {
    if (boardId) {
      navigate(RouterPath.BOARD_WRITE, { state: { boardId, meetingName } })
    } else {
      navigate(RouterPath.BOARD_WRITE, { state: { meetingName } })
    }
  }

  const handleCardClick = (cardId: number) => {
    if (boardId) {
      navigate(`/board/${boardId}/${cardId}`, { state: { meetingName } })
    }
  }

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Text>로딩 중...</Text>
      </div>
    )
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
          maxWidth: '393px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Text typography="heading3" marginBottom="$200">
          {meetingName}
        </Text>
        <VStack>
          {boards.map(board => (
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
      <div
        style={{
          position: 'fixed',
          bottom: 'calc(50px + var(--vapor-size-space-300))',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '393px',
          paddingLeft: 'var(--vapor-size-space-250)',
          paddingRight: 'var(--vapor-size-space-250)',
          boxSizing: 'border-box',
          zIndex: 1001,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          colorPalette="primary"
          size="sm"
          variant="fill"
          onClick={handleBoardWrite}
          style={{
            height: 'var(--vapor-size-demension-600)',
            borderRadius: 'var(--vapor-size-space-900)',
            paddingTop: 'var(--vapor-size-space-100)',
            paddingBottom: 'var(--vapor-size-space-100)',
            paddingLeft: 'var(--vapor-size-space-300)',
            paddingRight: 'var(--vapor-size-space-300)',
          }}
        >
          + 글쓰기
        </Button>
      </div>
      <NavigationBar />
    </>
  )
}

export default BoardPage
