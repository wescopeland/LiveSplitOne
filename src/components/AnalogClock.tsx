import * as React from "react";
import * as LiveSplit from "../livesplit";

export interface Props { timer: LiveSplit.Timer }

export class Component extends React.Component<Props, LiveSplit.AnalogClockComponentStateJson> {
    inner: LiveSplit.AnalogClockComponent;
    timerID: number;

    constructor(props: Props) {
        super(props);

        this.inner = LiveSplit.AnalogClockComponent.new();

        this.state = this.inner.stateAsJson(this.props.timer);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.update(),
            1000 / 30
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
        this.inner.dispose();
    }

    update() {
        this.setState(this.inner.stateAsJson(this.props.timer));
    }

    render() {
        let width = 300;
        let height = 300;

        let seconds = <line
            x1={(this.state.seconds[0] * 100) + "%"}
            y1={(this.state.seconds[1] * 100) + "%"}
            x2="50%"
            y2="50%"
            style={{
                "stroke": "rgb(255, 0, 0)",
                "stroke-width": "3",
            }} />;

        let minutes = <line
            x1={(this.state.minutes[0] * 100) + "%"}
            y1={(this.state.minutes[1] * 100) + "%"}
            x2="50%"
            y2="50%"
            style={{
                "stroke": "rgb(255, 255, 255)",
                "stroke-width": "5",
            }} />;

        let hours = <line
            x1={(this.state.hours[0] * 100) + "%"}
            y1={(this.state.hours[1] * 100) + "%"}
            x2="50%"
            y2="50%"
            style={{
                "stroke": "rgb(255, 255, 255)",
                "stroke-width": "8",
            }} />;

        let circle = <circle cx="50%" cy="50%" r="48%" style={{
            "stroke": "rgb(255, 255, 255)",
            "stroke-width": "5",
        }} />;

        let children = [circle, hours, minutes, seconds];

        let svg = React.createElement("svg", { "height": height }, children);
        return svg;
    }
}
