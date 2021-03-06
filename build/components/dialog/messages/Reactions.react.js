'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _MessageActionCreators = require('../../../actions/MessageActionCreators');

var _MessageActionCreators2 = _interopRequireDefault(_MessageActionCreators);

var _rcTooltip = require('rc-tooltip');

var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

var _ActorClient = require('../../../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var MessageReactions = function (_Component) {
  _inherits(MessageReactions, _Component);

  function MessageReactions(props) {
    _classCallCheck(this, MessageReactions);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleAddLike = function () {
      _MessageActionCreators2.default.addLike(_this.props.peer, _this.props.message.rid);
      _this.setState({ isThisMyReaction: true });
    };

    _this.handleRemoveLike = function () {
      _MessageActionCreators2.default.removeLike(_this.props.peer, _this.props.message.rid);
      _this.setState({ isThisMyReaction: true });
    };

    _this.state = {
      canAnimateHeart: true
    };
    return _this;
  }

  MessageReactions.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
    if (this.state.isThisMyReaction) {
      this.setState({
        canAnimateHeart: false,
        isThisMyReaction: false
      });
    } else {
      this.setState({ canAnimateHeart: true });
    }
  };

  MessageReactions.prototype.render = function render() {
    var message = this.props.message;
    var canAnimateHeart = this.state.canAnimateHeart;

    var hasReactions = message.reactions.length > 0;

    var counter = void 0;
    var icon = _react2.default.createElement('i', { className: 'icon icon-favorite material-icons', onClick: this.handleAddLike });
    var reactionsClassName = 'message__actions__like';
    var likers = '(nobody)';

    if (hasReactions) {
      var amILikeThat = message.reactions[0].isOwnSet;

      reactionsClassName = (0, _classnames2.default)(reactionsClassName, {
        'message__actions__like--has-reactions': hasReactions,
        'message__actions__like--liked': amILikeThat,
        'message__actions__like--with-animations': canAnimateHeart
      });

      if (amILikeThat) {
        icon = _react2.default.createElement('i', { className: 'icon icon-favorite material-icons', onClick: this.handleRemoveLike });
      }

      if (message.reactions[0].uids.length > 0) {
        likers = message.reactions[0].uids.map(function (uid) {
          return _ActorClient2.default.getUser(uid);
        }).map(function (user) {
          return user.nick || user.name || user.id;
        }).join(", ");
        counter = _react2.default.createElement(
          'span',
          { className: 'counter', key: 1 },
          message.reactions[0].uids.length
        );
      } else {
        counter = null;
      }
    }

    return _react2.default.createElement(
      'div',
      { className: reactionsClassName },
      _react2.default.createElement(
        _rcTooltip2.default,
        {
          placement: 'left',
          mouseEnterDelay: 0,
          mouseLeaveDelay: 0,
          overlay: 'Liked by: ' + likers },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _reactAddonsCssTransitionGroup2.default,
            { transitionName: 'counter', transitionEnterTimeout: 125, transitionLeaveTimeout: 100 },
            counter
          ),
          icon
        )
      )
    );
  };

  return MessageReactions;
}(_react.Component);

MessageReactions.propTypes = {
  peer: _react.PropTypes.object.isRequired,
  message: _react.PropTypes.object.isRequired
};
exports.default = MessageReactions;
//# sourceMappingURL=Reactions.react.js.map