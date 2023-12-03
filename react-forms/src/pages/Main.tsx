import { FormElements } from '../constants/formElements';
import { useAppSelector } from '../hooks/useReduxHelpers';

const Tile = (props: {
  data: {
    name: string;
    age: string;
    email: string;
    password: string;
    gender: string;
    picture: string;
    country: string;
  };
}) => {
  const { data } = props;
  return (
    <ul className="card">
      <li>
        <span>{FormElements.name.label}</span>
        <span>{data.name}</span>
      </li>
      <li>
        <span>{FormElements.age.label}</span>
        <span>{data.age}</span>
      </li>
      <li>
        <span>{FormElements.email.label}</span>
        <span>{data.email}</span>
      </li>
      <li>
        <span>{FormElements.passwordGroup.label.password}</span>
        <span>{data.password}</span>
      </li>
      <li>
        <span>{FormElements.gender.label.default}</span>
        <span>{data.gender}</span>
      </li>
      <li>
        <span>{FormElements.picture.label}</span>
        <span>
          <img src={data.picture} alt="uploaded user picture" />
        </span>
      </li>
      <li>
        <span>{FormElements.country.label}</span>
        <span>{data.country}</span>
      </li>
    </ul>
  );
};

function Main() {
  const uncontrolledFormSubmit = useAppSelector(
    (state) => state.uncontrolledForm.submit
  );

  return (
    <main className="wrapper">
      <h1>Main</h1>
      <br />
      <Tile data={uncontrolledFormSubmit} />
    </main>
  );
}

export default Main;
