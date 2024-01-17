import React, { useState } from 'react';


const Player = ({ initialName, symbol, isActive, onChangeName }) => {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditng] = useState(false);

    function handleEditClick() {
        // setIsEditng(isEditing ? false : true);
        // setIsEditng(!isEditing)
        setIsEditng((editing) => !editing)
        if (isEditing) {
            onChangeName(symbol, playerName)
        }
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let editableplayerName = <span className='player-name'>{playerName}</span>;
    //  let btnCaption='Edit'
    if (isEditing) {
        editableplayerName = <input type='text' required value={playerName} onChange={handleChange} />
        //    btnCaption='Save'
    }

    return (
        <>
            <li className={isActive ? 'active' : undefined}>
                <span className='players'>
                    {editableplayerName}
                    {/* <span className='player-name'>{name}</span> */}
                    <span className='player-symbol'>{symbol}</span>
                </span>
                <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
            </li>
        </>
    );
}

export default Player;
