import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Flash } from '@primer/react';

const getErrorMessage = (err: any) => {
  if (isRouteErrorResponse(err)) return err.data;
  if (err instanceof Error) return err.message;
  return err?.message || 'Unknown error';
};

const ErrorPage = () => {
  const error = useRouteError();
  const errorMessage = getErrorMessage(error);
  console.error(errorMessage);
  return <Flash variant="danger">{errorMessage}</Flash>;
};

export default ErrorPage;
