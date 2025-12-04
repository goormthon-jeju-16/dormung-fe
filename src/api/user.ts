import apiClient from './client'

interface ApiResponse<T> {
  statusCode: number
  message: string
  data: T
}

export const getUserResidencePeriodList = async (): Promise<string[]> => {
  const response = await apiClient.get<ApiResponse<string[]>>(
    '/user/residence-period/list'
  )
  return response.data.data
}

interface Category {
  id: number
  name: string
}

export const getMeetingCategoryList = async (): Promise<Category[]> => {
  const response = await apiClient.get<ApiResponse<Category[]>>(
    '/user/meeting/category/list'
  )
  return response.data.data
}

export const getUserResidenceAreaList = async (): Promise<string[]> => {
  const response = await apiClient.get<ApiResponse<string[]>>(
    '/user/residence-area/list'
  )
  return response.data.data
}

interface JoinRequest {
  residenceArea: string
  nickname: string
  residencePeriod: string
  introduceSelf: string
  profileImagePath: string
  userPreferredCategoryIds: number[]
}

export const joinUser = async (data: JoinRequest): Promise<boolean> => {
  const response = await apiClient.post<ApiResponse<boolean>>(
    '/user/join',
    data
  )
  return response.data.data
}

interface MeetingUser {
  id: number
  user: {
    id: number
    nickname: string
    profileImagePath: string
  }
}

export interface RecommendedMeeting {
  id: number
  name: string
  area: string
  isActive: number
  createdAt: string
  periodLabel: string
  meetingUsers: MeetingUser[]
}

export const getRecommendedMeetingList = async (): Promise<
  RecommendedMeeting[]
> => {
  const response = await apiClient.get<ApiResponse<RecommendedMeeting[]>>(
    '/user/meeting/recommend/list'
  )
  return response.data.data
}

export const getMeetingDetail = async (
  meetingId: number
): Promise<RecommendedMeeting> => {
  const response = await apiClient.get<ApiResponse<RecommendedMeeting>>(
    `/user/meeting/${meetingId}`
  )
  return response.data.data
}

export const joinMeeting = async (meetingId: number): Promise<boolean> => {
  const response = await apiClient.post<ApiResponse<boolean>>(
    `/user/meeting/join/${meetingId}`
  )
  return response.data.data
}

export interface UserInfo {
  residenceArea: string
  nickname: string
  residencePeriod: string
  introduceSelf: string
  profileImagePath: string
}

export const getUserInfo = async (): Promise<UserInfo> => {
  const response = await apiClient.get<ApiResponse<UserInfo>>("/user/info")
  return response.data.data
}

export interface MyMeeting {
  id: number
  name: string
  area: string
  isActive: number
  meetingUsers: MeetingUser[]
}

export const getMyMeetingList = async (): Promise<MyMeeting[]> => {
  const response = await apiClient.get<ApiResponse<MyMeeting[]>>("/user/meeting/my/list")
  return response.data.data
}
