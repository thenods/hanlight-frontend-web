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

interface FeedOptionProps {
  optionData: OptionData;
}

const FeedOptionComponent: React.FC<FeedOptionProps> = ({ optionData }) => {
  const dispatch: Dispatch<boardReducerActions> = useDispatch();

  const { accessToken } = useSelector<AppState, UserState>(state => state.user);

  const { board_pk, write } = optionData;

  const { optionToggle, activeReport, editBoardToggle, deleteBoard } = boardActions;

  const deleteFeed = () => {
    dispatch(
      optionToggle({
        type: 'none',
        board_pk: 0,
        content: '',
        write: false,
      }),
    );

    if (window.confirm('정말로 삭제하시겠습니까?')) {
      dispatch(deleteBoard({ accessToken, board_pk }));
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
          <button onClick={() => dispatch(editBoardToggle(true))}>
            <BlueTxt>게시글 수정</BlueTxt>
          </button>
          <button onClick={deleteFeed}>
            <RedTxt>게시글 삭제</RedTxt>
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

export default FeedOptionComponent;
