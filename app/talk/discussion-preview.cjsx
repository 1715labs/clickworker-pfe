React = require 'react'
{Link} = require 'react-router'
resourceCount = require './lib/resource-count'
{State} = require 'react-router'
PromiseRenderer = require '../components/promise-renderer'
LatestCommentLink = require './latest-comment-link'
Thumbnail = require '../components/thumbnail'
apiClient = require '../api/client'
talkClient = require '../api/talk'
getSubjectLocation = require '../lib/get-subject-location'

module?.exports = React.createClass
  displayName: 'TalkDiscussionPreview'

  propTypes:
    discussion: React.PropTypes.object

  render: ->
    {params, discussion} = @props

    <div className="talk-discussion-preview">
      <div className="preview-content">

        {if discussion.subject_default
          <PromiseRenderer promise={talkClient.type('comments').get(discussion.links.comments[0])}>{(comment) =>
            if comment.focus_type is 'Subject'
              <div className="subject-preview">
                <PromiseRenderer promise={apiClient.type('subjects').get(comment.focus_id)}>{(subject) =>
                  <Thumbnail src={getSubjectLocation(subject).src} width={100} />
                }</PromiseRenderer>
              </div>
            else
              null
          }</PromiseRenderer>
          }

        <h1>
          {<i className="fa fa-thumb-tack talk-sticky-pin"></i> if discussion.sticky}
          {if params?.owner and params?.name # get from url if possible
            <Link to="project-talk-discussion" params={board: discussion.board_id, discussion: discussion.id, owner: params.owner, name: params.name}>
              {discussion.title}
            </Link>

          else if @props.project # otherwise fetch from project
            [owner, name] = @props.project.slug.split('/')
            <Link to="project-talk-discussion" params={board: discussion.board_id, discussion: discussion.id, owner: owner, name: name}>
              {discussion.title}
            </Link>

          else # link to zooniverse main talk
            <Link to="talk-discussion" params={board: discussion.board_id, discussion: discussion.id}>
              {discussion.title}
            </Link>
            }
        </h1>

        <LatestCommentLink {...@props} project={@props.project} discussion={discussion} />

      </div>
      <div className="preview-stats">
        <p>
          <i className="fa fa-user"></i> {resourceCount(discussion.users_count, "Participants")}
        </p>
        <p>
          <i className="fa fa-comment"></i> {resourceCount(discussion.comments_count, "Comments")}
        </p>
      </div>
    </div>
