import React, { useMemo } from 'react';
import NashvilleCemeteryData from '../types/NashvilleCemeteryData';
import cemeteriesList from '../nashville-cemeteries.json';
import Interment from '../models/Interment';
import IntermentSort from '../models/IntermentSort';

export type CemeteryDataContextProps = {
  interments: Interment[];
};

export const CemeteryDataContext = React.createContext<CemeteryDataContextProps>({ interments: [] });

interface Props {
  children: React.ReactNode;
}

export const CemeteryDataContextProvider = ({ children }: Props) => {
  const interments = useMemo(() => {
    const result = (cemeteriesList as NashvilleCemeteryData[]).map(data => new Interment(data));
    result.sort(IntermentSort);
    return result;
  }, []);
  return <CemeteryDataContext.Provider value={{ interments }}>{children}</CemeteryDataContext.Provider>;
};