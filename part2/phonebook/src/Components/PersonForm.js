const InputForm = ({ text, value, handleOnChange }) => {
    return (
        <div>
            {text}: <input value={value} onChange={handleOnChange} />
        </div>
    );
};
const PersonForm = ({
    handleOnSubmit,
    handleNameChange,
    handleNumberChange,
    newName,
    newPhoneNumber,
}) => {
    return (
        <form onSubmit={handleOnSubmit}>
            <InputForm
                text="name"
                value={newName}
                handleOnChange={handleNameChange}
            />
            <InputForm
                text="number"
                value={newPhoneNumber}
                handleOnChange={handleNumberChange}
            />
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};
export default PersonForm;
