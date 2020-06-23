import React, { Component } from 'react';
import { 
    Modal,
    Button
} from 'react-bootstrap';

export class DeletionErrorModal extends Component {
    render() {
        return (
            <Modal
                show={this.props.show} onHide={this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
          >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Ошибка удаления
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {this.props.errorMessage}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
          </Modal>
        );
    }
}

export default DeletionErrorModal;
