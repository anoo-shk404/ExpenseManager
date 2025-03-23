import React, { useState } from 'react';
import Participant from './Participant';
import '../styles/ParticipantsList.css';

const ParticipantsList = ({ participants, setParticipants }) => {
  const [newParticipant, setNewParticipant] = useState('');

  // Add a new participant
  const handleAddParticipant = () => {
    if (newParticipant.trim() !== '' && !participants.includes(newParticipant.trim())) {
      const updatedParticipants = [...participants, newParticipant.trim()];
      setParticipants(updatedParticipants);
      setNewParticipant('');
      
      // Update localStorage
      localStorage.setItem('participants', JSON.stringify(updatedParticipants));
    }
  };

  // Handle key press (Enter) to add participant
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddParticipant();
    }
  };

  // Remove a participant
  const handleRemoveParticipant = (participantToRemove) => {
    const updatedParticipants = participants.filter(p => p !== participantToRemove);
    setParticipants(updatedParticipants);
    
    // Update localStorage
    localStorage.setItem('participants', JSON.stringify(updatedParticipants));
  };

  return (
    <div className="participants-section">
      <h2>Participants</h2>
      <div className="add-participant">
        <input
          type="text"
          value={newParticipant}
          onChange={(e) => setNewParticipant(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter name"
          aria-label="Enter participant name"
        />
        <button onClick={handleAddParticipant}>Add</button>
      </div>
      
      {participants.length > 0 ? (
        <ul className="participants-list">
          {participants.map(participant => (
            <Participant 
              key={participant}
              participant={participant}
              onRemoveParticipant={handleRemoveParticipant}
            />
          ))}
        </ul>
      ) : (
        <p className="no-data">No participants added yet.</p>
      )}
    </div>
  );
};

export default ParticipantsList;