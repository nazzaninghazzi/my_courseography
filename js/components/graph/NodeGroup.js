import PropTypes from "prop-types"
import React from "react"
import Node from "./Node"

/** A React component class representing a group of Nodes on the graph */
export default class NodeGroup extends React.Component {
  render() {
    const highlightedNodes = this.props.highlightedNodes
    return (
      <g id="nodes">
        {Object.values(this.props.hybridsJSON).map(entry => {
          return (
            <Node
              JSON={entry}
              className={"hybrid"}
              key={entry.id_}
              hybrid={true}
              parents={this.props.connections.parents[entry.id_]}
              childs={this.props.connections.children[entry.id_]}
              status={this.props.nodesStatus[entry.id_].status}
              onWheel={this.props.onWheel}
              onKeydown={this.props.onKeydown}
              nodeDropshadowFilter={this.props.nodeDropshadowFilter}
            />
          )
        })}
        {Object.values(this.props.nodesJSON).map(entry => {
          // using `includes` to match "mat235" from "mat235237257calc2" and other math/stats courses
          const highlighted = highlightedNodes.some(node => entry.id_.includes(node))
          return (
            <Node
              JSON={entry}
              className="node"
              key={entry.id_}
              hybrid={false}
              parents={this.props.connections.parents[entry.id_]}
              status={this.props.nodesStatus[entry.id_].status}
              highlighted={highlighted}
              onClick={this.props.nodeClick}
              onMouseEnter={this.props.nodeMouseEnter}
              onMouseLeave={this.props.nodeMouseLeave}
              onMouseDown={this.props.nodeMouseDown}
              onWheel={this.props.onWheel}
              onKeydown={this.props.onKeydown}
              editMode={this.props.editMode}
              nodeDropshadowFilter={this.props.nodeDropshadowFilter}
            />
          )
        })}
      </g>
    )
  }
}

NodeGroup.propTypes = {
  editMode: PropTypes.bool,
  highlightedNodes: PropTypes.array,
  hybridsJSON: PropTypes.object,
  onWheel: PropTypes.func,
  onKeydown: PropTypes.func,
  nodeClick: PropTypes.func,
  nodeMouseDown: PropTypes.func,
  nodeMouseEnter: PropTypes.func,
  nodeMouseLeave: PropTypes.func,
  nodesStatus: PropTypes.object,
  nodesJSON: PropTypes.object,
  connections: PropTypes.object,
  nodeDropshadowFilter: PropTypes.string,
}
