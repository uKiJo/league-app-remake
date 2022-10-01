import React from 'react';

import { Tab } from '@headlessui/react';

import { ErrorBoundary } from '../Shared/ErrorBoundary';
// import { ErrorBoundary } from 'react-error-boundary';

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
    <div className="min-h-screen w-5/12 flex flex-col items-center px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex w-96 space-x-1 rounded-xl bg-primary p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-primary',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none ',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="min-w-[70%] pt-4">
          <ErrorBoundary key={Math.random()}>
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

export default Tabs;
