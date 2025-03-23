import React from 'react';
import '../styles/Participant.css';

const Participant = ({ participant, onRemoveParticipant }) => {
  return (
    <li className="participant-item">
      <span className="participant-name">{participant}</span>
      <button 
        className="remove-btn" 
        aria-label="Remove participant"
        onClick={() => onRemoveParticipant(participant)}
      >
        ×
      </button>
    </li>
  );
};

export default Participant;