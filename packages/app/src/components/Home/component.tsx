import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentTime } from '../../selectors/time';

export function Home(): ReactElement {
  const time = useSelector(selectCurrentTime);
  return <>Current time: {time}</>;
}
