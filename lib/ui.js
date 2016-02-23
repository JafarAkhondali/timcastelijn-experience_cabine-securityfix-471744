
import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
import $ from 'jquery';

export function ui(){
  //panel
  var Panel = React.createClass({
    getState: function(index){
      if(index == "0") return "panel-collapse collapse in";
      return "panel-collapse collapse";
    },
    render: function() {
      var icon = this.props.collapsed ? 'indicator glyphicon glyphicon-chevron-down  pull-right' : 'indicator glyphicon glyphicon-chevron-up  pull-right';

      return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a onClick={this.props.onClick} data-toggle="collapse" title={this.props.title} data-parent="#accordion" href={"#" + this.props.id}>{this.props.children + " " + this.props.collapsed}<i className={icon}></i></a>
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


  var state;

  var Accordion = React.createClass({
   getInitialState: function() {
   return {childsData: [
       {childText: "Maten", id:"collapse1", collapsed:false, title:"klik hier om de maten te kiezen"},
       {childText: "Modules", id:"collapse2", collapsed:true, title:"klik hier om de module indeling te kiezen"}
      ]};
    },
    updateWithDelay: function(){
      this.setState(state);
    },
    handleClick: function(childData, event){

      state = this.state;

      this.state.childsData.map(function(allChildData,childIndex) {

        if (childData != allChildData){
          // collapse all other childs
          state.childsData[childIndex].collapsed = true;
        }else{
          // collapse if not collapsed and vice versa
          var collapse = !state.childsData[childIndex].collapsed
          state.childsData[childIndex].collapsed = collapse;
        }
      });
      setTimeout( this.updateWithDelay , 300);
    },
    // check this out
    render: function () {
      var childrens = this.state.childsData.map(function(childData,childIndex) {
          return <Panel onClick={this.handleClick.bind(null,childData)} collapsed={childData.collapsed} key={childData.id} id={childData.id} title={childData.title}>{childData.childText}</Panel>;
      }.bind(this));
      return <div className="panel-group" id="accordion">{childrens}</div>;
    }
  });


  ReactDOM.render(
    <Accordion className="accordion" id="accordion" />,
    document.getElementById('content')
  );


}
