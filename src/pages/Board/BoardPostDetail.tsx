import { Text, Badge, Box, VStack } from '@vapor-ui/core'
import { UserIcon } from '@vapor-ui/icons'
import { CommentList } from '@/pages/Board/components/CommentCard'
import { CommentBox } from '@/pages/Board/components/CommentBox'

const BoardPostDetailPage = () => {
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
          <Text typography="heading6">댓글</Text>
          <CommentList />
        </VStack>
      </VStack>
      <CommentBox />
    </div>
  )
}
export default BoardPostDetailPage
