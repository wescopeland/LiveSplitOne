import * as React from "react";
import * as LiveSplit from "../livesplit";
import { Image } from "../util/Image";
import Split from "./Split";

export interface Props {
    state: LiveSplit.SplitsComponentStateJson,
    layoutState: LiveSplit.LayoutStateJson,
}

export default class Splits extends React.Component<Props> {
    private icons: Image[];

    constructor(props: Props) {
        super(props);
        this.icons = [];
    }

    public componentWillUnmount() {
        for (const iconUrl of this.icons) {
            iconUrl.dispose();
        }
    }

    public render() {
        for (const iconChange of this.props.state.icon_changes) {
            while (iconChange.segment_index >= this.icons.length) {
                this.icons.push(new Image());
            }
            this.icons[iconChange.segment_index].possiblyModify(iconChange.icon);
        }

        return (
            <div className="splits">
                {
                    this.props.state.splits.map((s: LiveSplit.SplitStateJson, i: number) =>
                        <Split
                            split={s}
                            splitsState={this.props.state}
                            layoutState={this.props.layoutState}
                            icon={this.icons[s.index].url}
                            key={s.index.toString()}
                            separatorInFrontOfSplit={
                                this.props.state.show_final_separator &&
                                i + 1 === this.props.state.splits.length
                            }
                        />,
                    )
                }
            </div>
        );
    }
}
