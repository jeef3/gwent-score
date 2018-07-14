import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Dialog from './Dialog';
import Overlay from './Overaly';

const DialogLayout = styled.div`
  height: 100%;

  display: grid;
  grid-template-rows: 40px auto auto auto 40px;
`;
DialogLayout.displayName = 'DialogLayout';
export default connect(
  state => ({ showModal: state.showModal }),
  dispatch => ({
    onCancel: () => dispatch({}),
    onAddCard: () => dispatch({})
  })
)(
  ({ showModal, onCancel, onAddCard }) =>
    showModal ? (
      <div>
        <Overlay />
        <Dialog>
          <DialogLayout>
            <div>Add Card</div>

            <div>Select points</div>
            <div>Select combat</div>
            <div>Select Attr</div>

            <div
              style={{
                backgroundColor: 'lightgray',
                display: 'flex',
                flexDirection: 'row-reverse',
                justifyContent: 'space-around',
                alignItems: 'center'
              }}
            >
              <button type="button" onClick={onAddCard}>
                Add Card
              </button>
              <button type="button" onClick={onCancel}>
                Cancel
              </button>
            </div>
          </DialogLayout>
        </Dialog>
      </div>
    ) : null
);
