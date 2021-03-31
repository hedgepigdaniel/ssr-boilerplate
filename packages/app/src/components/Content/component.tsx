import { useSelector } from 'react-redux';
import { Home } from '../Home/component';
import { selectPage } from '../../selectors/page';

export function Content(): JSX.Element {
  const page = useSelector(selectPage);
  switch (page) {
    case 'HOME': {
      return <Home />;
    }
    default: {
      return <div>Error: unknown page</div>;
    }
  }
}
