import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  MdMoreHoriz,
  MdEdit,
  MdDeleteForever,
  MdVisibility,
  MdSwapHoriz,
} from 'react-icons/md';

import {
  Container,
  ActionsMenu,
  ListActions,
  ActionMenu,
  BtnAction,
} from './styles';

export default function MenuActions({
  Show,
  Edit,
  Delete,
  Cancel,
  Transmission,
}) {
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(150);

  useEffect(() => {
    if (Cancel) {
      setWidth(200);
    }
  }, [Cancel]);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  function handleShow() {
    setVisible(!visible);
    Show();
  }

  function handleEdit() {
    setVisible(!visible);
    Edit();
  }

  function handleDelete() {
    setVisible(!visible);
    Delete();
  }

  function handleTransmisão() {
    setVisible(!visible);
    Transmission();
  }

  return (
    <Container onMouseLeave={() => setVisible(false)}>
      <BtnAction type="button" onClick={handleToggleVisible}>
        <MdMoreHoriz size={18} color="#999999" />
      </BtnAction>

      <ActionsMenu visible={visible} width={width}>
        <ListActions>
          {Show && (
            <ActionMenu onClick={handleShow}>
              <MdVisibility size={18} color="#8E5BE8" />
              <p>Visualizar</p>
            </ActionMenu>
          )}
          {Edit && (
            <ActionMenu onClick={handleEdit}>
              <MdEdit size={18} color="#4D85EE" />
              <p>Editar</p>
            </ActionMenu>
          )}
          {Delete && (
            <ActionMenu onClick={handleDelete}>
              <MdDeleteForever size={18} color="#DE3B3B" />
              <p>Excluir</p>
            </ActionMenu>
          )}
          {Transmission && (
            <ActionMenu onClick={handleTransmisão}>
              <MdSwapHoriz size={18} color="#8E5BE8" />
              <p>Transmissão</p>
            </ActionMenu>
          )}
        </ListActions>
      </ActionsMenu>
    </Container>
  );
}

MenuActions.propTypes = {
  Show: PropTypes.func,
  Edit: PropTypes.func,
  Delete: PropTypes.func,
  Cancel: PropTypes.func,
  Transmission: PropTypes.func,
};

MenuActions.defaultProps = {
  Show: null,
  Edit: null,
  Delete: null,
  Cancel: null,
  Transmission: null,
};
