import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

import SaveIcon from '~/svg/Save.svg';

export default function BetBox() {
  const [cookies, setCookie] = useCookies(['bet']);
  const [value, setValue] = useState(cookies.bet ?? 0.001);

  const handleChange = (event: { target: { value: string } }) => {
    const inputValue = parseFloat(event.target.value);
    if (inputValue >= 0.001 && inputValue <= 0.1) {
      setValue(inputValue);
    }
  };

  return (
    <div className='flex flex-row gap-1'>
      <div className='flex items-center pr-3 font-accent text-lg text-white/70'>
        Bet:
      </div>

      <input
        type='number'
        step='0.001'
        max='0.1'
        value={value}
        onChange={handleChange}
        className='w-48 rounded-xl border-2 border-white/50 bg-transparent py-2 px-4 font-display font-semibold shadow-sm ring-0 focus:outline-none '
      />
      <button
        onClick={() => {
          setCookie('bet', value, { path: '/' });
        }}
        className='rounded-xl bg-[#0E76FD] px-3 text-xl hover:bg-[#2c85fa]'
      >
        <SaveIcon />
      </button>
    </div>
  );
}
