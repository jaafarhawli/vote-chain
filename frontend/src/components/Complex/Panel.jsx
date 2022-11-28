import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../../assets/VOTE CHAIN-logo-white-horizantal.png';
import {PanelComponents, ModeratorPanelComponents} from '../../JSON';

const Panel = (props) => {
  return (
    <div className='fixed top-0 left-0 w-[250px] h-full bg-bg flex flex-col'>
      <img src={logo} alt="" className='w-3/5 self-center pt-8' />
      <h1 className='self-center text-white bg-purple-300/20 w-3/5 text-center mt-6 py-2 font-semibold select-none rounded-[10px]'>{props.admin ? "Admin" : "Moderator"}</h1>
      <ul className='flex flex-col w-full mt-6'>
      {props.admin ?
      PanelComponents.map((item, index) => {
          return (         
            <NavLink to={item.path} className='flex items-center gap-3 text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4 font-semibold' key={index} activeclassname='active'>
                {item.icon}
                <p>{item.title}</p>
            </NavLink>
            );
          })
        :
        ModeratorPanelComponents.map((item, index) => {
          return (         
            <NavLink to={item.path} className='flex items-center gap-3 text-white/60 text-xl w-full hover:bg-purple-300/40 duration-200 py-4 pl-4 font-semibold' key={index} activeclassname='active'>
                {item.icon}
                <p>{item.title}</p>
            </NavLink>
            );
          })
          }
      </ul>
    </div>
  );
}

export default Panel;
