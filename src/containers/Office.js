import { Component } from "react";
import { Temporal } from "@js-temporal/polyfill";
import Workplace from "./Workplace";

const initialState = {
    route: 'offi',
    speed: 'fast'
}
class Office extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    render() {
        return (
            this.state.route === 'office' ?
        <div>HI, I'm the office</div> :
        <Workplace Temporal={Temporal} speed={this.state.speed}/>
        )
    }
}

export default Office;