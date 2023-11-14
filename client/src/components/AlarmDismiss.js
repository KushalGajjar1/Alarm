import { ethers } from "ethers";

const AlarmDismiss = ({ state }) => {

    const {contract} = state;

    const dismissAlarm = async (event) => {
        event.preventDefault();
        const rec = await contract.recordWakeUpStatus();
        console.log(rec);
        const checkDone = await contract.checkCompletion();
        console.log(checkDone);
    }

    return (
        <div className="btn">
            
            <button onClick={dismissAlarm}>Dismiss</button>
    
        </div>
    );
};
export default AlarmDismiss;