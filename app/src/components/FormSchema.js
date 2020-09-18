import * as yup from 'yup'

const formSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .min(8, 'Your password must be at least 8 characters')
        .required(),
})

export default formSchema