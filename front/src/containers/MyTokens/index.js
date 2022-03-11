import { useEffect, useState } from "react";
import Web3 from "web3";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TokenTransferModal from "./TokenTransferModal";
import TokenTransferResultModal from "./TokenTransferResultModal";
import { retrieveWalletAddress } from "../../helpers/connect";
import { CONTACT_ABI, CONTACT_ADDRESS, NETWORK } from "../../config";
import "./style.css";

export default function MyTokens() {
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();
  const [tokensId, setTokensId] = useState();
  const [tokensData, setTokensData] = useState();
  const [tokenIdToTransfer, setTokenIdToTransfer] = useState(null);
  const [transferResult, setTransferResult] = useState(null);

  useEffect(() => {
    const load = async () => {
      let account = retrieveWalletAddress();
      if (account) {
        const web3 = new Web3(Web3.givenProvider || NETWORK);
        const cappuContract = new web3.eth.Contract(
          CONTACT_ABI,
          CONTACT_ADDRESS
        );

        const balance = await cappuContract.methods.balanceOf(account).call();
        const output = await cappuContract.methods
          .getUserTokens(account)
          .call();

        const id = output[0];
        const data = output[1];

        setBalance(balance);
        setAccount(account);
        setTokensId(id);
        setTokensData(data);
      }
    };

    load();
  }, []);

  return account ? (
    <div className="my-tokens-container">
      <span>My Tokens</span>
      <span>Count: {balance}</span>
      {tokensId && tokensData ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Token ID</TableCell>
                <TableCell align="center">Token Data</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tokensId.map((id, index) => {
                let idString = id.toString();
                return (
                  <TableRow
                    key={id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {idString.substring(0, 5) +
                        "..." +
                        idString.substring(idString.length - 5)}
                    </TableCell>
                    <TableCell align="center">{tokensData[index]}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          if (tokenIdToTransfer === id) {
                            setTokenIdToTransfer(null);
                          } else {
                            setTokenIdToTransfer(id);
                          }
                        }}
                      >
                        Transfer
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}

      <TokenTransferModal
        show={!!tokenIdToTransfer}
        tokenId={tokenIdToTransfer}
        onClose={(result) => {
          setTransferResult(result);
          setTokenIdToTransfer(null);
        }}
      />
      <TokenTransferResultModal
        show={transferResult != null}
        onClose={() => {
          setTransferResult(null);
        }}
        result={transferResult}
      />
    </div>
  ) : (
    <div className="my-tokens-container">
      <span>Conect your wallet.</span>
    </div>
  );
}
