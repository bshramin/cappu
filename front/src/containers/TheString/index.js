import { useEffect, useState } from "react";
import Web3 from "web3";

import { retrieveWalletAddress } from "../../helpers/connect";
import { CONTACT_ABI, CONTACT_ADDRESS, NETWORK } from "../../config";

function TheString() {
  const [account, setAccount] = useState();
  const [contract, setContract] = useState();
  const [theString, setTheString] = useState();
  const [newString, setNewString] = useState();

  useEffect(() => {
    const load = async () => {
      setAccount(retrieveWalletAddress());

      const web3 = new Web3(Web3.givenProvider || NETWORK);
      const cappuContract = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS);
      setContract(cappuContract);

      const theString = await cappuContract.methods.getString().call();
      setTheString(theString);
    };

    load();
  }, []);

  var loadString = async () => {
    const theString = await contract.methods.getString().call();
    setTheString(theString);
  };

  var submitNewString = async () => {
    await contract.methods.setString(newString).send({ from: account });

    loadString();
  };

  return (
    <div>
      Your account is: {account}
      <h1>The String</h1>
      <ul>{theString}</ul>
      <input
        onChange={(e) => {
          setNewString(e.target.value);
        }}
      />
      <button onClick={submitNewString}>Submit</button>
    </div>
  );
}

export default TheString;
