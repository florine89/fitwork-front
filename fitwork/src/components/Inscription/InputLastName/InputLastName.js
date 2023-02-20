/* eslint-disable jsx-a11y/label-has-associated-control */
export default function InputLastName() {
  return (
    <div>
      <label htmlFor="lastName">nom: </label>
      <input type="text" name="lastName" id="lastName" required />
    </div>
  );
}
