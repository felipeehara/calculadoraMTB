import { FC, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode; // Permite passar elementos JSX dentro do Modal
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
        >
          ✖
        </button>

        {/* Conteúdo do Modal */}
        <div>{children}</div>

        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="w-full mt-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;
