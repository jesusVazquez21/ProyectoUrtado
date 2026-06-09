import { DatePicker, Form, Input, Modal } from "antd";
import moment from "moment";
import React from "react";
import PropTypes from "prop-types";

/**
 * Renders a modal for creating or editing an expense record.
 *
 * @param {boolean} modalVisible - Flag to indicate if the modal is visible.
 * @param {Function} setModalVisible - Function to set the visibility of the modal.
 * @param {Function} handleAdd - Function to handle adding a new expense record.
 * @param {Object} newExpense - The new expense record data.
 * @param {Function} setNewExpense - Function to set the new expense record data.
 * @param {Object} editingRecord - The expense record being edited.
 * @param {Function} setEditingRecord - Function to set the editing expense record.
 * @param {Function} handleUpdateRecord - Function to handle updating an expense record.
 * @return {JSX.Element} The rendered modal for creating or editing an expense record.
 */
const CreateModal = ({
  modalVisible,
  setModalVisible,
  handleAdd,
  newExpense,
  setNewExpense,
  editingRecord,
  setEditingRecord,
  handleUpdateRecord,
}) => {
const handleSaveClick = () => {
    // 1. INFO: Avisamos que inició el proceso
    console.info("INFO: Verificando datos para guardar el gasto...");

    const currentData = editingRecord ? editingRecord : newExpense;

    // 2. ERROR: Verificamos si falta el concepto o si el monto está vacío o es inválido
    if (!currentData.concept || !currentData.amount || currentData.amount <= 0) {
      console.error("ERROR: No se puede guardar. El concepto está vacío o el monto es inválido.");
      return; // El return detiene la ejecución, así no guarda datos incorrectos
    }

    // Si pasa la validación, procedemos a guardar
    if (editingRecord) {
      handleUpdateRecord();
      // 3. LOG: Éxito al editar
      console.log("LOG: ¡El gasto se actualizó correctamente!");
    } else {
      handleAdd();
      // 3. LOG: Éxito al crear uno nuevo
      console.log("LOG: ¡Nuevo gasto agregado a la lista exitosamente!");
    }
  };
  return (
    <Modal
      title={editingRecord ? "Editar Gasto" : "Agregar Gasto"}
      visible={modalVisible}
      
      // CAMBIO AQUÍ: Reemplazamos la lógica anterior por nuestra nueva función
      onOk={handleSaveClick} 
      
      onCancel={() => {
        // También podemos agregar un info si el usuario cancela la acción
        console.info("INFO: El usuario canceló la operación y cerró el modal.");
        setModalVisible(false);
        setEditingRecord(null);
      }}
    >
      <Form>
        <Form.Item label="Fecha">
          <DatePicker
            value={
              editingRecord
                ? moment(editingRecord?.date)
                : moment(newExpense?.date)
            }
            onChange={(date) =>
              editingRecord
                ? setEditingRecord({
                    ...editingRecord,
                    date,
                  })
                : setNewExpense({ ...newExpense, date })
            }
          />
        </Form.Item>
        <Form.Item label="Concepto">
          <Input
            value={editingRecord ? editingRecord.concept : newExpense.concept}
            onChange={(e) =>
              setEditingRecord
                ? setEditingRecord({
                    ...editingRecord,
                    concept: e.target.value,
                  })
                : setNewExpense({ ...newExpense, concept: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Monto">
          <Input
            type="number"
            value={editingRecord ? editingRecord.amount : newExpense.amount}
            onChange={(e) =>
              setEditingRecord
                ? setEditingRecord({ ...editingRecord, amount: e.target.value })
                : setNewExpense({ ...newExpense, amount: e.target.value })
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

CreateModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  newExpense: PropTypes.object.isRequired,
  setNewExpense: PropTypes.func.isRequired,
  editingRecord: PropTypes.object,
  setEditingRecord: PropTypes.func,
  handleUpdateRecord: PropTypes.func.isRequired,
};

export default CreateModal;
