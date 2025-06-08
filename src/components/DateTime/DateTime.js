import { Typography } from '@mui/material';
import { fDate } from 'src/utils/formatTime';

export const DateTime = (props) => {
  const { children } = props;

  if (typeof children !== 'string') return <>{children}</>;

  return <Typography>{fDate(children)}</Typography>;
};
