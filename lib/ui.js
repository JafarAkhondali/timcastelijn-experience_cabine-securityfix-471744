
import React from 'react';
import ReactDOM from 'react-dom';
import { PanelGroup } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './custom.css!';

export function ui(){
  const ControlledPanelGroup = React.createClass({
   getInitialState() {
     return {
       activeKey: '1'
     };
   },

   handleSelect(activeKey) {
     this.setState({ activeKey });
   },

   render() {
    return (
      <PanelGroup id="controlPanel" activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
        <Panel header='Panel 1' eventKey="1">
          Panel 1 content blaahhahahahhahhjadakfgvkhgvkhgwfffwajhvfjhvfkhjgvkhagvkhsvfkhvfkhvhg
        </Panel>
        <Panel header='Panel 2' eventKey="2">Panel 2 content</Panel>
        <div>
          <Button>vraag offerte aan</Button>
        </div>
      </PanelGroup>
    );
}
 });

 ReactDOM.render(<ControlledPanelGroup />, document.getElementById('content'));


}
