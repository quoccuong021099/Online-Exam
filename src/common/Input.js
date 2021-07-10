import React from "react";

// export default function Input(props) {
//   return (
//     <>
//       <input {...props} />
//     </>
//   );
// }

const Input = React.forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

export default Input;
