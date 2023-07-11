import React, { useMemo } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { capitalize } from 'utils/helpers'
import { LoginForm, SignupForm } from 'features/home/auth'

type Props = {
    show: boolean,
    handleClose:any,
    modalType:any,
    modaltypehandler: any
}

const AuthModal = (props: Props) => {
  const {show, handleClose, modalType, modaltypehandler} = props;
  const modalname = useMemo(() => capitalize(modalType), [modalType])
  return (
    <div>      
      <Modal isOpen={show} toggle={handleClose} size='lg' centered>
        <ModalHeader toggle={handleClose}>{modalname}</ModalHeader>
        <ModalBody>
            {modalType === "login" ? <LoginForm modaltypehandler={modaltypehandler} />:<SignupForm modaltypehandler={modaltypehandler} />}
        </ModalBody>
      </Modal>
    </div>
  )
}

export default AuthModal