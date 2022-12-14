import { nanoid } from 'nanoid';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApplicationActions } from '../../contexts/ApplicationStore/ApplicationStore';
import { POPUPS } from '../../contexts/UIStore/constants';
import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../hooks/useNotification';
import { usePopup } from '../../hooks/usePopup';
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

const extractValues = form =>
  Object.entries(form).reduce(
    (acc, [key, { value }]) => ({ ...acc, [key]: value }),
    {}
  );

const AddNewCargoPopup = props => {
  const { addNewItems } = useApplicationActions();
  const popup = usePopup();
  const notification = useNotification();
  const [isFirstInputFocused, setIsFirstInputFocused] = useState(false);

  const create = useCallback(
    async form => {
      try {
        const values = extractValues(form);
        const item = {
          ...values,
          id: nanoid(),
          weight: Number(values.weight),
          value: Number(values.value)
        };

        await sleep(2000); // Server imitation
        addNewItems([item]);

        notification.show({
          severity: 'accent',
          text: 'The item has been successfully created.'
        });
        popup.close();
        reset();
      } catch (error) {
        console.error(error);
        notification.show({ severity: 'alert', text: error.message });
      }
    },
    [addNewItems, notification, popup, reset]
  );

  const { reset, loading, error, form, invalid, filled, onSubmit, onChange } =
    useForm(emptyForm, {
      onSubmit: create
    });

  const isButtonDisabled = useMemo(
    () => [loading, invalid, error, !filled].some(Boolean),
    [error, filled, invalid, loading]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsFirstInputFocused(props.isOpen);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [props.isOpen]);

  return (
    <Popup
      {...props}
      isOpen={popup.current === POPUPS.addNewCargo}
      onClose={reset}
    >
      <section>
        <h2 className={styles.title}>Add new cargo</h2>
        <form className={styles.form} onSubmit={onSubmit}>
          <TextField
            required
            placeholder="Name"
            name="title"
            onChange={onChange}
            value={form.title.value}
            error={form.title.error}
            tabIndex={0}
            isFocused={isFirstInputFocused}
          />
          <TextField
            textarea
            required
            placeholder="Description"
            name="description"
            onChange={onChange}
            value={form.description.value}
            error={form.description.error}
            tabIndex={0}
          />
          <TextField
            required
            placeholder="Image URL"
            type="url"
            name="imageUrl"
            onChange={onChange}
            value={form.imageUrl.value}
            error={form.imageUrl.error}
            tabIndex={0}
          />
          <TextField
            required
            placeholder="Weight"
            type="number"
            name="weight"
            onChange={onChange}
            value={form.weight.value}
            error={form.weight.error}
            tabIndex={0}
          />
          <TextField
            required
            placeholder="Value"
            type="number"
            name="value"
            onChange={onChange}
            value={form.value.value}
            error={form.value.error}
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
