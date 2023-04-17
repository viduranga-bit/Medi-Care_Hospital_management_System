import React,{useEffect,useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { RoleManager } from '../RoleManager';
import jwt_decode from 'jwt-decode';




const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  
  const [decoded, setdecoded] = useState();
  //decode jwt token
  useEffect(() => {
    console.log(isVisibleOption("nurse"))
    
  },[]);

  const isVisibleOption = (name) => {
    if ("token" in localStorage) {
      const token = localStorage.getItem("token");
      const user =jwt_decode(token);
      if(RoleManager[user?.role?.authority].includes(name))
        return true;
      return false;
    }
    return false;
  };


  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pr-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pr-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';  
  return (
    <div className=" h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-2 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <SiShopware/> <span>MediCare</span>
            </Link>
            
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.path}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                      display:isVisibleOption(link.name)?"flex":"none",
                      minWidth: '200px'
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
