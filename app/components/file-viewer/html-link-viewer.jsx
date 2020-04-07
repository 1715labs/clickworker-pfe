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

    // https://developer.mozilla.org/en-US/docs/Web/API/Window/open#Window_functionality_features
    // reckons `noreferrer` implies `noopener`; we're including both for a belt and braces approach
    window.open(url, '_blank', 'noreferrer,noopener');
  }

  render() {
    return (
      <div className="html-link-viewer">
        <div>
          <span className="html-link-viewer__number">1.</span> Click the button below to open the article
        </div>
        <button className="standard-button" onClick={this.onClick} role="link">
          Open article
        </button>
        <div>
          <span className="html-link-viewer__number">2.</span> Select the appropriate category
        </div>
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
