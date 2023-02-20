/* eslint-disable jsx-a11y/label-has-associated-control */
export default function Birthday() {
  return (
    <div>
      <label>date de naissance :
        <input type="date" name="bday" required pattern="\d{4}-\d{2}-\d{2}" />
        <span className="validity" />
      </label>
    </div>
  );
}
