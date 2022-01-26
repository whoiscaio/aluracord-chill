import { Box, Button, Text, TextField, Image } from '@skynexui/components';

import appConfig from '../config.json';
import Title from './Title';

import chillBoredApe from './assets/images/chill-bored-ape.png';
import { useRouter } from 'next/router';

function NotFound() {
  const router = useRouter();

  function handleButtonClick() {
    router.push('/')
  }

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundImage: 'url(https://wallpaperaccess.com/full/1959300.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '500px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          <Box
            as="div"
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: {
                xs: '100%',
                sm: '100%',
              }
            }}
          >
            <Title tag="h2">Tá perdido, meu chapa?</Title>
            <Text
              styleSheet={{
                color: appConfig.theme.colors.neutrals[300],
                marginBottom: '32px',
              }}
            >
              Fica tranquilo, vou te trazer de volta pra realidade!
            </Text>
            <Button
              type="button"
              label="É só clicar aqui!"
              onClick={handleButtonClick}
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[100],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
            <Image
              styleSheet={{
                position: 'absolute',
                top: '0',
                left: '40px',
                transform: 'translateY(-100%)',
                width: '30%',
              }}
              src={chillBoredApe.src}
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default NotFound;