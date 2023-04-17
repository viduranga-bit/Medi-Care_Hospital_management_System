  import React, { useState,useEffect,useContext } from "react";
  import { Button } from '@material-ui/core'
  import * as Yup from 'yup'
  import Box from "@mui/material/Box";
  import TextField from "@mui/material/TextField";
  import axios from "axios";
  import FormControl from '@mui/material/FormControl';
  import InputLabel from "@mui/material/InputLabel";
  import Select from "@mui/material/Select";
  import MenuItem from "@mui/material/MenuItem";

const AddNewMedicine = (props) => {
    const paperStyle = { padding: '0 15px 40px 15px', width: 250, }
    const btnStyle = { 
      marginTop: 10,
      left: "43%",
  
    }
    const phoneRegExp=/^[2-9]{2}[0-9]{8}/
    const passwordRegExp=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    const initialValues = {
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword:''
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "It's too short").required("Required"),
        email: Yup.string().email("Enter valid email").required("Required"),
        // phoneNumber: Yup.number().typeError("Enter valid Phone number").required("Required"),
        phoneNumber:Yup.string().matches(phoneRegExp,"Enter valid Phone number").required("Required"),
        password: Yup.string().min(8, "Minimum characters should be 8")
        .matches(passwordRegExp,"Password must have one upper, lower case, number, special symbol").required('Required'),
        confirmPassword:Yup.string().oneOf([Yup.ref('password')],"Password not matches").required('Required')
    })
    


    

    const [medicine, setMedicine] = useState({
      medicineName: "",
      date_added: "",
      manufacturingCompany: "",
      price: "",
      sellingPrice: "",
      currentQuantity: "",
      description: "",
      status: "ACTIVE",
      itemCode:""
    });
    const {
      medicineName,
      date_added,
      manufacturingCompany,
      price,
      sellingPrice,
      currentQuantity,
      description,
      status,
      itemCode,
    } = medicine;
    const onInputChange = (e) => {
      setMedicine({ ...medicine, [e.target.name]: e.target.value });
    };
    
    const onSubmit = async (e) => {
     e.preventDefault()
     props.addNew(medicine)
    
    };

    return (
      <Box
        sx={{
          alignItems: "center",
          "& .MuiTextField-root": { mt: 3 },
        }}
      >
        <form onSubmit={(e) => onSubmit(e)}>
          <div>
            <TextField
              required
              sx={{ m: 1, width: "31ch" }}
              id="outlined-disabled"
              label="Drug Name"
              name="medicineName"
              value={medicineName}
              onChange={(e) => onInputChange(e)}
              defaultValue=""
            />
            <TextField
              required
              label="Date Of Add Medicine"
              sx={{ m: 1, width: "25ch" }}
              type="date"
              id="filled-multiline-flexible"
              name="date_added"
              variant="outlined"
              value={date_added}
              onChange={(e) => onInputChange(e)}
              focused
            />

            <TextField
              sx={{ m: 1, width: "17.5 ch" }}
              id="filled-multiline-flexible"
              label="Price"
              multiline
              maxRows={6}
              variant="outlined"
              name="price"
              value={price}
              onChange={(e) => onInputChange(e)}
              defaultValue=""
            />

            <TextField
              sx={{ m: 1, width: "17ch" }}
              id="filled-multiline-flexible"
              label="Selling Price"
              multiline
              maxRows={6}
              variant="outlined"
              name="sellingPrice"
              value={sellingPrice}
              onChange={(e) => onInputChange(e)}
              defaultValue=""
            />

            <TextField
              sx={{ m: 1, width: "15ch" }}
              id="filled-multiline-flexible"
              label="Quantity"
              multiline
              maxRows={6}
              variant="outlined"
              name="currentQuantity"
              value={currentQuantity}
              onChange={(e) => onInputChange(e)}
              defaultValue=""
            />

            <TextField
              sx={{ ml: 1, width: "31ch" }}
              id="filled-multiline-flexible"
              label="Supplier"
              multiline
              maxRows={6}
              variant="outlined"
              name="manufacturingCompany"
              value={manufacturingCompany}
              onChange={(e) => onInputChange(e)}
              defaultValue=""
            />

            <TextField
              sx={{ ml: 1, width: "25ch" }}
              id="filled-multiline-flexible"
              label="Medicine Code"
              multiline
              maxRows={6}
              variant="outlined"
              name="itemCode"
              value={itemCode}
              onChange={(e) => onInputChange(e)}
              defaultValue=""
            />

            <TextField
              sx={{ ml: 1, width: "57.5ch" }}
              id="filled-multiline-flexible"
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              name="description"
              value={description}
              onChange={(e) => onInputChange(e)}
              defaultValue=""
            />

            <div></div>
          </div>

          <Button
            type="submit"
            style={btnStyle}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
      </Box>

      // <Grid>
      //     <Paper elevation={0} style={paperStyle}>
      //         <Grid align='center'>
      //             <Typography variant='caption'>Add New Medicine </Typography>
      //         </Grid>
      //         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      //             {(props) => (
      //                 <Form noValidate>
      //                     {/* <TextField label='Name' name="name" fullWidth value={props.values.name}
      //             onChange={props.handleChange} /> */}

      //                     <Field as={TextField} name='name' label='Name' fullWidth
      //                         error={props.errors.name && props.touched.name}
      //                         helperText={<ErrorMessage name='name' />} required />

      //                     {/* <TextField label='Email' name='email' type='Email' fullWidth
      //             {...props.getFieldProps('email')}/> */}

      //                     <Field sx={{ m: 1, width: "80ch" }} as={TextField} name='email' label='Email' fullWidth
      //                         error={props.errors.email && props.touched.email}
      //                         helperText={<ErrorMessage name='email' />} required />

      //                     <Field as={TextField} name="phoneNumber" label='Phone Number' fullWidth
      //                         error={props.errors.phoneNumber && props.touched.phoneNumber}
      //                         helperText={<ErrorMessage name='phoneNumber' />} required />

      //                     <Field as={TextField} name='password' label='Password' type='password' fullWidth
      //                         error={props.errors.password && props.touched.password}
      //                         helperText={<ErrorMessage name='password' />} required />

      //                     <Field as={TextField} name='confirmPassword' label='Confirm Password' type='password' fullWidth
      //                         error={props.errors.confirmPassword && props.touched.confirmPassword}
      //                         helperText={<ErrorMessage name='confirmPassword' />} required />

      //                     <Button type='submit' style={btnStyle} variant='contained'
      //                         color='primary'>Register</Button>
      //                 </Form>
      //             )}
      //         </Formik>
      //     </Paper>
      // </Grid>
    );
}

export default AddNewMedicine;