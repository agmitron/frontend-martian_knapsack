import { nanoid } from 'nanoid';
import { useMemo, useState } from 'react';
import { useApplicationActions } from '../../contexts/ApplicationStore/ApplicationStore';
import { sleep } from '../../utils';
import { Button } from '../Button/Button';
import { Popup, propTypes } from '../Popup/Popup';
import { TextField } from '../TextField/TextField';
import styles from './AddNewCargoPopup.module.css';

const emptyFormEntry = { value: '', error: '' };

const emptyForm = {
  title: emptyFormEntry,
  description: emptyFormEntry,
  imageUrl: emptyFormEntry,
  weight: emptyFormEntry,
  value: emptyFormEntry
};

const hasErrors = formEntries =>
  Object.values(formEntries).some(({ error }) => Boolean(error));

const hasEmptyValues = formEntries =>
  Object.values(formEntries).some(({ value }) => value === '');

const extractValues = formEntries =>
  Object.entries(formEntries).reduce(
    (acc, [key, { value }]) => ({ ...acc, [key]: value }),
    {}
  );

const AddNewCargoPopup = props => {
  const { addNewItems } = useApplicationActions();
  const [formEntries, setFormEntries] = useState(
    window.structuredClone(emptyForm)
  );

  const [isLoading, setIsLoading] = useState(false);

  const isButtonDisabled = useMemo(
    () => hasErrors(formEntries) || hasEmptyValues(formEntries) || isLoading,
    [formEntries, isLoading]
  );

  const makeChangeHandler = field => state =>
    setFormEntries(prev => ({ ...prev, [field]: state }));

  const clearForm = () => setFormEntries(window.structuredClone(emptyForm));

  const onClose = () => {
    clearForm();
    props.onClose();
  };

  // TODO: probably use context or hook for the forms ??
  const save = async e => {
    try {
      e.preventDefault();
      const values = extractValues(formEntries);
      const item = {
        ...values,
        id: nanoid(),
        weight: Number(values.weight),
        value: Number(values.value)
      };

      setIsLoading(true);
      await sleep(2000);

      addNewItems([item]);
      onClose();
    } catch (e) {
      console.error('Something went wrong');
      // TODO: show in UI
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popup {...props} onClose={onClose}>
      <section>
        <h2 className={styles.title}>Add new cargo</h2>
        <form className={styles.form} onSubmit={save}>
          <TextField
            required
            placeholder="Name"
            name="title"
            onChange={makeChangeHandler('title')}
            value={formEntries.title.value}
            error={formEntries.title.error}
            tabIndex={0}
          />
          <TextField
            textarea
            required
            placeholder="Description"
            name="description"
            onChange={makeChangeHandler('description')}
            value={formEntries.description.value}
            error={formEntries.description.error}
            tabIndex={0}
          />
          <TextField
            required
            placeholder="Image URL"
            type="url"
            name="imageUrl"
            onChange={makeChangeHandler('imageUrl')}
            value={formEntries.imageUrl.value}
            error={formEntries.imageUrl.error}
            tabIndex={0}
          />
          <TextField
            required
            placeholder="Weight"
            type="number"
            name="weight"
            onChange={makeChangeHandler('weight')}
            value={formEntries.weight.value}
            error={formEntries.weight.error}
            tabIndex={0}
          />
          <TextField
            required
            placeholder="Value"
            type="number"
            name="value"
            onChange={makeChangeHandler('value')}
            value={formEntries.value.value}
            error={formEntries.value.error}
            tabIndex={0}
          />
          <Button
            isDisabled={isButtonDisabled}
            type="submit"
            variant="outlined"
            theme="accent"
            size="md"
            tabIndex={0}
          >
            Save
          </Button>
        </form>
      </section>
    </Popup>
  );
};

AddNewCargoPopup.propTypes = propTypes;

export { AddNewCargoPopup };
