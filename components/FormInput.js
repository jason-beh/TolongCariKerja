import { getNestedValueInObject } from "../utils/getNestedValueInObject";


export default function FormInput({
  formik,
  fieldName,
  displayName,
  required,
  children,
  type,
  saveFormData,
}) {
  const ErrorMessage = (field) => {
    let error = getNestedValueInObject(field, formik.errors);
    let touched = getNestedValueInObject(field, formik.touched);
    if (touched && error) {
      return (
        <p className="mt-2 text-sm text-red-500">
          {/* {capitalizeFirstLetter(error.replace(`${field} `, ""))} */}
          {error}
        </p>
      );
    }
    return null;
  };

  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
      <label
        htmlFor={fieldName}
        className={`block text-sm font-medium sm:mt-px sm:pt-2 ${
          getNestedValueInObject(fieldName, formik.errors) &&
          getNestedValueInObject(fieldName, formik.touched)
            ? "text-red-500"
            : "text-gray-700"
        }`}
      >
        {displayName}
        {typeof required !== "undefined" && required ? "*" : null}
        {typeof children !== "undefined" ? children : null}
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        {typeof type !== "undefined" && type === "textarea" ? (
          <textarea
            id={fieldName}
            name={fieldName}
            rows="4"
            onChange={(e) => {
              formik.handleChange(e);
              // saveFormData(fieldName, e.target.value);
            }}
            value={getNestedValueInObject(fieldName, formik.values)}
            className={`max-w-lg shadow-sm block w-full focus:ring-sky-500 focus:border-sky-500 sm:text-sm ${
              getNestedValueInObject(fieldName, formik.errors) &&
              getNestedValueInObject(fieldName, formik.touched)
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          ></textarea>
        ) : (
          <input
            type="text"
            name={fieldName}
            id={fieldName}
            onChange={(e) => {
              formik.handleChange(e);
              // saveFormData(fieldName, e.target.value);
            }}
            value={getNestedValueInObject(fieldName, formik.values)}
            className={`block max-w-lg w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm ${
              getNestedValueInObject(fieldName, formik.errors) &&
              getNestedValueInObject(fieldName, formik.touched)
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          />
        )}

        {ErrorMessage(fieldName)}
      </div>
    </div>
  );
}
