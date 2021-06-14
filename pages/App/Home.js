import Image from 'next/image'
import { useState, useRef, useEffect } from 'react';
import { FormInput } from '../../components/shared/formElements';
import Link from 'next/link'
import { required } from '../../utility/validation-rules';

export default function Home() {

  const [note, setNote] = useState('');
  const [notes, setNotesArray] = useState([]);

  const noteElement = useRef(null);

  useEffect(() => {
    if (noteElement.current) {
      noteElement.current.focus();
    }
  }, []);

  const onNoteChange = (e, value) => {
    setNote(value);
  }

  const addNote = () => {
    if (note === '') {return}
    setNotesArray(arr => [...arr, note]);
    setNote('');
  }

  const deleteNote = (index) => {
    const temp = [...notes];
    temp.splice(index, 1);
    setNotesArray(temp);
  }

  return (
    <div className="container">
      <div className="header">Todo App <br />
        <span className="link">
          <Link href="/about">
            <a>About Us</a>
          </Link>
          &nbsp; &nbsp;
          <Link href="/account">
            <a>Account</a>
          </Link>
        </span>
      </div>
        <div className="addNotes">
          <FormInput
            type="text"
            inputRef={noteElement}
            inputClassNames="input"
            placeholder="Enter new note"
            inputValue={note}
            inputName="New Note"
            onChange={onNoteChange}
            // validationRules={[required]}
          />
          <div className="button" onClick={addNote}>+</div>
          <br />
          <ul>
            {notes && notes.map(( note, index) => {
              return (
                <li key={index} className="note">
                  <span>
                    { note }
                  </span>
                  <button className="deletebtn" onClick={() => deleteNote(index)}>Delete</button>
                </li>
              )
              })
            }
          </ul>
        </div>
      <footer className="footer">
        Powered by{' '}
        <Image
          src="/vercel.svg"
          alt="logo"
          width={72}
          height={16}
        />
      </footer>
    </div>
  )
}
