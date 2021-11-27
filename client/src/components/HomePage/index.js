import { Component } from "react";
import ReadString from "../ReadString";
import SetString from "../SetString";
import MintToken from "../MintToken";
import "./style.css";

export default class HomePage extends Component {
  render() {
    if (this.props.loading) return "Loading Drizzle...";
    const { drizzle, drizzleState } = this.props;
    return (
      <div className="homepage">
        <ReadString drizzle={drizzle} drizzleState={drizzleState} />
        <SetString drizzle={drizzle} drizzleState={drizzleState} />
        <MintToken drizzle={drizzle} drizzleState={drizzleState} />
      </div>
    );
  }
}
