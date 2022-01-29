import { Box, TextField, Image, Button } from '@skynexui/components';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect, useContext } from 'react';
import appConfig from '../config.json';
import ButtonSendSticker from '../src/components/ButtonSendSticker';
import DeleteModal from '../src/components/DeleteModal';
import Header from '../src/components/Header';
import MessageList from '../src/components/MessageList';
import { DeleteModalContext } from '../src/contexts/DeleteModalContext';
import { UserContext } from '../src/contexts/UserContext';

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM2ODc4NiwiZXhwIjoxOTU4OTQ0Nzg2fQ.5KZfLkH07Fzw5RZH8vVteR_QxGNZgQUh2zRrj-C_dHw';
const SUPABASE_URL = 'https://hlpiqeaibzbrdhmaysdq.supabase.co'; // API Endpoint

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const { username } = useContext(UserContext);
  const { isModalOpen, toggleModalState } = useContext(DeleteModalContext);

  function listenSupabase(addNewMessage, removeMessage) {
    supabaseClient
      .from('messages')
      .on('*', (data) => {
        switch(data.eventType) {
          case 'INSERT':
            addNewMessage(data.new);
          case 'DELETE':
            removeMessage(data.old.id);
          default: 
            return null;
        }
      })
      .subscribe();
  }

  function handleMessageUIInsertion(newMessage) {
    setMessageList((prevState) => [
      newMessage,
      ...prevState,
    ])
  }

  function handleMessageUIRemoval(messageId) {
    setMessageList((prevState) => prevState.filter((message) => message.id !== messageId));
  }

  useEffect(() => {
    if (!username) router.push('/');

    let subscribe;

    (async () => {
      try {
        const req = await supabaseClient.from('messages').select('*').order('id', { ascending: false });

        setMessageList(req.data);
        setLoading(false);
        subscribe = listenSupabase(handleMessageUIInsertion, handleMessageUIRemoval);
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      subscribe?.unsubscribe();
    };
  }, []);

  const inputRef = useRef();

  function handleInputChange(e) {
    setMessage(e.target.value);
  }

  function handleCreateMessage(message, isSticker) {
    if (message.trim() === '') return;

    const newMessage = {
      from: username,
      text: message,
      sticker: isSticker || false,
    }

    supabaseClient.from('messages').insert([
      newMessage
    ]).then((data) => {});

    setMessage('');
    inputRef.current?.focus();
  }

  function handleKeyPress(e) {
    if (e.key !== 'Enter') return;

    e.preventDefault();

    handleCreateMessage(message);
  }

  function handleDeleteMessage(id, messageSender) {
    console.log('try to delete');
    if (messageSender !== username) {
      toggleModalState();
      return;
    }

    supabaseClient.from('messages').delete().match({ id }).then((data) => {});
    console.log(messageList);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    handleCreateMessage(message);
  }

  function handleStickerClick(sticker) {
    handleCreateMessage(sticker, true);
  }

  return (
    <>
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
                  display: 'flex',
                }}
              >
                <ButtonSendSticker onStickerClick={handleStickerClick} />
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
      { isModalOpen && <DeleteModal /> }
    </>
  )
}