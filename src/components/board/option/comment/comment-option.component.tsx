import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AppState,
  boardActions,
  boardReducerActions,
  OptionData,
  UserState,
} from 'store';
import { BlueTxt, OptionBox, RedTxt } from '../boardOption.component';

interface CommentOptionProps {
  optionData: OptionData;
}

const CommentOptionComponent: React.FC<CommentOptionProps> = ({
  optionData,
}) => {
  const dispatch: Dispatch<boardReducerActions> = useDispatch();

  const { accessToken } = useSelector<AppState, UserState>(state => state.user);

  const {
    optionToggle,
    deleteBoardComment,
    activeReport,
    editCommentToggle,
  } = boardActions;

  const { type, board_pk, comment_pk, write } = optionData;

  const deleteComment = () => {
    dispatch(
      optionToggle({
        type: 'none',
        board_pk: 0,
        content: '',
        write: false,
      }),
    );

    if (window.confirm('정말로 삭제하시겠습니까?') && comment_pk) {
      dispatch(deleteBoardComment({ accessToken, board_pk, comment_pk }));
    }
  };

  const close = () =>
    dispatch(
      optionToggle({
        type: 'none',
        board_pk: 0,
        content: '',
        write: false,
      }),
    );

  return (
    <OptionBox>
      {write && (
        <>
          <button
            onClick={() => {
              dispatch(editCommentToggle(true));
              dispatch(
                optionToggle({
                  type: 'none',
                  board_pk: 0,
                  content: '',
                  write: false,
                  comment_pk,
                }),
              );
            }}
          >
            <BlueTxt>댓글 수정</BlueTxt>
          </button>
          <button onClick={deleteComment}>
            <RedTxt>댓글 삭제</RedTxt>
          </button>
        </>
      )}
      <button
        onClick={() => {
          dispatch(activeReport(true));
        }}
      >
        <RedTxt>신고하기</RedTxt>
      </button>
      <button onClick={close}>
        <BlueTxt>취소</BlueTxt>
      </button>
    </OptionBox>
  );
};

export default CommentOptionComponent;
