import { Text, VStack } from '@vapor-ui/core'
import { PulseLoader } from 'react-spinners'
import character from '@/assets/loading-character.svg'

const LoadingPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        paddingTop: 'var(--vapor-size-space-500)',
        paddingBottom: 'var(--vapor-size-space-500)',
        paddingLeft: 'var(--vapor-size-space-250)',
        paddingRight: 'var(--vapor-size-space-250)',
        background:
          'linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 50%, #CBFFEF 100%)',
      }}
    >
      <VStack gap="var(--vapor-size-space-400)" alignItems="center">
        <Text
          typography="heading3"
          foreground="normal-200"
          style={{ textAlign: 'center' }}
        >
          소모임 추천 중이에요
        </Text>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PulseLoader
            color="var(--vapor-color-primary-200)"
            size={8}
            speedMultiplier={0.6}
            style={{
              position: 'absolute',
              top: '350px',
              left: '182px',
              zIndex: 2,
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={character} alt="loading" width={280} height={280} />
        </div>
      </VStack>
    </div>
  )
}

export default LoadingPage
