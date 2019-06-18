import * as React from 'react';

import BoardFormComponent from 'components/board/form';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  AppState,
  boardActions,
  boardReducerActions,
  PostBoardParams,
} from 'store';

export interface BoardFormProps {
  accessToken: string;
  postBoardStatus: 'none' | 'pending' | 'success' | 'failure';
}

export interface BoardFormMethod {
  postBoard: ({ accessToken, content, files }: PostBoardParams) => void;
}

const BoardFormContainer: React.FC<BoardFormProps & BoardFormMethod> = ({
  accessToken,
  postBoardStatus,
  postBoard,
}) => (
  <BoardFormComponent
    accessToken={accessToken}
    postBoardStatus={postBoardStatus}
    postBoard={postBoard}
  />
);

const mapStateToProps = ({ user, board }: AppState) => ({
  accessToken: user.accessToken,
  postBoardStatus: board.postBoardStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<boardReducerActions>) => ({
  postBoard: bindActionCreators(boardActions.postBoard, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BoardFormContainer);
