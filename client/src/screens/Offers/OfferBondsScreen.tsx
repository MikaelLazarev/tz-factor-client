/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RouteComponentProps, useHistory} from 'react-router';

import PageHeader from '../../components/PageHeader/PageHeader';
import {Breadcrumb} from '../../components/PageHeader/Breadcrumb';
import {OfferBondsFormView} from '../../containers/Offers/OfferFormIView';

import {RootState} from '../../store';
import {STATUS} from '../../store/utils/status';
import actions from '../../store/actions';
import {OfferCreateDTO} from '../../core/offers';

interface MatchParams {
  id: string;
  account: string;
}

interface OfferBondsScreenProps extends RouteComponentProps<MatchParams> {}

export const OfferBondsScreen: React.FC<OfferBondsScreenProps> = ({
  match: {
    params: {id, account},
  },
}: OfferBondsScreenProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [hash, setHash] = useState('0');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const operationStatus = useSelector(
    (state: RootState) => state.operations.data[hash]?.data,
  );

  const bondsAvaible = useSelector((state: RootState) => state.bonds.List.data);

  const fromAccounts = useSelector(
    (state: RootState) => state.accounts.LocalList.data,
  );

  const data: OfferCreateDTO = {
    bondId: parseInt(id),
    account: account,
    amount: 0,
    price: 100,
  };

  useEffect(() => {
    dispatch(actions.bonds.getList());
    dispatch(actions.accounts.getList());
  }, []);

  useEffect(() => {
    if (hash !== '0') {
      switch (operationStatus?.status) {
        case STATUS.SUCCESS:
          history.push(`/bonds/${id}`);
          break;

        case STATUS.FAILURE:
          setHash('0');
          setIsSubmitted(false);
          alert('Error! ' + operationStatus?.error);
      }
    }
  }, [hash, operationStatus]);

  const onSubmit = (values: OfferCreateDTO) => {
    console.log(values);
    setIsSubmitted(true);
    const newHash = Date.now().toString();
    setHash(newHash);
    dispatch(actions.offers.createOffer(values, newHash));
  };

  const breadcrumbs: Breadcrumb[] = [
    {
      url: '/bonds',
      title: 'bonds',
    },
  ];

  return (
    <div className="content content-fixed">
      <PageHeader title={'New bond offer'} breadcrumbs={breadcrumbs} />
      <OfferBondsFormView
        data={data}
        onSubmit={onSubmit}
        isSubmitted={isSubmitted}
        bondsAvaible={bondsAvaible}
        fromAccounts={fromAccounts}
      />
    </div>
  );
};
