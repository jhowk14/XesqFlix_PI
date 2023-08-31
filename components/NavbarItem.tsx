import React from 'react';

interface NavbarItemProps {
  label: string;
  active?: boolean;
  href?: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, active, href }) => {
  return (
    <a href={href}>
    <div className={active ? 'text-white cursor-default' : 'text-gray-200 hover:text-gray-300 cursor-pointer transition'}>
      {label}
    </div>
    </a>
  )
}

export default NavbarItem;
