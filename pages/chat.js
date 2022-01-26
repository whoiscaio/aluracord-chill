import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState, useRef } from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const inputRef = useRef();

  function handleInputChange(e) {
    setMessage(e.target.value);
  }

  function handleCreateMessage(message) {
    if (message.trim() === '') return;

    setMessageList((prevState) => [
      {
        de: 'whoiscaio',
        text: message,
        id: Math.random(),
      },
      ...prevState,
    ]);

    setMessage('');
    inputRef.current?.focus();
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();

      console.log('enter');

      handleCreateMessage(message);
    }
  }

  function handleDeleteMessage(id) {
    setMessageList((prevState) => prevState.filter((message) => message.id !== id));
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    handleCreateMessage(message);
  }

  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://wallpaperaccess.com/full/1959300.jpg)`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: `${appConfig.theme.colors.neutrals[800]}66`,
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >

          <MessageList messages={messageList} deleteMessage={handleDeleteMessage} />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              ref={inputRef}
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Insira sua message aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Box
              styleSheet={{
                height: 'calc(100% - 8px)',
                marginBottom: '8px',
              }}
            >
              <Button
                type="submit"
                onClick={handleFormSubmit}
                label="Enviar"
                styleSheet={{
                  height: '100%',
                  backgroundColor: appConfig.theme.colors.primary[100],
                  hover: {
                    backgroundColor: '#fff',
                    color: appConfig.theme.colors.primary[100],
                  }
                }}
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals[100],
                  mainColor: appConfig.theme.colors.primary[100],
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

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

function MessageList({ messages, deleteMessage }) {

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
                  src={`https://github.com/whoiscaio.png`}
                />
                <Text tag="strong">
                  {message.de}
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
                  onClick={() => deleteMessage(message.id)}
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
            {message.text}
          </Text>
        ))
      }
    </Box>
  )
}