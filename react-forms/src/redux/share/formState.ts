import { FormElements as F } from '../../constants/formElements';

type FormState = {
  submit: {
    [F.name.field]: string;
    [F.age.field]: string;
    [F.email.field]: string;
    [F.passwordGroup.field.password]: string;
    [F.passwordGroup.field.passwordConfirm]: string;
    [F.gender.field]: string;
    [F.terms.field]: string;
    [F.picture.field]: string;
    [F.country.field]: string;
  };
  errors: {
    [F.name.field]: string;
    [F.age.field]: string;
    [F.email.field]: string;
    [F.passwordGroup.field.password]: string;
    [F.passwordGroup.field.passwordConfirm]: string;
    [F.gender.field]: string;
    [F.terms.field]: string;
    [F.picture.field]: string;
    [F.country.field]: string;
  };
};

const initialState: FormState = {
  submit: {
    [F.name.field]: '',
    [F.age.field]: '',
    [F.email.field]: '',
    [F.passwordGroup.field.password]: '',
    [F.passwordGroup.field.passwordConfirm]: '',
    [F.gender.field]: '',
    [F.terms.field]: '',
    [F.picture.field]: '',
    [F.country.field]: '',
  },
  errors: {
    [F.name.field]: '',
    [F.age.field]: '',
    [F.email.field]: '',
    [F.passwordGroup.field.password]: '',
    [F.passwordGroup.field.passwordConfirm]: '',
    [F.gender.field]: '',
    [F.terms.field]: '',
    [F.picture.field]: '',
    [F.country.field]: '',
  },
};

export { type FormState };
export default initialState;
