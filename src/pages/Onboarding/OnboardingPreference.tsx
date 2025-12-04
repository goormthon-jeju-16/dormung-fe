import { useState } from 'react'
import { Box, Field, TextInput, Button } from '@vapor-ui/core'
import { SelectButtonGroup } from './components/SelectButtonGroup'

const OnboardingPreference = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedAge, setSelectedAge] = useState<string | null>(null)
  const [selectedGender, setSelectedGender] = useState<string | null>(null)

  const categories = [
    { id: 'friends', label: '친구/친교' },
    { id: 'hobby', label: '취향 모임' },
    { id: 'outdoor', label: '자연·아웃도어' },
    { id: 'culture', label: '문화/예술' },
    { id: 'health', label: '운동·건강' },
    { id: 'local', label: '제주 로컬 탐방' },
    { id: 'language', label: '언어·스터디' },
    { id: 'networking', label: '직무·네트워킹' },
    { id: 'making', label: '취미 만들기' },
    { id: 'support', label: '정착 지원·생활 공유' },
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
        paddingTop: 'var(--vapor-size-space-500)',
        paddingBottom: 'var(--vapor-size-space-250)',
        paddingLeft: 'var(--vapor-size-space-500)',
        paddingRight: 'var(--vapor-size-space-500)',
      }}
    >
      <Box
        render={<h3 />}
        className="text-center"
        marginBottom="var(--vapor-size-space-200)"
      >
        관심 니즈 입력
      </Box>

      <SelectButtonGroup
        label="관심 카테고리는 무엇인가요?"
        options={categories}
        selectedValue={selectedCategory}
        onSelect={setSelectedCategory}
        multiLine={true}
      />

      <SelectButtonGroup
        label="선호 연령대를 골라주세요"
        options={ages}
        selectedValue={selectedAge}
        onSelect={setSelectedAge}
      />

      <SelectButtonGroup
        label="선호 성별을 골라주세요"
        options={genders}
        selectedValue={selectedGender}
        onSelect={setSelectedGender}
      />

      <Field.Root name="introduction" className="w-full">
        <Box render={<Field.Label />} flexDirection="column" className="gap-2">
          <Box render={<h3 />}>자기소개 한 마디!</Box>
          <TextInput size="lg" placeholder="자기소개를 입력해주세요" />
        </Box>
      </Field.Root>

      <Button colorPalette="primary" size="lg" variant="fill" width="100%">
        다음
      </Button>
    </div>
  )
}

export default OnboardingPreference
