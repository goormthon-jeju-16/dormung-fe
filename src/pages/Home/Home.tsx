import { Box, Button, VStack } from '@vapor-ui/core'
import { useNavigate } from 'react-router-dom'

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
      <Box render={<h3 />}>도르멍</Box>
      <Box render={<p />}>
        우리 서비스는 어쩌구 입니다. <br /> 어떻게 서비스를 시작해보아요
      </Box>
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
