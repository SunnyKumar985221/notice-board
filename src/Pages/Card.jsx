import React, { useState, useContext, useEffect } from 'react';
import { CardContext } from './context';
import { useRef } from 'react';

const Card = ({ id, text }) => {
    const spanRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [zindex, setZindex] = useState(0);
    const [draggable, setDraggable] = useState(true);
    const { dispatch } = useContext(CardContext);

    const deleteCard = (e) => {
        e.preventDefault();
        dispatch({ type: "DELETE", payload: { id } });
    }

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    }

    const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
    const [initialOffset, setInitialOffset] = useState({ x: 0, y: 0 });

    const dragStart = (e) => {
        if (draggable) {
            const offsetX = e.clientX - e.target.getBoundingClientRect().left;
            const offsetY = e.clientY - e.target.getBoundingClientRect().top;
            setInitialOffset({ x: offsetX, y: offsetY });
        }
    };

    const dragEnd = (e) => {
        e.preventDefault();
        const boardRect = document.getElementById('board-container').getBoundingClientRect();
        const offsetX = e.clientX - boardRect.left - initialOffset.x;
        const offsetY = e.clientY - boardRect.top - initialOffset.y;

        setCardPosition({
            x: offsetX,
            y: offsetY,
        });
    };

    const setPin = (e) => {
        setZindex(999);
        setDraggable(!draggable);
        // setTimeout(() => {
        //     setDraggable(true);
        // }, 100);
    }

    useEffect(() => {
        if (isEditing) {
            spanRef.current.focus();
        }
    }, [isEditing]);

    return (
        <>
            <div
                className={`card-container ${isEditing ? 'editing' : ''}`}
                draggable={draggable}
                onDragStart={dragStart}
                onDragEnd={dragEnd}
                style={{ left: `${cardPosition.x}px`, top: `${cardPosition.y}px`, position: 'absolute', zIndex: `${zindex}` }}
            >
                <div>
                    <br />
                    <span
                        ref={spanRef}
                        contentEditable={isEditing}
                        onClick={toggleEditing}
                    >
                        {text}
                    </span>
                    <button className='edit' onClick={toggleEditing}>Edit</button>
                    <button className='delete' onClick={deleteCard}>&#x274C;</button>
                    <button className='pin' onClick={setPin}>&#x1F4CC;</button>
                </div>
            </div>
        </>
    );
};

export default Card;
