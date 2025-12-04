import { TextInput, Box } from '@vapor-ui/core'
import { SendOutlineIcon } from '@vapor-ui/icons'

export const CommentBox = () => {
  return (
    <Box
      style={{
        borderTop: '1px solid var(--color-gray-50)',
        backgroundColor: 'var(--color-background-normal)',
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap="$200"
        border="1px solid var(--color-gray-200)"
        borderRadius="var(--vapor-size-borderRadius-300)"
        padding="$0"
      >
        <TextInput
          placeholder="댓글을 입력해주세요"
          size="lg"
          style={{
            flex: 1,
            border: '0',
          }}
        />
        <SendOutlineIcon
          style={{
            marginRight: 'var(--vapor-size-space-150)',
            cursor: 'pointer',
            color: 'var(--color-brand-400)',
            width: '16px',
            height: '16px',
          }}
        />
      </Box>
    </Box>
  )
}
