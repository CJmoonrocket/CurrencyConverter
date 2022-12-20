export function SettingsModal(props) {
    if (!props.showSettingsModal) {
        return null
    }
    return (
        <div class="overlay">
            <div className="modal-flex-container">
                <div className="modal-container">
                    <i className="close-button" onClick={props.closeModal}>X</i>
                    <h3>Settings</h3>
                    <div className="settings-item">
                        <input
                        type="checkbox"
                        onChange={props.toggleDisabledDenominationAdjustment}
                        defaultChecked={props.disabledDenominationAdjustment}/>
                        <span>Disable automatic denomation adjustment</span>
                    </div>
                </div>
            </div>
        </div>
    )
};