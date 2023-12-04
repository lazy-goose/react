import { Link } from 'react-router-dom';
import { FormElements } from '../constants/formElements';
import { useAppSelector } from '../hooks/useReduxHelpers';
import { RoutePath } from '../App';

const Tile = (props: {
  mark?: boolean;
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
  const { data, mark = false } = props;
  return (
    <ul className={['card', mark ? 'mark' : undefined].join(' ')}>
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
  const uncontrolledFormLastSubmitAt = useAppSelector(
    (state) => state.uncontrolledForm.lastSubmitAt
  );
  const reactHookFormSubmit = useAppSelector(
    (state) => state.reactHookForm.submit
  );
  const reactHookFormLastSubmitAt = useAppSelector(
    (state) => state.reactHookForm.lastSubmitAt
  );

  let isUncontrolledMark = false;
  let isReactFormMark = false;

  if (uncontrolledFormLastSubmitAt && reactHookFormLastSubmitAt) {
    isUncontrolledMark =
      uncontrolledFormLastSubmitAt < reactHookFormLastSubmitAt;
    isReactFormMark = !isUncontrolledMark;
  } else if (uncontrolledFormLastSubmitAt && !reactHookFormLastSubmitAt) {
    isUncontrolledMark = true;
    isReactFormMark = false;
  } else if (!uncontrolledFormLastSubmitAt && reactHookFormLastSubmitAt) {
    isUncontrolledMark = false;
    isReactFormMark = true;
  } else {
    isUncontrolledMark = false;
    isReactFormMark = false;
  }

  return (
    <main className="wrapper">
      <h1>Main</h1>
      <nav>
        <ul>
          <li>
            <Link to={RoutePath.ReactHookForm}>React hook form</Link>
          </li>
          <li>
            <Link to={RoutePath.UncontrolledForm}>Uncontrolled form</Link>
          </li>
        </ul>
      </nav>
      <br />
      {uncontrolledFormLastSubmitAt ? (
        <Tile mark={isUncontrolledMark} data={uncontrolledFormSubmit} />
      ) : (
        'No tile entry'
      )}
      <br />
      {reactHookFormLastSubmitAt ? (
        <Tile mark={isReactFormMark} data={reactHookFormSubmit} />
      ) : (
        'No tile entry'
      )}
    </main>
  );
}

export default Main;
