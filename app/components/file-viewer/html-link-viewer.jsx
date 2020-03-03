import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as classifierActions from '../../redux/ducks/classify';

/*
 * Renders a subject with a MIME type of `text/html` as a clickable button, which opens a link in
 * a new tab / window.
 */
class HTMLLinkViewer extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const url = this.props.src;
    const newMetadata = {
      link_opened_at: [
        {
          link: url,
          opened_at: (new Date()).toISOString()
        },
      ]
    };

    // The `updateMetadata` action only does a shallow merge to the metadata property - if we want
    // to support multiple links in the future, we'd need to update this to do a deep merge.
    this.props.actions.classifier.updateMetadata(newMetadata);
    window.open(url, '_blank');
  }

  render() {
    return (
      <div className="html-link-viewer">
        <button className="standard-button" onClick={this.onClick}>
          Click to open the article in a new tab / window
        </button>
      </div>
    )
  }

}

HTMLLinkViewer.propTypes = {
  src: PropTypes.string,
};


const mapDispatchToProps = dispatch => ({
  actions: {
    classifier: bindActionCreators(classifierActions, dispatch),
  }
});

export default connect(null, mapDispatchToProps)(HTMLLinkViewer);
export { HTMLLinkViewer };
