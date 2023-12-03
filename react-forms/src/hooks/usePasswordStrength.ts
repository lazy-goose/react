import { useEffect, useState } from 'react';
import FormSchema from '../validators/FormSchema';
import { FormElements as F } from '../constants/formElements';

function usePasswordStrength(passwordInitial = '') {
  const [password, setPassword] = useState(passwordInitial);
  const [strength, setStrength] = useState('');

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

    setStrength(
      strengthLevels[strengthLevels.length - intersection.length - 1]
    );
  };

  useEffect(() => {
    evaluateStrength(password);
  }, [password]);

  return { passwordStrength: strength, setPassword };
}

export default usePasswordStrength;
