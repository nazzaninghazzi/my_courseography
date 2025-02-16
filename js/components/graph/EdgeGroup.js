import PropTypes from "prop-types"
import React from "react"
import Edge from "./Edge"
/**
 * Class representing a group of all Edges from the graph
 */
export default class EdgeGroup extends React.Component {
  /**
   * Generate React Component representation of edge
   * @param {JSON} edgeJSON Represents a single edge
   * @returns {Edge} The React Component representing the edge
   */
  generateEdge = edgeJSON => {
    return (
      <Edge
        className="path"
        key={edgeJSON.id_}
        source={edgeJSON.source}
        target={edgeJSON.target}
        points={edgeJSON.points}
        status={this.props.edgesStatus[edgeJSON.id_]}
      />
    )
  }

  render() {
    // Missing edges must be rendered last. The sort
    // method custom sorts a copy of edgesJSON so that all missing edges
    // are last in the list. Then render based on that list.
    const edges = Object.values(this.props.edgesJSON)
    const edgesCopy = [...edges]
    const state = this.props.edgesStatus
    edgesCopy.sort((a, b) => {
      // If an edge is missing, its edgeID should be in EdgeGroup's
      // state and its value should be true.
      const aID = a.id_
      const bID = b.id_
      let aMiss = false
      let bMiss = false
      aMiss = aID in state && state[aID]
      bMiss = bID in state && state[bID]
      if ((aMiss && bMiss) || (!aMiss && !bMiss)) {
        // a and b are equal
        return 0
      } else if (aMiss && !bMiss) {
        // sort a after b
        return 1
      } else if (!aMiss && bMiss) {
        // sort b after a
        return -1
      }
    })
    return <g id="edges">{edgesCopy.map(this.generateEdge)}</g>
  }
}

EdgeGroup.propTypes = {
  /**Array of all edges in the graph */
  edgesJSON: PropTypes.object,
  /** An object containing all edge to status pairs */
  edgesStatus: PropTypes.object,
}
