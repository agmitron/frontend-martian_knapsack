import { useCallback, useMemo, useState } from 'react';

const hasErrors = formEntries =>
  Object.values(formEntries).some(({ error }) => Boolean(error));

const hasEmptyValues = formEntries =>
  Object.values(formEntries).some(({ value }) => value === '');

function useForm(entries, handlers) {
  const [form, setForm] = useState(window.structuredClone(entries));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const invalid = useMemo(() => hasErrors(form), [form]);
  const filled = useMemo(() => !hasEmptyValues(form), [form]);

  const reset = useCallback(
    () => setForm(window.structuredClone(entries)),
    [entries]
  );

  const onSubmit = useCallback(
    async e => {
      e.preventDefault();

      try {
        setLoading(true);

        if (handlers.onSubmit) {
          await handlers.onSubmit(form);
        }
      } catch (error) {
        setError(error.message);

        if (handlers.onError) {
          handlers.onError(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [form, handlers]
  );

  const onChange = useCallback(
    async ({ name, value, error }) =>
      setForm(prev => ({ ...prev, [name]: { value, error } })),
    []
  );

  return {
    filled,
    invalid,
    loading,
    error,
    form,
    onChange,
    onSubmit,
    reset
  };
}

export { useForm, hasErrors };
