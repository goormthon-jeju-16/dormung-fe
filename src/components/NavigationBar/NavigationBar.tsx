import { Box, HStack, Text, VStack } from '@vapor-ui/core'
import { HomeIcon, NoticeBoardIcon, UserIcon } from '@vapor-ui/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { RouterPath } from '@/routes/path'

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  path: string
}

const NavigationBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems: NavItem[] = [
    {
      id: 'recommend',
      label: '추천매칭',
      icon: HomeIcon,
      path: RouterPath.ONBOARDING_PROFILE,
    },
    {
      id: 'board',
      label: '게시판',
      icon: NoticeBoardIcon,
      path: RouterPath.BOARD_LIST,
    },
    {
      id: 'mypage',
      label: '마이페이지',
      icon: UserIcon,
      path: RouterPath.MAIN,
    },
  ]

  const handleNavClick = (path: string) => {
    navigate(path)
  }

  return (
    <Box
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: '1px solid var(--vapor-color-border-normal)',
        backgroundColor: '#ffffff',
        zIndex: 1000,
        maxWidth: '393px',
        margin: '0 auto',
      }}
    >
      <HStack
        justifyContent="space-around"
        alignItems="center"
        padding="$200"
        gap="$100"
      >
        {navItems.map(item => {
          const isActive = location.pathname.startsWith(item.path)
          const Icon = item.icon

          return (
            <VStack
              key={item.id}
              gap="$50"
              alignItems="center"
              onClick={() => handleNavClick(item.path)}
              style={{
                cursor: 'pointer',
                flex: 1,
                opacity: isActive ? 1 : 0.6,
              }}
            >
              <Icon
                style={{
                  color: isActive
                    ? 'var(--vapor-color-primary-200)'
                    : 'var(--vapor-color-gray-300)',
                }}
              />

              <Text
                typography="body3"
                style={{
                  color: isActive
                    ? 'var(--vapor-color-primary-200)'
                    : 'var(--vapor-color-gray-300)',
                }}
              >
                {item.label}
              </Text>
            </VStack>
          )
        })}
      </HStack>
    </Box>
  )
}

export default NavigationBar
