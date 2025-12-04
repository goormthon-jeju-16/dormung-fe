import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Text,
  Badge,
  Box,
  VStack,
  IconButton,
  Flex,
  HStack,
} from '@vapor-ui/core'
import { UserIcon, MoreCommonOutlineIcon } from '@vapor-ui/icons'
import { CommentList } from '@/pages/Board/components/CommentCard'
import { CommentBox } from '@/pages/Board/components/CommentBox'
import { ExitConfirmBottomSheet } from '@/components/Modal/ExitConfirmBottomSheet'
import NavigationBar from '@/components/NavigationBar/NavigationBar'
import { RouterPath } from '@/routes/path'
import { getBoardDetail, deleteBoard } from '@/api/board'
import { type BoardDetail } from '@/api/board'

const BoardPostDetailPage = () => {
  const [isDeleteSheetOpen, setIsDeleteSheetOpen] = useState(false)
  const [commentCount, setCommentCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [boardDetail, setBoardDetail] = useState<{
    title: string
    content: string
    userNickname: string
  } | null>(null)
  const navigate = useNavigate()
  const { boardId, postId } = useParams<{ boardId: string; postId: string }>()
  const [boardReplies, setBoardReplies] = useState<BoardDetail['boardReplies']>(
    []
  )

  const fetchBoardDetail = async () => {
    if (!postId) return

    try {
      setLoading(true)
      const data = await getBoardDetail(Number(postId))
      setBoardDetail({
        title: data.title,
        content: data.content,
        userNickname: data.user.nickname,
      })
      setBoardReplies(data.boardReplies)
      setCommentCount(data.boardReplies.length)
    } catch (error) {
      console.error('게시판 상세를 불러오는 중 오류가 발생했습니다:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBoardDetail()
  }, [postId])

  useEffect(() => {
    const fetchBoardDetail = async () => {
      if (!postId) return

      try {
        setLoading(true)
        const data = await getBoardDetail(Number(postId))
        setBoardDetail({
          title: data.title,
          content: data.content,
          userNickname: data.user.nickname,
        })
        setBoardReplies(data.boardReplies)
        setCommentCount(data.boardReplies.length)
      } catch (error) {
        console.error('게시판 상세를 불러오는 중 오류가 발생했습니다:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBoardDetail()
  }, [postId])

  const handleMoreClick = () => {
    setIsDeleteSheetOpen(true)
  }
  const handleDelete = async () => {
    if (!postId) return

    try {
      await deleteBoard(Number(postId))
      setIsDeleteSheetOpen(false)
      if (boardId) {
        navigate(RouterPath.BOARD.replace(':boardId', boardId))
      } else {
        navigate(-1)
      }
    } catch (error) {
      console.error('게시글 삭제 중 오류가 발생했습니다:', error)
    }
  }

  const handleCloseSheet = () => {
    setIsDeleteSheetOpen(false)
    if (boardId) {
      navigate(RouterPath.BOARD.replace(':boardId', boardId))
    } else {
      navigate(-1)
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--vapor-size-space-400)',
        paddingTop: 'var(--vapor-size-space-500)',
        paddingLeft: 'var(--vapor-size-space-250)',
        paddingRight: 'var(--vapor-size-space-250)',
      }}
    >
      <Text typography="heading3">어쩌구 게시판</Text>
      <VStack gap="$050">
        <Flex alignItems="center" justifyContent="space-between">
          <Badge
            paddingRight="var(--vapor-size-space-150)"
            borderRadius="var(--vapor-size-borderRadius-300)"
            colorPalette="success"
            size="md"
            style={{
              alignSelf: 'flex-start',
            }}
          >
            <UserIcon />
            {boardDetail?.userNickname || '도르멍'}
          </Badge>
          <IconButton
            onClick={handleMoreClick}
            variant="ghost"
            aria-label="더보기"
            style={{
              color: 'var(--color-foreground-hint-200)',
              transform: 'rotate(90deg)',
            }}
          >
            <MoreCommonOutlineIcon />
          </IconButton>
        </Flex>
        <Text typography="heading3">{boardDetail?.title || ''}</Text>
        <Text typography="body1">{boardDetail?.content || ''}</Text>
      </VStack>
      <Box
        backgroundColor="$gray-050"
        style={{
          height: 'var(--vapor-size-space-150)',
          marginLeft: 'calc(-1 * var(--vapor-size-space-250))',
          marginRight: 'calc(-1 * var(--vapor-size-space-250))',
        }}
      />
      <VStack>
        <VStack gap="$200">
          <HStack alignItems="center" gap="$100">
            <Text typography="heading6">댓글</Text>
            <Text typography="heading6" foreground="primary-200">
              {commentCount}
            </Text>
          </HStack>
          <CommentList comments={boardReplies} />
        </VStack>
      </VStack>
      <CommentBox boardId={postId || ''} onCommentAdded={fetchBoardDetail} />
      <ExitConfirmBottomSheet
        isOpen={isDeleteSheetOpen}
        onClose={handleCloseSheet}
        onExit={handleDelete}
        exitButtonText="삭제하기"
        closeButtonText="닫기"
      />
      <NavigationBar />
    </div>
  )
}
export default BoardPostDetailPage
