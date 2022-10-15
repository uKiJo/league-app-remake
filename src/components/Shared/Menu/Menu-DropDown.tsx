import React from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface MenuProps {
  trigger: string;
  content: string[];
}

const MenuDropDown: React.FC<MenuProps> = ({ trigger, content }) => {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left hover:bg-tertiary rounded"
    >
      <div>
        <Menu.Button className="inline-flex justify-center w-full items-center shadow-sm p-3 text-base font-medium text-white focus:outline-none ">
          {trigger}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex flex-col p-2">
            {content.map((item) => {
              return (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to={`create/${item.toLocaleLowerCase()}`}
                      className={`hover:bg-gray-50 rounded-lg ${
                        active ? 'bg-gray-100 text-dark-grey' : 'text-gray-500'
                      } 
                      'block p-2 transition-colors`}
                    >
                      {item}
                    </Link>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MenuDropDown;
