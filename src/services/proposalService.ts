export const handleNameSubmit = (
    name: string,
    setShowProposal: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (name.trim() !== '') {
      setShowProposal(true);
    }
  };
  
  export const handleYesClick = (
    setYesClickCount: React.Dispatch<React.SetStateAction<number>>,
    setMessages: React.Dispatch<React.SetStateAction<string[]>>,
    yesMessages: string[],
    updateNoButtonPosition: () => void
  ) => {
    setYesClickCount(prev => {
      const newCount = prev + 1;
      if (newCount <= 7) {
        setMessages(prevMessages => [...prevMessages, yesMessages[newCount - 1]]);
      }
      if (newCount === 7) {
        alert("Lu ga boleh jadi pacar gw!");
      }
      updateNoButtonPosition();
      return newCount;
    });
  };
  
  export const handleNoClick = (name: string, setShowGif: React.Dispatch<React.SetStateAction<string | null>>) => {
    alert(`Terima kasih, ${name}! 💖`);
    setShowGif("https://giphy.com/embed/gnI3EdRuzrL3StP0Iz");
  };