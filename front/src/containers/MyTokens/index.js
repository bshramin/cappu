import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import TokenTransferModal from "./TokenTransferModal";
import ResultModal from "../../components/ResultModal";
import {
  retrieveWalletAddress,
  getContract,
  getDesiredNetworkName,
  getWalletNetworkName,
} from "../../helpers/connect";
import "./style.css";

export default function MyTokens() {
  const [account, setAccount] = useState();
  const [networkName, setNetworkName] = useState();
  const [tokensId, setTokensId] = useState();
  const [tokensData, setTokensData] = useState();
  const [tokenIdToTransfer, setTokenIdToTransfer] = useState(null);
  const [resultModalMsg, setResultModalMsg] = useState(null);
  const [resultModalColor, setResultModalColor] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    let account = retrieveWalletAddress();
    setAccount(account);
    if (account) {
      const cappuContract = await getContract();
      const netName = await getWalletNetworkName();
      if (netName !== getDesiredNetworkName()) {
        console.info("Wrong network!");
        return;
      }

      const output = await cappuContract.methods.getUserTokens(account).call();
      const id = output[0];
      const data = output[1];
      setNetworkName(netName);
      setTokensId(id);
      setTokensData(data);
    }
  };

  return (
    <div className="my-tokens-container">
      {(() => {
        if (!account) {
          return <span>Connect your wallet</span>;
        }
        if (networkName !== getDesiredNetworkName()) {
          return (
            <span>
              {" "}
              {"You need to connect your wallet to the " +
                getDesiredNetworkName() +
                " network."}
            </span>
          );
        }
        if (!tokensId || !tokensData) {
          return <span>Failed to load tokens</span>;
        }
        if (tokensId.length === 0 || tokensData === 0) {
          return (
            <>
              <span>You have no tokens yet</span>
              <Link to="/mint" className="mint-token-link">
                <Button>Mint a Token</Button>
              </Link>
            </>
          );
        }
        return (
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
        );
      })()}

      <TokenTransferModal
        show={!!tokenIdToTransfer}
        tokenId={tokenIdToTransfer}
        onError={(errMsg) => {
          setResultModalMsg(errMsg);
          setResultModalColor("red");
          setTokenIdToTransfer(null);
        }}
        onSuccess={() => {
          setResultModalMsg("Token transferred successfully");
          setResultModalColor("green");
          setTokenIdToTransfer(null);
          load();
        }}
        onClose={() => {
          setTokenIdToTransfer(null);
        }}
      />
      <ResultModal
        show={!!resultModalMsg}
        onClose={() => {
          setTokenIdToTransfer(null);
          setResultModalMsg(null);
          setResultModalColor(null);
        }}
        color={resultModalColor}
        text={resultModalMsg}
      />
    </div>
  );
}
