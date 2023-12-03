import { type AnySchema, type ValidationError } from 'yup';

type ErrorsObject = {
  [f: string]: string[];
};

type ExtractedErrorsObject = {
  [f: string]: string;
};

function yupErrorToObject(errors: ValidationError) {
  return (
    errors?.inner?.reduce(
      (object, err) =>
        err.path ? { ...object, [err.path]: err.errors } : object,
      {} as ErrorsObject
    ) || {}
  );
}

function extractFirstError(errors: ErrorsObject) {
  return Object.fromEntries(
    Object.entries(errors).map(([k, v]) => [k, v[0] || ''])
  ) as ExtractedErrorsObject;
}

async function validateSchema(
  schema: AnySchema,
  data: Record<string, unknown> = {}
) {
  const transformed = Object.fromEntries(
    Object.entries(data)
      .map(([k, v]) => [k, typeof v === 'string' ? v.trimEnd() : v])
      .filter(([, v]) => v !== '')
  );
  const yupErrors = await schema
    .validate(transformed, { abortEarly: false })
    .catch((e) => e);
  return extractFirstError(yupErrorToObject(yupErrors));
}

export { yupErrorToObject, extractFirstError, validateSchema };
