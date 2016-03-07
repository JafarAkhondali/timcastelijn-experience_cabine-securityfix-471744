
import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import { PanelGroup } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import 'bootstrap/css/bootstrap.css!';
import $ from 'jquery';

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
       <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
         <Panel header={boolean} eventKey="1">Panel 1 content</Panel>
         <Panel header={boolean} eventKey="2">Panel 2 content</Panel>
       </PanelGroup>
     );
   }
 });

 ReactDOM.render(<ControlledPanelGroup />, document.getElementById('content'));


}
