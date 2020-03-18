/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Bond} from '../../core/bonds';
import TabsBar from '../../components/PageHeader/TabsBar';
import {TabPane} from '../../components/PageHeader/TabPane';
import {InfoWidget} from './InfoWidget';

interface BondDetailsProps {
  data: Bond;
}

export const DetailsView: React.FC<BondDetailsProps> = ({
  data,
}: BondDetailsProps) => {
  const tabs: string[] = ['Info', 'Budget'];

  return (
    <div className="container pd-x-0 pd-lg-x-10 pd-xl-x-0 m-t-20-f pd-t-30-f">
      <TabsBar tabs={tabs} selected={'info'} />
      <TabPane hash={'#info'}>
        <InfoWidget data={data} />
      </TabPane>
      <TabPane hash={'#budget'}>Budget</TabPane>
      {/*<TabPane hash={'budget'}>Hello, budget</TabPane>*/}
    </div>
  );
};