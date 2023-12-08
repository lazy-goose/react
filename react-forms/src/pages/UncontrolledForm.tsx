import { FormEventHandler, useState } from 'react';
import FormErrorGroup from '../components/FormErrorGroup';
import Input from '../components/Input';
import Autocomplete from '../components/Autocomplete';
import FormSchema from '../validators/FormSchema';
import { validateSchema } from '../utils/yupUtils';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHelpers';
import {
  UncontrolledFormState,
  setPartialErrors,
  setSubmitData,
} from '../redux/slices/uncontrolledForm';
import { FormElements as F } from '../constants/formElements';
import fileImageToBase64 from '../utils/fileImageToBase64';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePath } from '../App';
import usePasswordStrength from '../hooks/usePasswordStrength';

type FormDataFields = UncontrolledFormState['submit'] & { picture: File };

function UncontrolledForm() {
  const countries = useAppSelector((state) => state.allCountries);
  const errors = useAppSelector((state) => state.uncontrolledForm.errors);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState('')
  const passwordStrength = usePasswordStrength(password);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    ) as FormDataFields;
    const yupErrors = await validateSchema(FormSchema, formData);
    if (Object.keys(yupErrors).length) {
      setPassword(formData.password);
      dispatch(setPartialErrors(yupErrors));
    } else {
      const picture = await fileImageToBase64(formData[F.picture.field]);
      dispatch(setSubmitData({ ...formData, [F.picture.field]: picture }));
      dispatch(setPartialErrors({}));
      setPassword('');
      navigate(RoutePath.Main);
    }
  };

  return (
    <main className="wrapper">
      <h1>Uncontrolled Form</h1>
      <nav>
        <ul>
          <li>
            <Link to={RoutePath.Main}>Main</Link>
          </li>
          <li>
            <Link to={RoutePath.ReactHookForm}>React hook form</Link>
          </li>
        </ul>
      </nav>
      <br />
      <form className="form" onSubmit={handleSubmit} noValidate>
        <Input type="submit" />

        <FormErrorGroup legend={F.name.label} error={errors[F.name.field]}>
          <Input type="text" name={F.name.field} />
        </FormErrorGroup>

        <FormErrorGroup legend={F.age.label} error={errors[F.age.field]}>
          <Input type="number" name={F.age.field} />
        </FormErrorGroup>

        <FormErrorGroup legend={F.email.label} error={errors[F.email.field]}>
          <Input type="email" name={F.email.field} />
        </FormErrorGroup>

        <FormErrorGroup
          legend={F.passwordGroup.label.password}
          error={errors[F.passwordGroup.field.password]}
        >
          <Input
            type="password"
            autoComplete="new-password"
            name={F.passwordGroup.field.password}
          />
          Strength: {passwordStrength || '-'}
        </FormErrorGroup>

        <FormErrorGroup
          legend={F.passwordGroup.label.passwordConfirm}
          error={errors[F.passwordGroup.field.passwordConfirm]}
        >
          <Input type="password" name={F.passwordGroup.field.passwordConfirm} />
        </FormErrorGroup>

        <FormErrorGroup
          legend={F.gender.label.default}
          error={errors[F.gender.field]}
        >
          <div className="flex">
            <Input
              type="radio"
              value={F.gender.values.male}
              name={F.gender.field}
              label={F.gender.label.male}
            />
            <Input
              type="radio"
              value={F.gender.values.female}
              name={F.gender.field}
              label={F.gender.label.female}
            />
          </div>
        </FormErrorGroup>

        <FormErrorGroup
          legend={F.terms.label.default}
          error={errors[F.terms.field]}
        >
          <Input
            type="checkbox"
            defaultValue="true"
            name={F.terms.field}
            label={F.terms.label.checkbox}
          />
        </FormErrorGroup>

        <FormErrorGroup
          legend={F.picture.label}
          error={errors[F.picture.field]}
        >
          <Input type="file" name={F.picture.field} />
        </FormErrorGroup>

        <FormErrorGroup
          legend={F.country.label}
          error={errors[F.country.field]}
        >
          <Autocomplete
            options={countries.map((c) => c.name)}
            inputProps={{ name: F.country.field }}
          />
        </FormErrorGroup>
      </form>
    </main>
  );
}

export default UncontrolledForm;
