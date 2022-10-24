import React, { useState } from 'react';

import FixtureComponent from '../components/Fixture/Fixture';
import Tabs from '../components/TabComponent/Tabs';
import Table from '../components/Table/Table';

interface OverviewProps {}

const Overview: React.FC<OverviewProps> = (props) => {
  let [categories] = useState({
    Fixture: [
      {
        component: <FixtureComponent />,
        id: 'Fixture',
      },
    ],
    Table: [
      {
        component: <Table />,
        id: 'Table',
      },
    ],
  });

  // let categoriess = [<FixtureComponent />, <Table />];

  return (
    <div className="flex w-full flex-col items-center justify-center bg-slate-100">
      <Tabs categories={categories} />
    </div>
  );
};

export default Overview;
