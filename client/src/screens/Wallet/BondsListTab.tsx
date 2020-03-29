/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../store/actions';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {useHistory} from 'react-router';
import {Loading} from '../../components/Loading';
import {STATUS} from '../../store/utils/status';
import {RootState} from '../../store';
import {WalletBondsListWidget} from '../../containers/Bonds/WalletListWidget';
import {WalletBondInfo, getBalance} from '../../core/bonds';

export const BondsListTab: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.bonds.getList());
    dispatch(actions.accounts.getList());
  }, [dispatch]);

  const {data, status} = useSelector((state: RootState) => state.bonds.List);

  const registeredAccounts = useSelector(
    (state: RootState) => state.accounts.List.data,
  );

  let ownBonds: WalletBondInfo[] = [];
  for (const account of registeredAccounts) {
    const bondsOnAccount = (data as WalletBondInfo[])
      .filter(bond => getBalance(bond, account.id) !== undefined)
      .map(bond => {
        bond.account = account.id;
        bond.valueOnAccount = getBalance(bond, account.id);
        return bond;
      });
    ownBonds = [...ownBonds, ...bondsOnAccount];
  }

  const onItemSelected = (id: string) => history.push(`/bonds/${id}`);

  const onIssueNewBond = () => {
    history.push('/bonds/new/');
  };

  if (status === STATUS.LOADING) {
    return <Loading />;
  }
  return (
    <Container style={{padding: 0}}>
      <Row>
        <Col lg={12} md={12} xs={12}>
          <Button size={'sm'} onClick={onIssueNewBond}>
            Issue new bond
          </Button>
          <WalletBondsListWidget
            items={ownBonds}
            onItemSelected={onItemSelected}
          />
        </Col>
      </Row>
    </Container>
  );
};
