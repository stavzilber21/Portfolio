import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const CustomTable = ({ titles, data, renderCell }) => {
  return (
    <TableContainer component={Paper}>
      <Table border={3} size="small" style={{ fontSize: '14px' }}>
        <TableHead>
          <TableRow >
            {titles.map((title, index) => (
              <TableCell id="titles" key={index}>{title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((obj, index) => (
            <TableRow key={index}>
              {titles.map((title, i) => (
                <TableCell key={i}>
                  {/* Check if renderCell is provided and call it to render cell content */}
                  {renderCell ? renderCell(obj, title) : obj[title]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
