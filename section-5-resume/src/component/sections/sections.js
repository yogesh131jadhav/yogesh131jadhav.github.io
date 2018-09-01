import React, { Component } from 'react';
import './sections.css';

class Sections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "articles":""
    };
    this.count = 0;
    this.aboutUsList = this.aboutUsList.bind(this);
    this.formAboutUs = this.formAboutUs.bind(this);
    this.educationList = this.educationList.bind(this);
    this.formArticlePage = this.formArticlePage.bind(this);
    this.article = "";
  }

  aboutUsList(content, classes='') {
    if(classes === '') {
      let classes = "ng-binding ng-scope text-align-left";
    }
    return content.map(function(item,index) {
      return (
        <li className={classes} key={index}>{item.point}</li>
      );
    });
  }

  educationList(content1) {
    return content1.map(function(item,index) {
      return (
        <dl key={index} className="row ng-scope">
          <dt className="col-sm-3 ng-binding">{item.yr}</dt>
          <dd className="col-sm-3 ng-binding">{item.std}</dd>
          <dd className="col-sm-6 ng-binding">{item.university}</dd>
        </dl>
      );
    });
  }

  formArticlePage(articleData) {
    var articleDataContent = '';
    if(articleData.title === 'About Me') {
      return articleDataContent = <div className="row ng-scope">
        <div className="col-md-6">
          <ul>
            {this.aboutUsList(articleData.content)}
          </ul>
        </div>
        <div className="col-md-6">
          <p className="text-center"><b>Education</b></p>
          {this.educationList(articleData.content1)}
        </div>
      </div>;
    }
    if(articleData.title !== 'About Me') {
      let className = "col-md-6";
      if(articleData.title === 'Experience') {
        className = "col-md-12";
      }
      return articleDataContent = articleData.content.map(function(item,index) {
        return (
          <div className={className}>
            <address>
              <strong>{item.title}</strong>
              <ul>
                {this.aboutUsList(item.points)}
              </ul>
            </address>
          </div>
        );
      }, this);
    }
  }

  formAboutUs() {
    var articleDataContent = '';
    var totalArticleData = '';
    if(this.props.articles && this.count == 0) {
      this.state.articles = this.props.articles;
      totalArticleData = this.state.articles.map(function(item,index) {
        var articleData = item;
        articleDataContent = this.formArticlePage(item);
        return (
          <article className={articleData.class} key={index}>
            <div className="title ng-binding">{articleData.title}</div>
            <div className="container">
              {articleDataContent}
            </div>
          </article>
        );
      }, this);
      /*for(var i = 0; i < this.state.articles.length; i++) {
        var articleData = this.state.articles[i];
        articleDataContent = this.formArticlePage(articleData);
        totalArticleData = <article className={articleData.class}>
          <div className="title ng-binding">{articleData.title}</div>
          <div className="container">
            {articleDataContent}
          </div>
        </article>;
      }*/
      this.count++;
      this.article = totalArticleData;
    }
  }

  render() {
    this.formAboutUs();
    return (
      <div>
        Yogesh
        {this.article}
      </div>
    );
  }
}

export default Sections;
