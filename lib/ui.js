
import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import 'bootstrap/css/bootstrap.css!';


export function ui(){
  //panel
  var Panel = React.createClass({
    getState: function(index){
      if(index == "0") return "panel-collapse collapse in";
      return "panel-collapse collapse";
    },
    render: function() {
      return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a data-toggle="collapse" title={this.props.title} data-parent="#accordion" href={this.props.author}>{this.props.children}<i className="indicator glyphicon glyphicon-chevron-up  pull-right"></i></a>
            </h4>
          </div>
          <div id={this.props.id} className={this.getState(this.props.collapsed)}>
            <div className="panel-body">
              {this.props.children}
            </div>
          </div>
        </div>
      );
    }
  });


  var Accordion = React.createClass({
    toggleChevron: function(e) {
        console.log('test');
        $(e.target)
            .prev('.panel-heading')
            .find("i.indicator")
            .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
    },
    render: function() {
      return (
        <div className="panel-group" id="accordion">
          <Panel id="collapse1" author="#collapse1" collapsed="0" title="klik hier om de maten te kiezen">Maten</Panel>
          <Panel id="collapse2" author="#collapse2" collapsed="1" title="klik hier om de module indeling te kiezen">Modules</Panel>
        </div>
      );
    }
  });


  ReactDOM.render(
    <Accordion className="accordion"/>,
    document.getElementById('content')
  );


}
