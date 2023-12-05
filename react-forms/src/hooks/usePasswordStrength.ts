import { useEffect, useState } from 'react';
import FormSchema from '../validators/FormSchema';
import { FormElements as F } from '../constants/formElements';

const evaluateStrength = async (password: string) => {
  const passwordErrors = (await FormSchema.validateAt(
    'password',
    { password },
    { abortEarly: false }
  ).catch((e) => e.errors)) as string[];

  const strengthErrors = Object.values(
    F.passwordGroup.error.strength
  ) as string[];

  const strengthLevels = F.passwordGroup.strengthLevels;

  const intersection = [passwordErrors]
    .flat()
    .filter((v) => strengthErrors.includes(v));

  return strengthLevels[strengthLevels.length - intersection.length - 1];
};

function usePasswordStrength(password: string) {
  const [strength, setStrength] = useState('');

  useEffect(() => {
    evaluateStrength(password).then(setStrength);
  }, [password]);

  return strength;
}

export default usePasswordStrength;
