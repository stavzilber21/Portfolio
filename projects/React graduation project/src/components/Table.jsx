import React from 'react';

export const Table = ({ titles, data, renderCell }) => {
  return (
    <div>
      <table border={1}>
        <thead>
          <tr>
            {titles.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((obj, index) => (
            <tr key={index}>
              {titles.map((title, i) => (
                <td key={i}>
                  {/* Check if renderCell is provided and call it to render cell content */}
                  {renderCell ? renderCell(obj, title) : obj[title]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
