/* eslint-disable jsx-a11y/label-has-associated-control */
export default function Sexe() {
  return (
    <>
      <div>
        <label htmlFor="Homme">Homme: </label>
        <input type="radio" name="Homme" id="Homme" checked />
      </div>
      <div>
        <label htmlFor="Femme">Femme: </label>
        <input type="radio" name="Femme" id="Femme" />
      </div>
    </>
  );
}
