import { useCallback, useState, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current.select();
  }

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numbersAllowed)
    {
      str += "0123456789"
    }
    if(charAllowed)
    {
      str += "!@#$%^&*()_+"
    }

    for(let i = 0; i < length; i++)
    {
      const char = Math.floor(Math.random() * str.length + 1)
      pass = pass + str.charAt(char);
    }

    setPassword(pass);

  }, [numbersAllowed, charAllowed, length])

  useEffect(() => {
    generatePassword();
  },[length, numbersAllowed, charAllowed])

  return (
    <div className='w-fullm max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className = 'text-3xl font-bold mb-2 text-center'> Password Generator </h1>
        <div className = 'flex shadow rounded-lg overflow-hidden mb-4'>
          <input
          type = "text"
          value = {password}
          className = 'outline-none w-full py-1 px-3'
          placeholder = 'Password'
          readOnly
          id='password'
          ref = {passwordRef}
          /> 
          <button className = 'outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer' onClick = {copyPasswordToClipboard}>Copy</button>
        </div>
        <div className = 'flex text-sm gap-x-2'>
          <div className = 'flex items-center gap-x-1'>
            <input
            type = 'range'
            min={6}
            max={20}
            value = {length}
            id = 'length'
            className = 'cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor='length'>Length: {length}</label>
          </div>
          <div className = 'flex items-center gap-x-1'>
            <input
            type = 'checkbox'
            id = 'Numbers'
            checked = {numbersAllowed}
            onChange={() => setNumbersAllowed((prev) => !prev)}
            />
            <label htmlFor='Numbers'>Numbers</label>
          </div>
          <div className = 'flex items-center gap-x-1'>
            <input
            id = 'Characters'
            type = 'checkbox'
            checked = {charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor='Characters'>Characters</label>
          </div>
        </div>
    </div>
  )
}

export default App
