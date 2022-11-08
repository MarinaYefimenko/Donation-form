import { Formik, Field, Form, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.name}>{label}</label>
        <input {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
};

const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
      <>
        <label className="checkbox">
            <input type="checkbox" {...field} {...props} />
            {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

const CustomForm = () => {

    return (
        <Formik
        initialValues = {{
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false
        }}
        validationSchema = {Yup.object({
            name: Yup.string()
                    .min(3, 'Not less than 3 symbols')
                    .required('Required'),
            email: Yup.string()
                    .email('Invalid email adress')
                    .required('Required'),
            amount: Yup.number()
                    .required('Required')
                    .min(5, 'Not less than 5'),
            currency: Yup.string().required('Select currency'),
            text: Yup.string()
                    .min(10, 'Not less than 10 symbols'),
            terms: Yup.boolean()
                    .required('Required')
                    .oneOf([true], 'Required')
        })}
        onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form">
                <h2>Send a donation</h2>
                <MyTextInput
                    label="Your name"
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                />
                <MyTextInput
                    label="Your email"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                />
                <label htmlFor="amount">Amount</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                    autoComplete="off"
                />
                <ErrorMessage component="div" className="error" name="amount"/>
                <label htmlFor="currency">Currency</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select"
                    >
                        <option value="">Select currency</option>
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                </Field>
                <ErrorMessage component="div" className="error" name="currency"/>
                <label htmlFor="text">Your message</label>
                <Field 
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage component="div" className="error" name="text"/>
                <MyCheckbox name="terms">
                Agree with privacy policy
                </MyCheckbox>
                <button type="submit">Send</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;