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

const InputConstants = {
  name: {
    field: FormField.Name,
    label: 'Name:',
    error: {
      firstUppercase: 'First letter of the name must be in uppercase',
      required: 'Please enter your name',
    },
  },
  age: {
    field: FormField.Age,
    label: 'Age:',
    error: {
      positiveNumber: 'Age must be a positive number',
      required: 'Please enter your age',
    },
  },
  email: {
    field: FormField.Email,
    label: 'Email:',
    error: {
      email:
        'Please enter your email address in the format: yourmail@domain.com',
      required: 'Please enter your email address',
    },
  },
  passwords: {
    field: {
      new: FormField.Password,
      retype: FormField.PasswordConfirm,
    },
    label: {
      new: 'Password:',
      retype: 'Confirm password:',
    },
    error: {
      match: 'Please make sure your password match',
      required: 'Please enter your password',
    },
    strength: ['Very weak', 'Weak', 'Good', 'Strong'],
  },
  gender: {
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
  terms: {
    field: FormField.Terms,
    label: {
      default: 'Terms and Conditions',
      checkbox: 'Accept',
    },
    error: {
      required: 'Please agree with Terms and Conditions',
    },
  },
  picture: {
    field: FormField.Picture,
    label: 'Picture',
    error: {
      required: 'Please upload an image',
      extension: `Unsupported image format: not a '.png' or '.jpeg' file`,
    },
  },
  country: {
    field: FormField.Country,
    label: 'Select country',
    error: {
      required: 'Please select your country',
    },
  },
} as const;

export { FormField, InputConstants };
