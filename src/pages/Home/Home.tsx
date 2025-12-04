import { Text, Button, VStack, HStack } from '@vapor-ui/core'
import { useNavigate } from 'react-router-dom'
import dormungLogoWithBorder from '@/assets/logo_border.svg'
import jejuIsland from '@/assets/jeju_island.svg'
import jejuTangerine from '@/assets/jeju_tangerine.svg'
import jejuDol from '@/assets/jeju-dol.svg'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <VStack
      alignItems="center"
      justifyContent="center"
      gap="$400"
      padding="$500"
      style={{
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <VStack
        style={{ marginBottom: 'calc(-1 * var(--vapor-size-space-100))' }}
      >
        <img src={jejuTangerine} alt="Jeju Tangerine" />
      </VStack>
      <HStack gap="$300">
        <img src={jejuIsland} alt="Jeju Island" />
        <img src={dormungLogoWithBorder} alt="Border Dormung" />
        <img src={jejuDol} alt="Jeju Dol" />
      </HStack>
      <Text typography="body1" style={{ textAlign: 'center' }}>
        다양한 사람들이 모여 <br /> 제주를 더 다채롭게 만드는 곳, 도르멍
      </Text>
      <Button
        colorPalette="primary"
        size="lg"
        variant="fill"
        width="100%"
        onClick={() => navigate('/onboardingprofile')}
      >
        프로필 입력하러 가기
      </Button>
    </VStack>
  )
}

export default HomePage
