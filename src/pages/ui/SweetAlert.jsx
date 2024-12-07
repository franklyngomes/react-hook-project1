import SweetAlert from "react-bootstrap-sweetalert";
function SweetAlertComponent({ confirm, cancel, title, subtitle, type }) {
    return (
        <SweetAlert
            type={type}
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            title={title}
            onConfirm={confirm}
            onCancel={cancel}
            focusCancelBtn
        >
            {subtitle}
        </SweetAlert>
    );
}

export default SweetAlertComponent;