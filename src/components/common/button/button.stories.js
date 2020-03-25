import React from 'react';
import Button from './button.jsx';
import { withInfo } from '@storybook/addon-info';

export default {
  title: 'Button',
  decorators: [withInfo()],
  component: Button,
  // parameters: {
  //   info: TableComponent,
  // },
};

// const Red = props => <span style={{ color: 'red' }} {...props} />;

// const TableComponent = ({ propDefinitions }) => {
//   const props = propDefinitions.map(
//     ({ property, propType, required, description, defaultValue }) => {
//       return (
//         <tr key={property}>
//           <td>
//             {property}
//             {required ? <Red>*</Red> : null}
//           </td>
//           <td>{propType.name}</td>
//           <td>{defaultValue}</td>
//           <td>{description}</td>
//         </tr>
//       );
//     }
//   );

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>name</th>
//           <th>type</th>
//           <th>default</th>
//           <th>description</th>
//         </tr>
//       </thead>
//       <tbody>{props}</tbody>
//     </table>
//   );
// };

export const defaultView = () => <Button/>;