import { useState } from 'react'
import {
  Box,
  Field,
  Text,
  TextInput,
  VStack,
  Button,
  Select,
} from '@vapor-ui/core'
import { SelectButtonGroup } from '@/pages/Onboarding/components/SelectButtonGroup'

const OnboardingPage = () => {
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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        paddingTop: 'var(--vapor-size-space-200)',
        paddingBottom: 'var(--vapor-size-space-250)',
        paddingLeft: 'var(--vapor-size-space-500)',
        paddingRight: 'var(--vapor-size-space-500)',
      }}
    >
      <Text render={<h3 />} foreground="normal-200">
        회원가입
      </Text>

      <Field.Root name="nickname" className="w-full">
        <Box render={<Field.Label />} flexDirection="column" className="gap-2">
          <Text render={<h5 />} foreground="secondary-100">
            닉네임을 입력해주세요.
          </Text>
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
        <Text>거주 지역은 어디인가요?</Text>
        <Select.Root placeholder="지역 선택">
          <Select.Trigger width="300px" />
          <Select.Positioner>
            <Select.Popup>
              <Select.Group>
                <Select.Item value="sans-serif">Sans-serif</Select.Item>
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

export default OnboardingPage
