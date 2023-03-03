import PropTypes from 'prop-types';

import useScrollTop from '../hooks/index';

function Page({ children }) {
  useScrollTop();

  return (
    <main className="page">
      {children}
    </main>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
