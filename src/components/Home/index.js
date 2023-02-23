import Footer from '../Footer';
import Header from '../AppHeader';
import LoginForm from '../LoginForm';

import './style.scss';

function Home() {
  return (
    <div className="Home">

      <Header />
      <LoginForm />
      <Footer />

    </div>
  );
}

export default Home;
