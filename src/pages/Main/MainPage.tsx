import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Text, VStack, Box } from '@vapor-ui/core'
import { MeetingCard } from '@/components/Meeting/MeetingCard'
import { RecommendBottomSheet } from '@/components/Meeting/RecommendBottomSheet'
import NavigationBar from '@/components/NavigationBar/NavigationBar'
import ConfirmModal from '@/components/Modal/ConfirmModal'
import { RouterPath } from '@/routes/path'
import dormungLogo from '@/assets/dormung_logo.svg'
import character from '@/assets/character.svg'

const MainPage = () => {
  const navigate = useNavigate()
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  return (
    <>
      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #CBFFEF 100%)',
        }}
      >
        <img
          src={character}
          alt="Character Intro Background"
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '10%',
            width: '320px',
            height: '320px',
            objectFit: 'contain',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        <Box
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 'var(--vapor-size-space-500)',
            paddingBottom: 'var(--vapor-size-space-500)',
            paddingLeft: 'var(--vapor-size-space-250)',
            paddingRight: 'var(--vapor-size-space-250)',
            gap: 'var(--vapor-size-space-600)',
            zIndex: 1,
          }}
        >
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--vapor-size-space-200)',
            }}
          >
            <img
              src={dormungLogo}
              alt="Dormung Logo"
              style={{
                width: 'auto',
                height: '32px',
              }}
            />
          </Box>
          <VStack gap="var(--vapor-size-space-600)">
            <Text typography="heading3" foreground="normal-200">
              토박이님 안녕하세요.
            </Text>
            <VStack gap="var(--vapor-size-space-200)">
              <MeetingCard
                title="취미/여가 활동"
                duration="신규"
                onCheckClick={() => setIsBottomSheetOpen(true)}
              />
            </VStack>
          </VStack>
        </Box>
      </div>
      <RecommendBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        leftButtonText="닫기"
        rightButtonText="탈퇴하기"
        onRightButtonClick={() => {
          setIsBottomSheetOpen(false)
          setIsConfirmModalOpen(true)
        }}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false)
          setIsBottomSheetOpen(true)
        }}
        onLeave={() => {
          setIsConfirmModalOpen(false)
          navigate(RouterPath.HOME)
        }}
      />
      <NavigationBar />
    </>
  )
}

export default MainPage
