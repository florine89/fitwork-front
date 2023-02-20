/* eslint-disable jsx-a11y/label-has-associated-control */
export default function InputEmail() {
  return (
    <div>
      <label htmlFor="Email">Email: </label>
      <input type="email" name="Email" id="Email" required />
    </div>
  );
}
