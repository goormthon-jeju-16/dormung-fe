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
import { MOCK_COMMENTS } from '@/mockdata/boardData'

const BoardPostDetailPage = () => {
  const [isDeleteSheetOpen, setIsDeleteSheetOpen] = useState(false)
  const commentCount = MOCK_COMMENTS.length
  const navigate = useNavigate()
  const { boardId } = useParams<{ boardId: string; postId: string }>()

  const handleMoreClick = () => {
    setIsDeleteSheetOpen(true)
  }

  const handleDelete = () => {
    setIsDeleteSheetOpen(false)
    if (boardId) {
      navigate(RouterPath.BOARD.replace(':boardId', boardId))
    } else {
      navigate(-1)
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
            도르멍
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
        <Text typography="heading3">자기 소개</Text>
        <Text typography="body1">자유롭게 자기소개를 해보세요!</Text>
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
          <CommentList />
        </VStack>
      </VStack>
      <CommentBox />
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
