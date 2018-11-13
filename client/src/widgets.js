// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import {Component} from 'react-simplified';

/**
 * Renders alert messages using Bootstrap classes.
 */
export class Alert extends Component {
    alerts: { text: React.Node, type: string }[] = [];

    render() {
        return (
            <>
                {this.alerts.map((alert, i) => (
                    <div key={i} className={'alert alert-' + alert.type} role="alert">
                        {alert.text}
                        <button
                            className="close"
                            onClick={() => {
                                this.alerts.splice(i, 1);
                            }}
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </>
        );
    }

    static success(text: React.Node) {
        // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
        setTimeout(() => {
            for (let instance of Alert.instances()) instance.alerts.push({text: text, type: 'success'});
        });
    }

    static info(text: React.Node) {
        // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
        setTimeout(() => {
            for (let instance of Alert.instances()) instance.alerts.push({text: text, type: 'info'});
        });
    }

    static warning(text: React.Node) {
        // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
        setTimeout(() => {
            for (let instance of Alert.instances()) instance.alerts.push({text: text, type: 'warning'});
        });
    }

    static danger(text: React.Node) {
        // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
        setTimeout(() => {
            for (let instance of Alert.instances()) instance.alerts.push({text: text, type: 'danger'});
        });
    }

}

class FormInput extends Component<{
    type: string,
    label: React.Node,
    value: mixed,
    onChange: (event: SyntheticInputEvent<HTMLInputElement>) => mixed,
    required?: boolean,
    pattern?: string
}> {
    render() {
        return (
            <div className="form-group row">
                <label className="col-sm-1 col-form-label">{this.props.label}</label>
                <div className="col-sm-11">
                    <input
                        className="form-control"
                        type={this.props.type}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        required={this.props.required}
                        pattern={this.props.pattern}
                    />
                </div>
            </div>
        );
    }
}

/**
 * Renders simplified form elements using Bootstrap classes
 */
export class Form {
    static Input = FormInput;
}

export class Button extends Component<{
    onClick: () => mixed,
    children: React.Node
}>{
    render() {
        return(
            <button type="button" className="btn btn-primary" onClick={this.props.onClick}>
                {this.props.children}
            </button>
        );
    }
}