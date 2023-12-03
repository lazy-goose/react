import { FormEventHandler } from 'react';
import { FormElements as F } from '../constants/formElements';
import FormErrorGroup from '../components/FormErrorGroup';
import Input from '../components/Input';
import Autocomplete from '../components/Autocomplete';
import countries from '../constants/countries';

function UncontrolledForm() {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <main className="wrapper">
      <h1>Uncontrolled Form</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <FormErrorGroup legend={F.name.label}>
          <Input type="text" name={F.name.field} label="" />
        </FormErrorGroup>

        <FormErrorGroup legend={F.age.label}>
          <Input type="number" name={F.age.field} />
        </FormErrorGroup>

        <FormErrorGroup legend={F.email.label}>
          <Input type="email" name={F.email.field} />
        </FormErrorGroup>

        <FormErrorGroup legend={F.passwords.label.new}>
          <Input type="password" name={F.passwords.field.new} />
        </FormErrorGroup>

        <FormErrorGroup legend={F.passwords.label.retype}>
          <Input type="password" name={F.passwords.field.retype} />
        </FormErrorGroup>

        <FormErrorGroup
          style={{ display: 'flex' }}
          legend={F.gender.label.default}
        >
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
        </FormErrorGroup>

        <FormErrorGroup legend={F.terms.label.default}>
          <Input
            type="checkbox"
            name={F.terms.field}
            label={F.terms.label.checkbox}
          />
        </FormErrorGroup>

        <FormErrorGroup legend={F.picture.label}>
          <Input type="file" name={F.picture.field} />
        </FormErrorGroup>

        <FormErrorGroup style={{ minHeight: 200 }} legend={F.country.label}>
          <Autocomplete options={countries.map((c) => c.name)} />
        </FormErrorGroup>
      </form>
    </main>
  );
}

export default UncontrolledForm;
