// THIS IS NOT PRESENT ON THE WIDGET PICKER, BUT THE FUNCTIONALITY IS ALL HERE
// IF YOU WANT TO ADD IT TO THE OPTIONS OF WIDGETS TO PICK FROM, YOU WILL NEED TO ADD
// IT TO widgetPicker.js and tile.js
// NOTE: this needs a lot more styling to make it work with the widget cards --> automated pagination

import React from 'react';
import Widget from '../widget.js';
import $ from 'jquery';
import './breakNewsRssFeedWidget.scss';

class BreakingNewsRssFeedWidget extends Widget {
  constructor(props) {
    super(props);
    this.state.rss = [];
    this.state.isLoading = true;

    // Update every minute
    this.internalTimer = setInterval(this.handleRefresh, 60000);
  }

  handleRefresh = () => {
    // TODO: make this configurable
    $.ajax({
      url: `${process.env.REACT_APP_API_URL}api/rssFeed`
    }).done(result => {
      this.setState({ rss: result, isLoading: false });
      // console.log('state rss', this.state.rss);
    });
  };

  renderWidget() {
    if (this.state.isLoading) {
      this.handleRefresh();
      return <div className="Item">Loading...</div>;
    }
    if (this.state.isResizing) {
      return <div className="Item">(Resizing in progress)</div>;
    }

    const items = [];

    for (const obj of this.state.rss) {
      items.push(
        <div className="item">
          <div className="title">{obj.title}</div>
          <a href={obj.link} className="link">
            Read More
          </a>
        </div>
      );
    }
    return <div className="RssFeed">{items}</div>;
  }
}

export default BreakingNewsRssFeedWidget;
