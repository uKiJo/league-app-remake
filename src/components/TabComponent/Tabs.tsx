import React, { useState, Fragment } from 'react';

import { Tab } from '@headlessui/react';

import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../Shared/ErrorFallback';
import { AnimatePresence, motion } from 'framer-motion';

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
  const [selectedIndex1, setSelectedIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  console.log(previousIndex);
  console.log(selectedIndex1);
  return (
    <div className="min-h-screen w-full flex flex-col items-center px-2 sm:px-0">
      <Tab.Group
        selectedIndex={selectedIndex1}
        onChange={(index) => {
          setPreviousIndex(selectedIndex1);
          setSelectedIndex(index);
        }}
      >
        <div className="w-full">
          <Tab.List className="flex space-x-1 bg-white border-b border-stroke shadow">
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
        <Tab.Panels className="min-w-[520px] pt-4">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {Object.values(categories).map((posts, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  'rounded-xl p-3 flex items-center',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none '
                )}
              >
                <AnimatePresence>
                  {posts.map((post, id) => (
                    <motion.div
                      key="fixture"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {post.component}
                    </motion.div>
                  ))}
                </AnimatePresence>
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
