import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { createClient } from '@supabase/supabase-js';
import React, { useState, useRef, useEffect, useContext } from 'react';
import appConfig from '../config.json';
import Loading from './components/Loading';
import { UserContext } from './contexts/UserContext';

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM2ODc4NiwiZXhwIjoxOTU4OTQ0Nzg2fQ.5KZfLkH07Fzw5RZH8vVteR_QxGNZgQUh2zRrj-C_dHw';
const SUPABASE_URL = 'https://hlpiqeaibzbrdhmaysdq.supabase.co'; // API Endpoint

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { username } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const data = await supabaseClient.from('messages').select('*').order('id', { ascending: false });

        setMessageList(data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const inputRef = useRef();

  function handleInputChange(e) {
    setMessage(e.target.value);
  }

  function handleCreateMessage(message) {
    if (message.trim() === '') return;

    const newMessage = {
      from: username,
      text: message,
    }

    supabaseClient.from('messages').insert([
      newMessage
    ]).then(({ data }) => {
      setMessageList((prevState) => [
        data[0],
        ...prevState,
      ])
    });

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
          <MessageList messages={messageList} deleteMessage={handleDeleteMessage} loading={loading} />

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

function MessageList({ messages, deleteMessage, loading }) {

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