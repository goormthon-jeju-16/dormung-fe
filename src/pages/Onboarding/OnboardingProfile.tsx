import { useState } from 'react'
import { Box, Field, TextInput, VStack, Button, Select } from '@vapor-ui/core'
import { SelectButtonGroup } from '@/pages/Onboarding/components/SelectButtonGroup'

const OnboardingProfilePage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null)
  const [selectedAge, setSelectedAge] = useState<string | null>(null)
  const [selectedGender, setSelectedGender] = useState<string | null>(null)

  const periods = [
    { id: 'short', label: '3개월 미만' },
    { id: 'medium', label: '3개월 이상 ~ 2년 미만' },
    { id: 'long', label: '2년 이상' },
  ]

  const ages = [
    { id: '20', label: '20대' },
    { id: '30', label: '30대' },
  ]

  const genders = [
    { id: 'female', label: '여성' },
    { id: 'male', label: '남성' },
  ]

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
        paddingBottom: 'var(--vapor-size-space-250)',
        paddingLeft: 'var(--vapor-size-space-400)',
        paddingRight: 'var(--vapor-size-space-400)',
      }}
    >
      <Box
        render={<h3 />}
        className="text-center"
        marginBottom="var(--vapor-size-space-200)"
      >
        회원가입
      </Box>
      <Field.Root name="nickname" className="w-full">
        <Box render={<Field.Label />} flexDirection="column" className="gap-2">
          <Box render={<h3 />}>닉네임을 입력해주세요.</Box>
          <Box
            borderColor="var(--color-border-normal)"
            borderRadius="var(--vapor-size-radius-100)"
          >
            <TextInput placeholder="닉네임" size="lg" />
          </Box>
        </Box>
      </Field.Root>
      <SelectButtonGroup
        label="제주에 오신지 얼마나 되셨나요?"
        options={periods}
        selectedValue={selectedPeriod}
        onSelect={setSelectedPeriod}
      />
      <SelectButtonGroup
        label="연령대를 골라주세요."
        options={ages}
        selectedValue={selectedAge}
        onSelect={setSelectedAge}
      />
      <SelectButtonGroup
        label="성별을 골라주세요."
        options={genders}
        selectedValue={selectedGender}
        onSelect={setSelectedGender}
      />

      <VStack>
        <Box marginBottom="var(--vapor-size-space-100)" render={<h4 />}>
          거주 지역은 어디인가요?
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
      </VStack>
      <Button colorPalette="primary" size="lg" variant="fill" width="100%">
        다음
      </Button>
    </div>
  )
}

export default OnboardingProfilePage
