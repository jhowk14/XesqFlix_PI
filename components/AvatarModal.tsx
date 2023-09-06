import React from 'react';

interface AvatarModalProps {
  isOpen: boolean;
  avatars: string[];
  selectedAvatar: string | null;
  onClose: () => void;
  onSelectAvatar: (avatar: string) => void;
}

const AvatarModal: React.FC<AvatarModalProps> = ({
  isOpen,
  avatars,
  selectedAvatar,
  onClose,
  onSelectAvatar,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 m-4">
      <div className="bg-black bg-opacity-80 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Escolha um avatar</h2>
        <div className="grid grid-cols-5 gap-4">
          {avatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`Avatar ${index}`}
              className={`cursor-pointer ${
                selectedAvatar === avatar ? 'border-4 border-red-600' : ''
              }`}
              onClick={() => onSelectAvatar(avatar)}
            />
          ))}
        </div>

        <button
          className="bg-red-600 text-white rounded-md p-3 mt-4 hover:bg-red-700 transition"
          onClick={onClose}
        >
        
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default AvatarModal;
