import Birthday from './Birthday/Birthday';
import InputEmail from './InputEmail/InputEmail';
import InputFirstName from './InputFirstName/InputFirstName';
import InputLastName from './InputLastName/InputLastName';
import Sexe from './Sexe/Sexe';
import './Style.scss';
import Submit from './Submit/Submit';

export default function Inscription() {
  return (
    <form>
      <InputLastName />
      <InputFirstName />
      <InputEmail />
      <Birthday />
      <Sexe />
      <Submit />
    </form>
  );
}
