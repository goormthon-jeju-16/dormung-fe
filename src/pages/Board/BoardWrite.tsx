import { useNavigate } from 'react-router-dom'
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

const BoardWritePage = () => {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate(-1)
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
          >
            <CloseOutlineIcon />
          </IconButton>
          <Button variant="ghost">완료</Button>
        </Flex>
        <Box
          style={{
            borderBottom: '1px solid var(--color-gray-200)',
          }}
        >
          <TextInput
            placeholder="제목을 입력하세요."
            size="lg"
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
          placeholder="모임 회원들과 이야기를 나눠보세요.#자기소개 #약속잡기"
          style={{
            paddingTop: 'var(--vapor-size-space-200)',
            color: 'var(--color-foreground-hint-100)',
            padding: '0',
            border: 'none',
            resize: 'none',
            fontSize: '16px',
          }}
        />
      </VStack>
    </div>
  )
}

export default BoardWritePage
