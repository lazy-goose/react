import { FormElements as F } from '../../constants/formElements';

type ListFields = {
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

const initialListFields = {
  [F.name.field]: '',
  [F.age.field]: '',
  [F.email.field]: '',
  [F.passwordGroup.field.password]: '',
  [F.passwordGroup.field.passwordConfirm]: '',
  [F.gender.field]: '',
  [F.terms.field]: '',
  [F.picture.field]: '',
  [F.country.field]: '',
};

export { type ListFields, initialListFields };
