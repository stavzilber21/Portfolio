import React from 'react'
import { Typography } from '@mui/material';
import '../UI/Style.css'; 

export const MyTypography = ({title}) => {
  return (
    <Typography id="typography" variant="h4" align="center">
    {title}
  </Typography>

  )
}
export default MyTypography
