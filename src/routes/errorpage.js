import React from 'react'
import style from './errorpage.less';
const $ = require("jquery");

class ErrorPage extends React.Component {

    componentDidMount(){
        function ErrorPage(container, pageType, templateName) {
            this.$container = $(container);
            this.$contentContainer = this.$container.find(templateName == 'sign' ? '.sign-container' : '.content-container');
            this.pageType = pageType;
            this.templateName = templateName;
          }
     
          ErrorPage.prototype.centerContent = function () {
            var containerHeight = this.$container.outerHeight()
              , contentContainerHeight = this.$contentContainer.outerHeight()
              , top = (containerHeight - contentContainerHeight) / 2
              , offset = this.templateName == 'sign' ? -100 : 0;
     
            this.$contentContainer.css('top', top + offset);
          };
     
          ErrorPage.prototype.initialize = function () {
            var self = this;
     
            this.centerContent();
            this.$container.on('resize', function (e) {
              e.preventDefault();
              e.stopPropagation();
              self.centerContent();
            });
     
            // fades in content on the plain template
            if (this.templateName == 'plain') {
              window.setTimeout(function () {
                self.$contentContainer.addClass('in');
              }, 500);
            }
     
            // swings sign in on the sign template
            if (this.templateName == 'sign') {
              $('.sign-container').animate({textIndent : 0}, {
                step : function (now) {
                  $(this).css({
                    transform : 'rotate(' + now + 'deg)',
                    'transform-origin' : 'top center'
                  });
                },
                duration : 1000,
                easing : 'easeOutBounce'
              });
            }
          };
     
     
          ErrorPage.prototype.createTimeRangeTag = function(start, end) {
            return (
              '<time utime=' + start + ' simple_format="MMM DD, YYYY HH:mm">' + start + '</time> - <time utime=' + end + ' simple_format="MMM DD, YYYY HH:mm">' + end + '</time>.'
            )
          };
     
     
          ErrorPage.prototype.handleStatusFetchSuccess = function (pageType, data) {
            if (pageType == '503') {
              $('#replace-with-fetched-data').html(data.status.description);
            } else {
              if (!!data.scheduled_maintenances.length) {
                var maint = data.scheduled_maintenances[0];
                $('#replace-with-fetched-data').html(this.createTimeRangeTag(maint.scheduled_for, maint.scheduled_until));
                $.fn.localizeTime();
              }
              else {
                $('#replace-with-fetched-data').html('<em>(there are no active scheduled maintenances)</em>');
              }
            }
          };
     
     
          ErrorPage.prototype.handleStatusFetchFail = function (pageType) {
            $('#replace-with-fetched-data').html('<em>(enter a valid Statuspage url)</em>');
          };
     
     
          ErrorPage.prototype.fetchStatus = function (pageUrl, pageType) {
            //console.log('in app.js fetch');
            if (!pageUrl || !pageType || pageType == '404') return;
     
            var url = ''
              , self = this;
     
            if (pageType == '503') {
              url = pageUrl + '/api/v2/status.json';
            }
            else {
              url = pageUrl + '/api/v2/scheduled-maintenances/active.json';
            }
     
            $.ajax({
              type : "GET",
              url : url,
            }).success(function (data, status) {
              //console.log('success');
              self.handleStatusFetchSuccess(pageType, data);
            }).fail(function (xhr, msg) {
              //console.log('fail');
              self.handleStatusFetchFail(pageType);
            });
     
          };
          var ep = new ErrorPage('body', "404", "plain");
          ep.initialize();
     
          // hack to make sure content stays centered >_<
          $(window).on('resize', function() {
            $('body').trigger('resize')
          });
    }

    render() {
        return (
            <div className="plain error-page-wrapper background-color background-image">
            <div className="content-container">
                <div className="head-line secondary-text-color">
                    404
        </div>
                <div className="subheader primary-text-color">
                    Oops, the page you're <br />
                    looking for does not exist.
        </div>
                <hr />
                <div className="clearfix"></div>
                <div className="context primary-text-color">
                    <p>
                        You may want to head back to the homepage.
        </p>
                </div>
                <div className="buttons-container">
                    <a className="border-button" href="/">Go To Homepage</a>
                </div>
            </div>
            </div>
        )
    }
}

export default ErrorPage