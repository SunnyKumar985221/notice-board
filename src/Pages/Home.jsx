import React, { useState } from 'react';
import Card from './Card';
import { useContext } from 'react';
import { CardContext } from './context';

const Home = () => {
    const { state, dispatch } = useContext(CardContext);
    console.log(state.data);
    const [formhide, setFormHide] = useState(true);
    const [notetext, setNotetext] = useState('');


    const makenote = (e) => {
        e.preventDefault();
        dispatch({ type: "CREATE", payload: { notetext } });
        setFormHide(true);
    }


    return (
        <div className="board-container" id='board-container'>
            {state.data.map((items) => (<>
                <Card key={items.id} id={items.id} text={items.text} />
            </>))}
            <button className='newbutton' onClick={e => setFormHide(false)}>Add Note</button>
            {formhide ? null : (<>
                <div id='form'>
                    <form>
                        <textarea rows={4} onChange={e => setNotetext(e.target.value)} />
                    </form>
                    <button className='savebutton' onClick={makenote}>Save</button>
                </div>
            </>)}

        </div>
    );
};

export default Home;
