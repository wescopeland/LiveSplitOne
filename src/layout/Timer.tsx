import * as React from "react";
import * as LiveSplit from "../livesplit-core";
import { colorToCss, gradientToCss } from "../util/ColorUtil";

import variables from "../css/variables.scss";
import "../css/Timer.scss";

const sidePadding = parseFloat(variables.sidePadding);

export interface Props {
    state: LiveSplit.TimerComponentStateJson,
    componentId: string,
    layoutWidth: number,
}

export function renderToSVG(
    state: LiveSplit.TimerComponentStateJson,
    className: string,
    componentWidth: number,
): JSX.Element {
    const time = state.time;
    const fraction = state.fraction;
    const height = state.height;

    let shiftX;
    switch (state.fraction.length) {
        case 0: shiftX = 0; break;
        case 2: shiftX = height * 0.6; break;
        case 3: shiftX = height; break;
        case 4: shiftX = height / 0.71; break;
        default: throw new Error("Unexpected Fraction Length");
    }
    const x = `${componentWidth - sidePadding - 0.85 * shiftX}px`;
    const y = `${0.82 * height}px`;

    return (
        <div
            className="timer"
            style={{
                background: gradientToCss(state.background),
            }}
        >
            <svg
                className={className}
                height={`${height}px`}
                style={{
                    display: "block",
                    filter: "drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5))",
                    width: componentWidth,
                }}
            >
                <defs>
                    <linearGradient id={`${className}-text-gradient`} x1="0%" x2="0%" y1="0%" y2="100%">
                        <stop
                            offset="0%"
                            style={{
                                stopColor: colorToCss(state.top_color),
                            }}
                        />
                        <stop
                            offset="100%"
                            style={{
                                stopColor: colorToCss(state.bottom_color),
                            }}
                        />
                    </linearGradient>
                </defs>
                <text className="timer-time" style={{
                    fill: `url(#${className}-text-gradient)`,
                    fontFamily: "timer, sans-serif",
                    fontSize: `${0.9 * height}px`,
                }} x={x} y={y} textAnchor="end">{time}</text>
                <text className="timer-time" style={{
                    fill: `url(#${className}-text-gradient)`,
                    fontFamily: "timer, sans-serif",
                    fontSize: `${0.6 * height}px`,
                }} x={`${componentWidth - 6}px`} y={y} textAnchor="end">{fraction}</text>
            </svg>
        </div>
    );
}

export default class Timer extends React.Component<Props> {
    public render() {
        return renderToSVG(this.props.state, this.props.componentId, this.props.layoutWidth);
    }
}
