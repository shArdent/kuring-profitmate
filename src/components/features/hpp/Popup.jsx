import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../ui/Button";
import NotificationModal from "../../ui/NotificationModal";

const Popup = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  fields,
  values,
  onChange,
  isEditing = false,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success");

  const handleInputChange = (field, value) => {
    onChange({ ...values, [field]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Jalankan fungsi submit dari parent
    try {
      onSubmit(values);
      setModalType("success");
      setModalMessage(
        isEditing ? "Data berhasil diperbarui!" : "Data berhasil ditambahkan!"
      );
      setShowModal(true);
    } catch (error) {}

    handleCloseModal();
    // Tampilkan notifikasi modal dengan pesan yang sesuai

    // Jangan tutup popup langsung di sini
    // Tunggu user klik OK di modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
    onClose(); // Baru tutup popup setelah modal ditutup
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg border-2 border-gray-300 shadow-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-center mb-6">{title}</h2>

            <form onSubmit={handleFormSubmit} className="mt-4">
              {fields.map((field) => (
                <div key={field.name} className="mb-4">
                  <label className="block text-base font-medium mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    value={values[field.name] || ""}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required={field.required}
                  />
                </div>
              ))}

              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  fullWidth
                >
                  Batal
                </Button>
                <Button type="submit" variant="primary" fullWidth>
                  {isEditing ? "Simpan" : "Tambahkan"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showModal && (
        <NotificationModal
          message={modalMessage}
          type={modalType}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      placeholder: PropTypes.string,
      required: PropTypes.bool,
    })
  ).isRequired,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
};

export default Popup;
