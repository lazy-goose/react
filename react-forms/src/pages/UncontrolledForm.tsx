import { FormEventHandler } from 'react';
import FormErrorGroup from '../components/FormErrorGroup';
import Input from '../components/Input';
import Autocomplete from '../components/Autocomplete';
import countries from '../constants/countries';
import FormSchema from '../validators/FormSchema';
import { validateSchema } from '../utils/yupUtils';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHelpers';
import { setErrors } from '../redux/slices/uncontrolledForm';
import { FormElements as F } from '../constants/formElements';

function UncontrolledForm() {
  const errors = useAppSelector((state) => state.uncontrolledForm.errors);
  const dispatch = useAppDispatch();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );
    const yupErrors = await validateSchema(FormSchema, formData);
    dispatch(setErrors({ ...errors, ...yupErrors }));
  };

  return (
    <main className="wrapper">
      <h1>Uncontrolled Form</h1>
      <br />
      <form
        style={{ border: '1px solid lightGray', padding: '10px' }}
        onSubmit={handleSubmit}
        noValidate
      >
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
          <Input type="password" name={F.passwordGroup.field.password} />
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
          <div style={{ display: 'flex' }}>
            <Input
              type="radio"
              name={F.gender.field}
              label={F.gender.label.male}
            />
            <Input
              type="radio"
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
            defaultValue="false"
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
          style={{ minHeight: 200 }}
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
