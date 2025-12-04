import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Field,
  TextInput,
  VStack,
  Button,
  Select,
  Text,
} from '@vapor-ui/core'
import { SelectButtonGroup } from '@/pages/Onboarding/components/SelectButtonGroup'
import {
  getUserResidencePeriodList,
  getMeetingCategoryList,
  getUserResidenceAreaList,
} from '@/api/user'
import apiClient from '@/api/client'
import { RouterPath } from '@/routes/path'

const OnboardingProfilePage = () => {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState<string>('')
  const [nicknameError, setNicknameError] = useState<string | null>(null)
  const [introduction, setIntroduction] = useState<string>('')
  const [introductionError, setIntroductionError] = useState<string | null>(
    null
  )
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null)
  const [selectedAge, setSelectedAge] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [periods, setPeriods] = useState<Array<{ id: string; label: string }>>(
    []
  )
  const [categories, setCategories] = useState<
    Array<{ id: string; label: string }>
  >([])
  const [regions, setRegions] = useState<
    Array<{ value: string; label: string }>
  >([])
  const [isLoadingPeriods, setIsLoadingPeriods] = useState(true)
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [isLoadingRegions, setIsLoadingRegions] = useState(true)

  const validateNickname = (value: string) => {
    if (value.length === 0) {
      setNicknameError(null)
      return
    }

    if (value.length < 2) {
      setNicknameError('닉네임은 최소 2자 이상이어야 합니다.')
      return
    }
    if (value.length > 8) {
      setNicknameError('닉네임은 최대 8자까지 입력 가능합니다.')
      return
    }

    const koreanEnglishPattern = /^[가-힣a-zA-Z]+$/
    if (!koreanEnglishPattern.test(value)) {
      setNicknameError(
        '한글/영문만 사용 가능합니다. (띄어쓰기, 숫자, 이모지, 특수문자 사용 불가)'
      )
      return
    }

    setNicknameError(null)
  }

  const handleNicknameChange = (value: string) => {
    setNickname(value)
    validateNickname(value)
  }

  const validateIntroduction = (value: string) => {
    if (value.length === 0) {
      setIntroductionError(null)
      return
    }

    if (value.length < 10) {
      setIntroductionError('자기소개를 최소 10자 이상 입력해주세요.')
      return
    }

    setIntroductionError(null)
  }

  const handleIntroductionChange = (value: string) => {
    setIntroduction(value)
    validateIntroduction(value)
  }

  useEffect(() => {
    const fetchResidencePeriods = async () => {
      try {
        setIsLoadingPeriods(true)
        const data = await getUserResidencePeriodList()
        const formattedPeriods = data.map((period, index) => ({
          id: `period-${index}`,
          label: period,
        }))
        setPeriods(formattedPeriods)
      } catch (error) {
        console.error('거주기간 리스트 조회 실패:', error)
        setPeriods([
          { id: 'short', label: '3개월 미만' },
          { id: 'medium', label: '3개월 이상 ~ 2년 미만' },
          { id: 'long', label: '2년 이상' },
        ])
      } finally {
        setIsLoadingPeriods(false)
      }
    }

    fetchResidencePeriods()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true)
        const data = await getMeetingCategoryList()
        const formattedCategories = data.map(category => ({
          id: String(category.id),
          label: category.name,
        }))
        setCategories(formattedCategories)
      } catch (error) {
        console.error('카테고리 리스트 조회 실패:', error)
        setCategories([])
      } finally {
        setIsLoadingCategories(false)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchResidenceAreas = async () => {
      try {
        setIsLoadingRegions(true)
        const data = await getUserResidenceAreaList()
        const formattedRegions = data.map(area => ({
          value: area,
          label: area,
        }))
        setRegions(formattedRegions)
        if (formattedRegions.length > 0) {
          setSelectedRegion(prev => prev || formattedRegions[0].value)
        }
      } catch (error) {
        console.error('거주지역 리스트 조회 실패:', error)
        setRegions([])
      } finally {
        setIsLoadingRegions(false)
      }
    }

    fetchResidenceAreas()
  }, [])

  const isFormValid = () => {
    const isNicknameValid =
      nickname.length >= 2 &&
      nickname.length <= 8 &&
      /^[가-힣a-zA-Z]+$/.test(nickname) &&
      !nicknameError

    const isIntroductionValid = introduction.length >= 10 && !introductionError

    const isRequiredSelected =
      selectedPeriod !== null && selectedAge !== null && selectedRegion !== null

    return isNicknameValid && isIntroductionValid && isRequiredSelected
  }

  const handleJoin = async () => {
    if (!isFormValid()) {
      return
    }

    try {
      const selectedPeriodData = periods.find(p => p.id === selectedPeriod)
      const residencePeriod = selectedPeriodData?.label || ''

      const userPreferredCategoryIds = selectedAge ? [Number(selectedAge)] : []

      const joinData = {
        residenceArea: selectedRegion || '',
        nickname: nickname,
        residencePeriod: residencePeriod,
        introduceSelf: introduction,
        profileImagePath: '/public/images/profile.png',
        userPreferredCategoryIds: userPreferredCategoryIds,
      }

      const response = await apiClient.post('/user/join', joinData)
      if (response.status === 201) {
        navigate(RouterPath.MAIN)
      }
    } catch (error) {
      console.error('회원가입 실패:', error)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        paddingTop: 'var(--vapor-size-space-500)',
        paddingBottom: 'var(--vapor-size-space-500)',
        paddingLeft: 'var(--vapor-size-space-250)',
        paddingRight: 'var(--vapor-size-space-250)',
      }}
    >
      <Box className="text-center" marginBottom="var(--vapor-size-space-200)">
        <Text typography="heading3">회원가입</Text>
      </Box>
      <Field.Root name="nickname" className="w-full">
        <Box render={<Field.Label />} flexDirection="column" className="gap-2">
          <Text typography="heading5">닉네임을 입력해주세요.</Text>

          <Box
            borderColor={
              nicknameError
                ? 'var(--vapor-color-red-500)'
                : 'var(--color-border-normal)'
            }
            borderRadius="var(--vapor-size-radius-100)"
          >
            <TextInput
              style={{ width: '100%' }}
              size="lg"
              placeholder="어떻게 불리면 좋을까요?"
              value={nickname}
              onChange={e => handleNicknameChange(e.target.value)}
            />
          </Box>
          {nicknameError && (
            <Text
              typography="body2"
              style={{
                marginTop: '4px',
                color: 'var(--vapor-color-foreground-warning-200)',
              }}
            >
              * {nicknameError}
            </Text>
          )}
        </Box>
      </Field.Root>
      {!isLoadingPeriods && (
        <SelectButtonGroup
          label="제주에 오신지 얼마나 되셨나요?"
          options={periods}
          selectedValue={selectedPeriod}
          onSelect={setSelectedPeriod}
        />
      )}
      {!isLoadingCategories && (
        <SelectButtonGroup
          label="관심 카테고리는 무엇인가요?"
          options={categories}
          selectedValue={selectedAge}
          onSelect={setSelectedAge}
          helperText="* 여러 항목을 선택할 수 있어요."
          showHash={true}
        />
      )}
      <VStack>
        <Box marginBottom="var(--vapor-size-space-100)" render={<h4 />}>
          <Text typography="heading5">거주 지역은 어디인가요?</Text>
        </Box>
        {!isLoadingRegions && (
          <Select.Root
            size="lg"
            value={selectedRegion || regions[0]?.value || undefined}
            onValueChange={(value: unknown) =>
              setSelectedRegion(value as string)
            }
          >
            <Select.Trigger>
              {selectedRegion
                ? regions.find(r => r.value === selectedRegion)?.label ||
                  regions[0]?.label ||
                  '지역 선택'
                : regions[0]?.label || '지역 선택'}
            </Select.Trigger>
            <Select.Positioner>
              <Select.Popup>
                <Select.Group>
                  {regions.map(region => (
                    <Select.Item key={region.value} value={region.value}>
                      {region.label}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Popup>
            </Select.Positioner>
          </Select.Root>
        )}
      </VStack>
      <VStack>
        <Box marginBottom="var(--vapor-size-space-100)" render={<h4 />}>
          <Text typography="heading5">자기소개 한 마디!</Text>
        </Box>
        <Box
          borderColor={
            introductionError
              ? 'var(--vapor-color-red-500)'
              : 'var(--color-border-normal)'
          }
          borderRadius="var(--vapor-size-radius-100)"
        >
          <TextInput
            style={{ width: '100%' }}
            size="lg"
            placeholder="나를 소개해주세요."
            value={introduction}
            onChange={e => handleIntroductionChange(e.target.value)}
          />
        </Box>
        {introductionError && (
          <Text
            typography="body2"
            style={{
              marginTop: '4px',
              color: 'var(--vapor-color-foreground-warning-200)',
            }}
          >
            * {introductionError}
          </Text>
        )}
      </VStack>
      <Button
        colorPalette="primary"
        size="lg"
        variant="fill"
        width="100%"
        disabled={!isFormValid()}
        onClick={handleJoin}
      >
        다음
      </Button>
    </div>
  )
}

export default OnboardingProfilePage
