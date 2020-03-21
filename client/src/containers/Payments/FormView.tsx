/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import React from 'react';
import {Payment, PaymentCreateDTO} from '../../core/payments';
import * as yup from 'yup';
import {
  FormikForm,
  FormikFormViewProps,
} from '../../components/Forms/FormikForm';

const formSchema = yup.object({
  bond: yup.string().required(),
  from: yup.string().required(),
  to: yup.string().required(),
  amount: yup.number().required(),
});

const fields = {
  bond: {
    label: 'Bond',
  },

  from: {
    label: 'From account',
  },

  to: {
    label: 'To account',
  },

  amount: {
    label: 'Amount',
  },
};

export const PaymentFormView: React.FC<FormikFormViewProps<
  PaymentCreateDTO
>> = ({data, onSubmit, isSubmitted}) => {
  return (
    <FormikForm
      formSchema={formSchema}
      fields={fields}
      initialValues={data}
      onSubmit={onSubmit}
      isSubmitted={isSubmitted}
    />
  );
};
