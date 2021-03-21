import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { Home } from '../Home/component';
import { selectPage } from '../../selectors/page';

const ContentSwitch = () => {
  const page = useSelector(selectPage);
  switch (page) {
    case 'HOME': {
      return <Home />;
    }
    default: {
      return <div>Error: unknown page</div>;
    }
  }
};

export const Content = styled(ContentSwitch)(
  css`
    grid-area: content;
  `,
);
