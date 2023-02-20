/* eslint-disable jsx-a11y/label-has-associated-control */
export default function InputFirstName() {
  return (
    <div>
      <label htmlFor="firstName">prénom: </label>
      <input type="text" name="firstName" id="firstName" required />
    </div>
  );
}
