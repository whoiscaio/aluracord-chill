import { Box, Button, Image, Text } from '@skynexui/components';

import appConfig from '../../config.json';
import Loading from './Loading';

function MessageList({ messages, deleteMessage, loading }) {

  console.log(messages);

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: '16px',
      }}
    >
      {
        loading && <Box
          styleSheet={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ><Loading /></Box>
      }
      {
        messages.map((message) => (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              backgroundColor: `${appConfig.theme.colors.neutrals[700]}bb`,
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              }
            }}
          >
            <Box
              styleSheet={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
              }}
            >
              <Box>
                <Image
                  styleSheet={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: '8px',
                  }}
                  src={`https://github.com/${message.from}.png`}
                />
                <Text tag="strong">
                  {message.from}
                </Text>
                <Text
                  styleSheet={{
                    fontSize: '10px',
                    marginLeft: '8px',
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag="span"
                >
                  {(new Date().toLocaleDateString())}
                </Text>
              </Box>
              <Box>
                <Button
                  label="X"
                  onClick={() => deleteMessage(message.id, message.from)}
                  styleSheet={{
                    background: 'none',
                    padding: '5px',
                    color: appConfig.theme.colors.primary[100],
                    hover: {
                      color: '#fff',
                    }
                  }}
                  buttonColors={{
                    contrastColor: appConfig.theme.colors.neutrals["000"],
                  }}
                />
              </Box>
            </Box>
            {
              message.sticker
              ? (
                <Image width="150" height="150" src={message.text}/>
              )
              : (
                message.text
              )
            }
          </Text>
        ))
      }
    </Box>
  )
}

export default MessageList;
