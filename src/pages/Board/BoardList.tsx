import { Text, VStack } from '@vapor-ui/core'
import NavigationBar from '@/components/NavigationBar/NavigationBar'
import { BoardCardList } from '@/pages/Board/components/BoardCardList'

const BoardListPage = () => {
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
      <VStack gap="var(--vapor-size-space-100)">
        <Text typography="heading3">모임 게시판</Text>
        <Text typography="body1">
          모임 회원들과 자유롭게 이야기를 나눠보세요!
        </Text>
      </VStack>
      <BoardCardList />
      <NavigationBar />
    </div>
  )
}

export default BoardListPage
