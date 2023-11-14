import { ethers } from "ethers";

const AlarmForm = ({ state }) => {
  
  const { contract } = state;

  const setAlarmDetails = async (event) => {


    event.preventDefault();
    
    const wakeUpTime = document.querySelector("#wakeUpTime").value;

    const finalTime = parseInt(wakeUpTime, 10)*3600 + Math.floor(new Date().getTime() / 1000);

    console.log(finalTime);

    const amount = { value: ethers.utils.parseEther("0.01") };

    const transaction = await contract.setDetails(100,amount);
    await transaction.wait();
    console.log(transaction);
  };

  return (
    <div>
        <form   onSubmit={setAlarmDetails}>
            <h2>Wake Up Time : </h2>
            <input type="text" id="wakeUpTime" placeholder="Enter the number of hours from now you want to set alarm"/>

            <button type="submit">Submit</button>
        </form>
    </div>
  );
};
export default AlarmForm;