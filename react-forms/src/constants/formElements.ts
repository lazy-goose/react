enum FormField {
  Name = 'name',
  Age = 'age',
  Email = 'email',
  Password = 'password',
  PasswordConfirm = 'passwordConfirm',
  Gender = 'gender',
  Terms = 'terms',
  Picture = 'picture',
  Country = 'country',
}

const FormElements = {
  [FormField.Name]: {
    field: FormField.Name,
    label: 'Name:',
    error: {
      firstUppercase: 'First letter of the name must be in uppercase',
      required: 'Please enter your name',
    },
  },
  [FormField.Age]: {
    field: FormField.Age,
    label: 'Age:',
    error: {
      positiveNumber: 'Age must be a positive number',
      required: 'Please enter your age',
    },
  },
  [FormField.Email]: {
    field: FormField.Email,
    label: 'Email:',
    error: {
      email:
        'Please enter your email address in the format: yourmail@domain.com',
      required: 'Please enter your email address',
    },
  },
  passwordGroup: {
    field: {
      [FormField.Password]: FormField.Password,
      [FormField.PasswordConfirm]: FormField.PasswordConfirm,
    },
    label: {
      [FormField.Password]: 'Password:',
      [FormField.PasswordConfirm]: 'Confirm password:',
    },
    error: {
      match: 'Please make sure your password match',
      required: 'Please enter your password',
      strength: {
        oneNumber: 'Password must have a number',
        oneUppercase: 'Password must have a uppercase letter',
        oneLowerCase: 'Password must have a lowercase letter',
        oneSpecial: 'Password must have a special character',
      },
    },
    strengthLevels: ['Very weak', 'Weak', 'Good', 'Strong'],
  },
  [FormField.Gender]: {
    field: FormField.Gender,
    label: {
      default: 'Gender:',
      male: 'Male',
      female: 'Female',
    },
    error: {
      required: 'Please select your gender',
    },
    values: {
      male: 'male',
      female: 'female',
    },
  },
  [FormField.Terms]: {
    field: FormField.Terms,
    label: {
      default: 'Terms and Conditions:',
      checkbox: 'Accept',
    },
    error: {
      required: 'Please agree with Terms and Conditions',
    },
  },
  [FormField.Picture]: {
    field: FormField.Picture,
    label: 'Picture:',
    error: {
      required: 'Please upload an image:',
      extension: (...e: string[]) =>
        `Unsupported image format: not a ${e.join(', ')} file`,
      size: (s: string) => `File is too big, can't exceed ${s}`,
    },
  },
  [FormField.Country]: {
    field: FormField.Country,
    label: 'Select country:',
    placeholder: 'Start typing your country',
    error: {
      required: 'Please select your country',
    },
  },
} as const;

export { FormField, FormElements };
