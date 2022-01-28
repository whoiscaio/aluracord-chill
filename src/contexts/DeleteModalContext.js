import { createContext, useState } from 'react';

const DeleteModalContext = createContext();

function DeleteModalProvider({children}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModalState() {
    setIsModalOpen((prevState) => !prevState);
  }

  return (
    <DeleteModalContext.Provider value={{isModalOpen, toggleModalState}}>
      {children}
    </DeleteModalContext.Provider>
  )
}

export { DeleteModalContext }
export default DeleteModalProvider;