import React from 'react'
import { store } from '../../../index.js'
import { changeModal } from '../../../shared/actions'

import ComplementModal from './ComplementModal.jsx'
  
function closeModal() {
  store.dispatch(changeModal({name: null}))
}

const ModalConductor = props => {
  switch (props.currentModal.name) {
    case 'Complement':
      return <ComplementModal {...props} closeModal={closeModal} rest={props.currentModal.rest} />
    default:
      return null
  }
}

export default ModalConductor