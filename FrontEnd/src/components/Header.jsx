import React from 'react';

const Header = ({ category, title , value}) => (
  <div>
    <p className="text-lg text-gray-400">{category}</p>
    <p className="mb-4  text-3xl align center font-extrabold tracking-tight text-slate-800">
      {title} {value}
    </p>
  </div>
);

export default Header;
