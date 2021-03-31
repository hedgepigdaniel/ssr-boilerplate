import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentTime } from '../../selectors/time';

const HomeContainer = styled.div(css`
  text-align: center;
`);

export function Home(): ReactElement {
  const time = useSelector(selectCurrentTime);
  return <HomeContainer>Current time: {time}</HomeContainer>;
}
