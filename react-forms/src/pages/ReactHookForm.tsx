import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormErrorGroup from '../components/FormErrorGroup';
import Input from '../components/Input';
import Autocomplete from '../components/Autocomplete';
import FormSchema, { FormSchemaType } from '../validators/FormSchema';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxHelpers';
import { FormElements as F } from '../constants/formElements';
import fileImageToBase64 from '../utils/fileImageToBase64';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePath } from '../App';
import usePasswordStrength from '../hooks/usePasswordStrength';
import { useEffect, useState } from 'react';
import base64ToImageFile from '../utils/base64ToImageFile';
import {
  setSubmitData,
  setPartialErrors,
  setPartialFormValues,
} from '../redux/slices/reactHookForm';

function ReactHookForm() {
  const countries = useAppSelector((state) => state.allCountries);
  const values = useAppSelector((state) => state.reactHookForm.values);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [picture, setPicture] = useState<File>();

  useEffect(() => {
    base64ToImageFile(values.picture, 'restored file').then((p) =>
      setPicture(p)
    );
  }, [values.picture]);

  const defaultValues = {
    ...values,
    [F.age.field]: values[F.age.field].length
      ? Number(values[F.age.field])
      : undefined,
    [F.picture.field]: picture,
  };

  const {
    register,
    handleSubmit: wrapHandleSubmit,
    formState: { isValid, errors: fieldErrors },
    setValue,
    setError,
    reset,
    watch,
    trigger,
  } = useForm<FormSchemaType>({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(FormSchema),
  });

  useEffect(() => {
    trigger();
  }, []);

  useEffect(() => {
    const subscription = watch(async (values) => {
      const base64Image =
        values[F.picture.field] instanceof File
          ? await fileImageToBase64(values[F.picture.field] as File)
          : '';
      dispatch(
        setPartialFormValues({
          ...values,
          [F.picture.field]: base64Image || undefined,
          [F.age.field]: String(values[F.age.field]),
        })
      );
      dispatch(setPartialErrors(errors));
    });
    return () => subscription.unsubscribe();
  }, [dispatch, watch]);

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
        [F.picture.field]: await fileImageToBase64(
          formData[F.picture.field] as File
        ),
        [F.age.field]: String(formData.age),
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
        className="form"
        onSubmit={wrapHandleSubmit(handleSubmit)}
        noValidate
      >
        <Input type="submit" disabled={!isValid} />

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
            autoComplete="new-password"
            {...register(F.passwordGroup.field.password)}
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
          <div className="flex">
            <Input
              type="radio"
              value={F.gender.values.male}
              label={F.gender.label.male}
              {...register(F.gender.field)}
            />
            <Input
              type="radio"
              value={F.gender.values.female}
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
              trigger();
            }}
            inputProps={register(F.country.field)}
          />
        </FormErrorGroup>
      </form>
    </main>
  );
}

export default ReactHookForm;
