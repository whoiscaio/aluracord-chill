import { Box } from '@skynexui/components';
import { useContext } from 'react';
import { useEffect } from 'react';

import appConfig from '../../config.json';
import { DeleteModalContext } from '../contexts/DeleteModalContext';

function DeleteModal() {
  const { toggleModalState } = useContext(DeleteModalContext);

  function handleNoModalClick(e) {
    if(e.target.id === 'modal') return;

    toggleModalState();
  }

  useEffect(() => {
    window.addEventListener('click', handleNoModalClick);

    return () => window.removeEventListener('click', handleNoModalClick);
  }, []);

  return (
    <>
      <Box
        id="overlay"
        styleSheet={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: '#11111188',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box id="modal" styleSheet={{
          position: 'relative',
          background: '#fff',
          padding: '60px 80px',
          borderRadius: '12px',
        }} id="modal">
          <button>X</button>
          <p>Você não pode apagar mensagens dos outros!</p>
        </Box>
      </Box>
      <style jsx>{`

        button {
          background: none;
          border: 0;
          color: ${appConfig.theme.colors.primary[100]};
          
          font-size: 18px;

          position: absolute;
          top: 16px;
          right: 16px;

          cursor: pointer;
        }

        p {
          pointer-events: none;
          color: ${appConfig.theme.colors.primary[100]}
        }
      `}</style>
    </>
  )
}

export default DeleteModal;