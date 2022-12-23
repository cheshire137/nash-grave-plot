import { Dialog, Box } from '@primer/react';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  id: string;
  onDismiss: () => void;
}

const FilterModal = ({ isOpen, id, children, onDismiss }: Props) => {
  return <Dialog isOpen={isOpen} aria-labelledby={id} onDismiss={onDismiss}>
    <Dialog.Header id={id}>Filter graves</Dialog.Header>
    <Box p="3">{children}</Box>
  </Dialog>;
};

export default FilterModal;
