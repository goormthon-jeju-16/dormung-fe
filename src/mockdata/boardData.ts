export interface BoardItem {
  id: number
  title: string
  content: string
  commentCount: number
}

export const MOCK_BOARDS: BoardItem[] = [
  {
    id: 1,
    title: '자기소개 해주세요',
    content: '소개소개소개소개소개',
    commentCount: 5,
  },
  {
    id: 2,
    title: '주말 아침 산책하실 분',
    content: '토요일 아침 9시에 한라수목원 가볍게 산책하려는데 같이 가실 분~',
    commentCount: 3,
  },
  {
    id: 3,
    title: '카페에서 수다 떨어요',
    content:
      '내일 오후에 애월 카페 가는데 같이 커피 마시면서 이야기 나눌 분 있을까요?',
    commentCount: 8,
  },
  {
    id: 4,
    title: '이번 주말 바다 보러 가요',
    content:
      '일요일 오후에 협재 바다 보러 가려고 해요. 같이 드라이브하고 커피 한잔 할래요?',
    commentCount: 2,
  },
  {
    id: 5,
    title: '평일 점심 같이 해요',
    content: '제주시내에서 일하시는 분! 목요일 점심 같이 먹으면서 친해져요 :)',
    commentCount: 12,
  },
]

export interface CommentItem {
  id: number
  nickname: string
  comment: string
}

export const MOCK_COMMENTS: CommentItem[] = [
  {
    id: 1,
    nickname: '노형사는도르멍',
    comment: '반갑습니다!',
  },
  {
    id: 2,
    nickname: '한라산초보',
    comment: '반갑습니다!',
  },
  {
    id: 3,
    nickname: '카페러버',
    comment: '안녕하세요!',
  },
  {
    id: 4,
    nickname: '서귀포살아요',
    comment: '서귀포 쪽에서도 모임 한 번 열리면 좋겠어요 :)',
  },
  {
    id: 5,
    nickname: '제주입도자',
    comment: '제주 온 지 얼마 안 됐는데 이런 모임 너무 반갑네요!',
  },
]
