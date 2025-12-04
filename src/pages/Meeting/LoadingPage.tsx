import { Text, VStack } from '@vapor-ui/core'
import { PulseLoader } from 'react-spinners'

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
            // color="var(--vapor-color-backgroud-primary-200)"
            color="pink"
            size={8}
            speedMultiplier={0.6}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="/vite.svg" alt="loading" width={200} height={200} />
        </div>
      </VStack>
    </div>
  )
}

export default LoadingPage
