import {useState} from 'react'

function useToggle(value) {
  const [show, setShow] = useState(value);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    {show, handleClose, handleShow}
  );
}

export default useToggle