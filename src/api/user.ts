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
