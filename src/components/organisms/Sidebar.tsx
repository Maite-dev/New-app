// src/components/organisms/Sidebar.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import {
  AiFillHome,
  AiFillDollarCircle,
  AiFillBank,
  AiFillFileText,
  AiOutlineLogout,
  AiOutlineUser,
  AiOutlineShop,
  AiOutlinePercentage,
} from 'react-icons/ai';
import { MdApartment } from 'react-icons/md';

interface MenuItem {
  icon: React.ComponentType<any>;
  href: string;
}

const menuItems: MenuItem[] = [
  { icon: AiFillHome, href: '/' },
  { icon: AiOutlineUser, href: '/usuarios' },
  { icon: AiOutlineShop, href: '/comerciales' },
  { icon: AiOutlinePercentage, href: '/tasa-de-cambio' },
  { icon: MdApartment, href: '/clientes' },
  { icon: AiFillFileText, href: '/codigo-transaccionales' },
  { icon: AiFillFileText, href: '/estado-de-cuenta' },
  { icon: AiFillBank, href: '/cargos-bancarios' },
  { icon: AiFillDollarCircle, href: '/abonos-bancarios' },
  { icon: AiFillDollarCircle, href: '/comisiones-bancarias' },
  { icon: AiOutlineLogout, href: '/salir' },
];

const Sidebar: React.FC = () => {
  return (
    <div className="bg-white w-20 h-screen fixed top-0 left-0 py-4 shadow-md">
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-center p-3 rounded-md hover:bg-gray-100 cursor-pointer"
            >
              <Link href={item.href} className="text-gray-700">
                <item.icon size={24} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;