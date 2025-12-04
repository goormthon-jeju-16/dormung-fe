import { useState, useEffect } from 'react'
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
import { getUserResidencePeriodList, getMeetingCategoryList } from '@/api/user'

const OnboardingProfilePage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null)
  const [selectedAge, setSelectedAge] = useState<string | null>(null)
  const [periods, setPeriods] = useState<Array<{ id: string; label: string }>>(
    []
  )
  const [categories, setCategories] = useState<
    Array<{ id: string; label: string }>
  >([])
  const [isLoadingPeriods, setIsLoadingPeriods] = useState(true)
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

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

  const regions = [
    { value: 'yeonno-nohyeong', label: '연동/노형' },
    { value: 'ara', label: '아라동' },
    { value: 'downtown', label: '원도심/이도/일도/삼도/용담' },
    { value: 'aewol', label: '애월' },
    { value: 'hallim-hyeopjae', label: '한림/협재' },
    { value: 'jocheon-hamdeok', label: '조천/함덕' },
    { value: 'jungmun-saekdal', label: '중문/색달' },
    { value: 'seogwipo-downtown', label: '서귀포시내/서귀동/동홍' },
    { value: 'namwon-wimi', label: '남원/위미' },
    { value: 'seongsan-pyoseon', label: '성산/표선' },
  ]

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
            borderColor="var(--color-border-normal)"
            borderRadius="var(--vapor-size-radius-100)"
          >
            <TextInput
              style={{ width: '100%' }}
              size="lg"
              placeholder="어떻게 불리면 좋을까요?"
            />
          </Box>
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
        <Select.Root size="lg" placeholder="지역 선택">
          <Select.Trigger />
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
      </VStack>{' '}
      <VStack>
        <Box marginBottom="var(--vapor-size-space-100)" render={<h4 />}>
          <Text typography="heading5">자기소개 한 마디!</Text>
        </Box>
        <Box
          borderColor="var(--color-border-normal)"
          borderRadius="var(--vapor-size-radius-100)"
        >
          <TextInput
            style={{ width: '100%' }}
            size="lg"
            placeholder="나를 소개해주세요."
          />
        </Box>
      </VStack>
      <Button colorPalette="primary" size="lg" variant="fill" width="100%">
        다음
      </Button>
    </div>
  )
}

export default OnboardingProfilePage
