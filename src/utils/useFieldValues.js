import { ref } from "vue";

function useFieldValues(initialFieldValues, props) {
  const fieldValues = ref(initialFieldValues || {});

  const handleChangeField =
    ((
      event,
      customEvent,
      customName,
      boolean = true,
      previous,
      boolean2 = false
    ) => {
      if (customEvent) {
        fieldValues.value = (previousFieldValues) => ({
          ...previousFieldValues,
          [event?.target?.name]: event?.target?.value,
          [`_${event?.target?.name}`]: customEvent,
          ...handleFieldValues(
            boolean,
            boolean2,
            previousFieldValues,
            previous
          ),
        });
      } else {
        fieldValues.value = (previousFieldValues) => ({
          ...previousFieldValues,
          [event?.target?.name]: event?.target?.value,
          ...handleFieldValues(
            boolean,
            boolean2,
            previousFieldValues,
            previous
          ),
        });
      }
    },
    []);

  const handleFieldValues = (
    boolean,
    boolean2,
    previousFieldValues,
    previous
  ) => {
    return {
      _boolean: boolean,
      _boolean2: boolean2,
      _previous: {
        ...(previousFieldValues &&
          Object.fromEntries(
            Object.entries(previous || previousFieldValues).filter(
              ([code]) => code !== "_previous"
            )
          )),
      },
    };
  };

  const initFieldValues = () => {
    const initFields = Object.keys(fieldValues).map((key) => {
      return [key, null];
    });
    fieldValues.value = Object.fromEntries(initFields);
  };

  return [fieldValues, handleChangeField, initFieldValues];
}

export default useFieldValues;
