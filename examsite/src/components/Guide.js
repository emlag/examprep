import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Global} from './styles'
import Tree from './Tree';

class Guide extends Component {


    render() {
        return (
            <>
                <Global/>
                <Tree name="main" defaultOpen>
                    <Tree name="hello">
                        <Tree name="subtree with no children"/>
                    </Tree>
                    <Tree name="subtree with children">
                        <Tree name="hello"/>
                        <Tree name="sub-subtree with children">
                            <Tree name="child 1" style={{color: '#37ceff'}}/>
                            <Tree name="child 2" style={{color: '#37ceff'}}/>
                            <Tree name="child 3" style={{color: '#37ceff'}}/>
                            <Tree name="custom content">
                                <div style={{position: 'relative', width: '100%', height: 200, padding: 10}}>
                                    <div style={{width: '100%', height: '100%', background: 'black', borderRadius: 5}}/>
                                </div>
                            </Tree>
                        </Tree>
                        <Tree name="hello"/>
                    </Tree>
                    <Tree name="world"/>
                    <Tree name={<span>🙀 something something</span>}/>
                </Tree>
            </>
        )
    }
}

export default Guide;