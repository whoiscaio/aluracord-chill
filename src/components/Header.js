import { Box, Button, Text } from '@skynexui/components';
import appConfig from '../../config.json';

function Header() {
  return (
    <>
      <Box styleSheet={{
        width: '100%',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Text variant='heading5'>
          Chat
        </Text>
        <Button
          label='Logout'
          href="/"
          styleSheet={{
            backgroundColor: '#fff',
            color: appConfig.theme.colors.primary[100],
            hover: {
              backgroundColor: appConfig.theme.colors.primary[100],
              color: '#fff',
            }
          }}
          buttonColors={{
            contrastColor: '#fff',
            mainColor: appConfig.theme.colors.primary[100],
          }}
        />
      </Box>
    </>
  )
}

export default Header;
