import React from 'react';

import { Tab } from '@headlessui/react';

import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../Shared/ErrorFallback';
import { motion } from 'framer-motion';

import './Tabs.scss';

interface TabsProps {
  categories: {
    Fixture: { component: JSX.Element }[];
    Table: { component: JSX.Element }[];
  };
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Tabs: React.FC<TabsProps> = ({ categories }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center px-2 sm:px-0">
      <Tab.Group>
        <div className="w-full">
          <Tab.List className="flex space-x-1 bg-medium-grey border-b border-stroke shadow">
            {Object.keys(categories).map((category) => (
              <>
                <Tab
                  key={category}
                  onClick={() => console.log('tab clicked!')}
                  className={({ selected }) =>
                    classNames(
                      'relative w-32 rounded-lg py-2.5 text-sm font-medium leading-5 text-dark-grey h-[60px]',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none ',
                      selected ? 'text-primary' : ''
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      {category}
                      {selected && (
                        <motion.div
                          layoutId="underline"
                          transition={spring}
                          className="absolute bottom-0 bg-primary h-1 w-full"
                        ></motion.div>
                      )}
                    </>
                  )}
                </Tab>
              </>
            ))}
          </Tab.List>
        </div>
        <Tab.Panels className="min-w-[70%] pt-4">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {Object.values(categories).map((posts, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  ' rounded-xl p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none '
                )}
              >
                {posts.map((post) => post.component)}
              </Tab.Panel>
            ))}
          </ErrorBoundary>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

const spring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
};

export default Tabs;
