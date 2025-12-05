import { useState } from 'react'
import { TextInput, Box } from '@vapor-ui/core'
import { SendOutlineIcon } from '@vapor-ui/icons'
import { createBoardReply } from '@/api/board'

interface CommentBoxProps {
  boardId: string
  onCommentAdded?: () => void
}

export const CommentBox = ({ boardId, onCommentAdded }: CommentBoxProps) => {
  const [reply, setReply] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!reply.trim() || isSubmitting) return

    try {
      setIsSubmitting(true)
      await createBoardReply({
        reply: reply.trim(),
        boardId: boardId,
      })
      setReply('')
      onCommentAdded?.()
    } catch (error) {
      console.error('댓글 작성 중 오류가 발생했습니다:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <Box
      style={{
        position: 'fixed',
        bottom: '80px',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 'var(--vapor-size-space-250)',
        paddingRight: 'var(--vapor-size-space-250)',
        backgroundColor: 'var(--color-background-normal)',
        boxSizing: 'border-box',
        zIndex: 10,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap="$200"
        border="1px solid var(--color-gray-200)"
        borderRadius="var(--vapor-size-borderRadius-300)"
        paddingTop="var(--vapor-size-space-200)"
        paddingBottom="var(--vapor-size-space-200)"
        paddingLeft="var(--vapor-size-space-200)"
        paddingRight="var(--vapor-size-space-200)"
        style={{
          width: '100%',
          maxWidth: '393px',
        }}
      >
        <TextInput
          placeholder="댓글을 입력해주세요"
          size="lg"
          value={reply}
          onChange={e => setReply(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isSubmitting}
          style={{
            flex: 1,
            border: '0',
          }}
        />
        <SendOutlineIcon
          onClick={handleSubmit}
          style={{
            marginRight: 'var(--vapor-size-space-150)',
            cursor: isSubmitting || !reply.trim() ? 'not-allowed' : 'pointer',
            color:
              isSubmitting || !reply.trim()
                ? 'var(--color-gray-300)'
                : 'var(--color-brand-400)',
            width: '16px',
            height: '16px',
          }}
        />
      </Box>
    </Box>
  )
}
