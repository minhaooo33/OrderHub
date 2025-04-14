import { Outlet, useParams } from 'react-router-dom';
import Header from './Header';
import Cart from './Cart';

function Layout() {
  const { tableId } = useParams();

  return (
    <>
      <Header tableNumber={tableId} />
      <Outlet context={{ tableId }} />
      <Cart tableNumber={tableId} />
    </>
  );
}

export default Layout;