import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormErrorGroup from '../components/FormErrorGroup';
import Input from '../components/Input';
import Autocomplete from '../components/Autocomplete';
import countries from '../constants/countries';
import FormSchema, { FormSchemaType } from '../validators/FormSchema';
import { useAppDispatch } from '../hooks/useReduxHelpers';
import { setSubmitData } from '../redux/slices/uncontrolledForm';
import { FormElements as F } from '../constants/formElements';
import imageToBase64 from '../utils/imageToBase64';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePath } from '../App';
import usePasswordStrength from '../hooks/usePasswordStrength';
import { useEffect } from 'react';

function ReactHookForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit: wrapHandleSubmit,
    formState: { errors: fieldErrors },
    setValue,
    setError,
    reset,
  } = useForm<FormSchemaType>({
    mode: 'onChange',
    resolver: yupResolver(FormSchema),
  });

  const { passwordStrength, setPassword } = usePasswordStrength();
  useEffect(() => {
    setPassword(fieldErrors.password?.ref?.value);
  }, [fieldErrors.password?.ref?.value]);

  const errors = Object.fromEntries(
    Object.entries(fieldErrors).map(([k, v]) => [k, v?.message])
  );

  const handleSubmit: SubmitHandler<FormSchemaType> = async (formData) => {
    dispatch(
      setSubmitData({
        ...formData,
        picture: await imageToBase64(formData[F.picture.field] as File),
        age: String(formData.age),
      })
    );
    reset();
    navigate(RoutePath.Main);
  };

  return (
    <main className="wrapper">
      <h1>React Hook Form</h1>
      <nav>
        <ul>
          <li>
            <Link to={RoutePath.Main}>Main</Link>
          </li>
          <li>
            <Link to={RoutePath.UncontrolledForm}>Uncontrolled form</Link>
          </li>
        </ul>
      </nav>
      <br />
      <form
        style={{ border: '1px solid lightGray', padding: '10px' }}
        onSubmit={wrapHandleSubmit(handleSubmit)}
        noValidate
      >
        <Input type="submit" />

        <FormErrorGroup legend={F.name.label} error={errors[F.name.field]}>
          <Input type="text" {...register(F.name.field)} />
        </FormErrorGroup>

        <FormErrorGroup legend={F.age.label} error={errors[F.age.field]}>
          <Input type="number" {...register(F.age.field)} />
        </FormErrorGroup>

        <FormErrorGroup legend={F.email.label} error={errors[F.email.field]}>
          <Input type="email" {...register(F.email.field)} />
        </FormErrorGroup>

        <FormErrorGroup
          legend={F.passwordGroup.label.password}
          error={errors[F.passwordGroup.field.password]}
        >
          <Input
            type="password"
            {...register(F.passwordGroup.field.password)}
            onChange={(e) => setPassword(e.target.value || '')}
          />
          Strength: {passwordStrength || '-'}
        </FormErrorGroup>

        <FormErrorGroup
          legend={F.passwordGroup.label.passwordConfirm}
          error={errors[F.passwordGroup.field.passwordConfirm]}
        >
          <Input
            type="password"
            {...register(F.passwordGroup.field.passwordConfirm)}
          />
        </FormErrorGroup>

        <FormErrorGroup
          legend={F.gender.label.default}
          error={errors[F.gender.field]}
        >
          <div style={{ display: 'flex' }}>
            <Input
              type="radio"
              label={F.gender.label.male}
              {...register(F.gender.field)}
            />
            <Input
              type="radio"
              label={F.gender.label.female}
              {...register(F.gender.field)}
            />
          </div>
        </FormErrorGroup>

        <FormErrorGroup
          legend={F.terms.label.default}
          error={errors[F.terms.field]}
        >
          <Input
            type="checkbox"
            label={F.terms.label.checkbox}
            {...register(F.terms.field)}
          />
        </FormErrorGroup>

        <FormErrorGroup
          legend={F.picture.label}
          error={errors[F.picture.field]}
        >
          <Input type="file" {...register(F.picture.field)} />
        </FormErrorGroup>

        <FormErrorGroup
          style={{ minHeight: 200 }}
          legend={F.country.label}
          error={errors[F.country.field]}
        >
          <Autocomplete
            options={countries.map((c) => c.name)}
            onChange={(v) => {
              setValue(F.country.field, v);
              setError(F.country.field, {
                message: '',
              });
            }}
            inputProps={register(F.country.field)}
          />
        </FormErrorGroup>
      </form>
    </main>
  );
}

export default ReactHookForm;
