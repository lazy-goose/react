import { FormEventHandler, useState } from 'react';
import { FormElements as F } from '../constants/formElements';
import FormErrorGroup from '../components/FormErrorGroup';
import Input from '../components/Input';
import Autocomplete from '../components/Autocomplete';
import countries from '../constants/countries';
import FormSchema from '../validators/FormSchema';
import { validateSchema } from '../utils/yupUtils';

const errorsReset = {
  [F.name.field]: '',
  [F.age.field]: '',
  [F.email.field]: '',
  [F.passwords.field.new]: '',
  [F.passwords.field.retype]: '',
  [F.gender.field]: '',
  [F.terms.field]: '',
  [F.picture.field]: '',
  [F.country.field]: '',
};

function UncontrolledForm() {
  const [errors, setErrors] = useState(errorsReset);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );
    const errors = await validateSchema(FormSchema, formData);
    setErrors({ ...errorsReset, ...errors });
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
          legend={F.passwords.label.new}
          error={errors[F.passwords.field.new]}
        >
          <Input type="password" name={F.passwords.field.new} />
        </FormErrorGroup>

        <FormErrorGroup
          legend={F.passwords.label.retype}
          error={errors[F.passwords.field.retype]}
        >
          <Input type="password" name={F.passwords.field.retype} />
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
          <Autocomplete options={countries.map((c) => c.name)} />
        </FormErrorGroup>
      </form>
    </main>
  );
}

export default UncontrolledForm;
