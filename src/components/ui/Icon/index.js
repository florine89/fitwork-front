/* eslint-disable import/no-extraneous-dependencies */
import IcoMoon from 'react-icomoon';
import iconSet from './selection.json';

function Icon(props) {
  return <IcoMoon iconSet={iconSet} {...props} />;
}

export default Icon;
