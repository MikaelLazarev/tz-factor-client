/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Table} from 'react-bootstrap';
import {Company} from '../../core/companies';

interface CompaniesListProps {
  items: Company[];
  onItemSelected: (id: string) => void;
}

export const CompaniesList: React.FC<CompaniesListProps> = ({
  items,
  onItemSelected,
}: CompaniesListProps) => {
  const renderLine = (h: Company) => (
    <tr onClick={() => onItemSelected(h.id)} key={h.id}>
      <td className="tx-color-03 text-left tx-normal">{h.name}</td>
      <td className="tx-medium text-left">{h.headquaters}</td>
      <td className="tx-medium text-left">{h.website}</td>

      <td className="tx-medium text-left">
        {h.type === 'ISSUER' ? (
          <span
            style={{
              backgroundColor: '#6bd66b',
              paddingLeft: '10px',
              paddingRight: '10px',
              color: 'white',
            }}>
            ISSUER
          </span>
        ) : (
          ''
        )}
      </td>
    </tr>
  );
  // tx-teal tx-pink
  const renderTableContent = items.map(h => renderLine(h));

  return (
    <div className="card card-dashboard-table mg-t-20">
      {/*<!-- card-body -->}*/}
      <div className="table-responsive">
        <Table className="table-dashboard mg-b-0" hover={true}>
          <thead>
            <tr>
              <th style={{width: '25%'}}>Name</th>

              <th>Headquaters</th>
              <th>Web</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderTableContent}</tbody>
        </Table>
      </div>
    </div>
  );
};
