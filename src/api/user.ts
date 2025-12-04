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
