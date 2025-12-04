import apiClient from './client'

interface ApiResponse<T> {
  statusCode: number
  message: string
  data: T
}

//게시판 목록
export interface BoardReply {
  id: number
  reply: string
  createdAt: string
}

export interface BoardItem {
  id: number
  title: string
  content: string
  createdAt: string
  user: {
    nickname: string
  }
  boardReplies: BoardReply[]
}

export const getBoardList = async (meetingId: number): Promise<BoardItem[]> => {
  const response = await apiClient.get<ApiResponse<BoardItem[]>>(
    `/user/board/list/${meetingId}`
  )
  return response.data.data
}

//게사판 상세
export interface BoardDetail {
  id: number
  title: string
  content: string
  createdAt: string
  user: {
    id: number
    nickname: string
  }
  boardReplies: Array<{
    id: number
    reply: string
    createdAt: string
    user: {
      id: number
      nickname: string
    }
  }>
}

export const getBoardDetail = async (id: number): Promise<BoardDetail> => {
  const response = await apiClient.get<ApiResponse<BoardDetail>>(
    `/user/board/${id}`
  )
  return response.data.data
}

//게시판 글 생성
export interface CreateBoardRequest {
  title: string
  content: string
  meetingId: string
}

export const createBoard = async (
  data: CreateBoardRequest
): Promise<boolean> => {
  const response = await apiClient.post<ApiResponse<boolean>>(
    '/user/board',
    data
  )
  return response.data.data
}

//게시판 글 삭제
export const deleteBoard = async (id: number): Promise<boolean> => {
  const response = await apiClient.delete<ApiResponse<boolean>>(
    `/user/board/${id}`
  )
  return response.data.data
}

//게시판 댓글 작성
export interface CreateBoardReplyRequest {
  reply: string
  boardId: string
}

export const createBoardReply = async (
  data: CreateBoardReplyRequest
): Promise<boolean> => {
  const response = await apiClient.post<ApiResponse<boolean>>(
    '/user/board/reply',
    data
  )
  return response.data.data
}
