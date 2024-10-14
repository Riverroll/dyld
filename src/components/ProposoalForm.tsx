import React, { useState, useEffect, useRef } from 'react';
import { handleNameSubmit, handleNoClick, handleYesClick } from '../services/proposalService';

const ProposalForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [showProposal, setShowProposal] = useState<boolean>(false);
  const [noButtonSize] = useState<number>(80);
  const [noButtonPosition, setNoButtonPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [yesClickCount, setYesClickCount] = useState<number>(0);
  const [showGif, setShowGif] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showGif === "https://giphy.com/embed/gnI3EdRuzrL3StP0Iz") {
      const timer = setTimeout(() => {
        setShowProposal(false);
        setShowGif(null);
        setName('');
        setYesClickCount(0);
        setMessage('');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showGif]);

  const yesMessages = [
    "Yakin nih?",
    "Beneran mau?",
    "Pikir lagi deh...",
    "Ayo dong, jangan...",
    "Jangan gitu ah :(",
    "Satu kali aja tolak",
    "Terakhir nih, jangan ya?"
  ];

  const updateNoButtonPosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const maxWidth = rect.width - noButtonSize;
      const maxHeight = rect.height - noButtonSize / 2;
      
      // Calculate new position
      let newX = noButtonPosition.x + (Math.random() - 0.5) * 100;
      let newY = noButtonPosition.y + (Math.random() - 0.5) * 100;
      
      // Constrain within bounds
      newX = Math.max(0, Math.min(newX, maxWidth));
      newY = Math.max(0, Math.min(newY, maxHeight));
      
      setNoButtonPosition({ x: newX, y: newY });
    }
  };

  const handleYesClickWrapper = () => {
    handleYesClick(setYesClickCount, setMessage, yesMessages, updateNoButtonPosition);
  };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden" ref={containerRef}>
      {/* Animasi laut/awan 8-bit */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-blue-800 opacity-30"></div>
        
        {/* Waves */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <div className="w-[200%] h-full bg-blue-700 animate-wave"></div>
        </div>
        
        {/* 8-bit ship */}
        <div className="absolute bottom-16 left-0 w-20 h-16 animate-ship-bounce">
          <div className="w-16 h-8 bg-gray-700 absolute bottom-0 left-2"></div>
          <div className="w-4 h-12 bg-gray-800 absolute bottom-8 left-8"></div>
          <div className="w-12 h-4 bg-white absolute top-4 left-4"></div>
        </div>
        
        {/* Clouds */}
        <div className="absolute inset-0 animate-cloud-loop">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full w-16 h-8"
              style={{
                left: `${i * 25}%`,
                top: `${Math.random() * 30}%`,
                boxShadow: '0 0 0 2px black'
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md mx-auto text-center font-pixel text-green-400 z-10">
        {!showProposal ? (
          <>
            <h1 className="text-2xl font-bold mb-4 pixelated">Halo! Siapa namamu?</h1>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan namamu"
              className="w-full border-2 border-green-400 bg-black p-2 mb-4 rounded text-center text-green-400 pixelated"
            />
            <button
              onClick={() => handleNameSubmit(name, setShowProposal)}
              className="w-full bg-green-400 text-black px-4 py-2 rounded hover:bg-green-500 transition-colors pixelated"
            >
              Lanjut
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4 pixelated">{name}, maukah kamu menjadi pacarku?</h1>
            <div className="relative h-40">
              <button
                onClick={() => handleNoClick(name, setShowGif)}
                className="absolute bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all pixelated"
                style={{ 
                  width: '80px', 
                  height: '40px',
                  left: '50%',
                  top: '0',
                  transform: 'translateX(-50%)'
                }}
              >
                Ya
              </button>
              <button
                onClick={handleYesClickWrapper}
                className="absolute bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all pixelated"
                style={{ 
                  width: `${noButtonSize}px`, 
                  height: `${noButtonSize / 2}px`,
                  left: `${noButtonPosition.x}px`,
                  top: `${noButtonPosition.y}px`
                }}
              >
                Tidak
              </button>
            </div>
            {showGif && (
              <div className="mt-8">
                <iframe 
                  src={showGif} 
                  width="100%" 
                  height="200" 
                  style={{border: 0}} 
                  className="giphy-embed pixelated" 
                  allowFullScreen
                ></iframe>
              </div>
            )}
            {message && (
              <p className="mt-2 pixelated">{message}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProposalForm;