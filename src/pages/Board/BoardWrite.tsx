import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CloseOutlineIcon } from '@vapor-ui/icons'
import {
  Box,
  Button,
  VStack,
  Text,
  TextInput,
  Textarea,
  Flex,
  IconButton,
} from '@vapor-ui/core'
import { ExitConfirmBottomSheet } from '@/components/Modal/ExitConfirmBottomSheet'
import { createBoard } from '@/api/board'
import { RouterPath } from '@/routes/path'

const BoardWritePage = () => {
  const [isExitSheetOpen, setIsExitSheetOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Board.tsx에서 전달된 boardId (실제로는 meetingId)
  const boardId = location.state?.boardId || ''

  const handleClose = () => {
    setIsExitSheetOpen(true)
  }

  const handleExit = () => {
    navigate(-1)
  }

  const handleCloseSheet = () => {
    setIsExitSheetOpen(false)
  }

  const handleComplete = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.')
      return
    }

    if (!boardId) {
      alert('게시판 정보를 찾을 수 없습니다.')
      return
    }

    try {
      setIsSubmitting(true)
      await createBoard({
        title: title.trim(),
        content: content.trim(),
        meetingId: String(boardId),
      })
      // 글 작성 성공 후 게시판 목록으로 이동
      navigate(RouterPath.BOARD.replace(':boardId', String(boardId)))
    } catch (error) {
      console.error('게시판 글 작성 중 오류가 발생했습니다:', error)
      alert('글 작성에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
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
      <Text typography="heading3">어쩌구 게시판</Text>
      <VStack>
        <Flex alignItems="center" justifyContent="space-between">
          <IconButton
            onClick={handleClose}
            variant="ghost"
            aria-label="투명 닫기 버튼"
            style={{
              color: 'var(--color-foreground-hint-200)',
              marginLeft: 'calc(-1 * var(--vapor-size-space-100)',
            }}
          >
            <CloseOutlineIcon />
          </IconButton>
          <Button
            variant="ghost"
            onClick={handleComplete}
            disabled={isSubmitting}
            style={{
              color: 'var(--color-foreground-hint-200)',
            }}
          >
            {isSubmitting ? '작성 중...' : '완료'}
          </Button>
        </Flex>
        <Box
          style={{
            borderBottom: '1px solid var(--color-gray-200)',
          }}
        >
          <TextInput
            placeholder="제목을 입력하세요."
            size="lg"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{
              color: 'var(--color-foreground-hint-100)',
              border: 'none',
              borderRadius: '0',
              padding: '0',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          />
        </Box>
        <Textarea
          placeholder={`모임 회원들과 이야기를 나눠보세요.
#자기소개 #약속잡기`}
          value={content}
          onChange={e => setContent(e.target.value)}
          style={{
            paddingTop: 'var(--vapor-size-space-200)',
            paddingLeft: '0',
            color: 'var(--color-foreground-hint-100)',
            border: 'none',
            resize: 'none',
            fontSize: '16px',
          }}
        />
      </VStack>
      <ExitConfirmBottomSheet
        isOpen={isExitSheetOpen}
        onClose={handleCloseSheet}
        onExit={handleExit}
        exitButtonText="저장하지 않고 나가기"
        closeButtonText="닫기"
      />
    </div>
  )
}

export default BoardWritePage
