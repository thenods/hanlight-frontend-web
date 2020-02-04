import * as React from 'react';

import { useInput, usePrevious } from 'lib/hooks';
import { Device } from 'lib/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AppState,
  boardActions,
  BoardModel,
  boardReducerActions,
  ErrorModel,
  UserState,
} from 'store';
import styled from 'styled-components';

const { useEffect } = React;

const ModalWrapper = styled.div`
  width: 100%;
  width: 43.75rem;
  min-height: 13.375rem;

  margin-right: 1.25rem;

  position: absolute;
  top: 30%;
  z-index: 9;

  font-family: 'Spoqa Han Sans';

  background-color: #ffffff;

  border-radius: 4px;
  border: solid 1px #d1d1d1;

  display: flex;
  align-items: center;
  flex-direction: column;

  @media ${Device.mobileL} {
    width: 24rem;
  }

  @media ${Device.mobileM} {
    width: 21rem;
  }

  @media ${Device.mobileS} {
    width: 18rem;
  }
`;

const Head = styled.div`
  width: 100%;
  min-height: 2.3rem;
  font-size: 0.875rem;
  font-family: inherit;
  background-color: #ffffff;
  border-bottom: solid 1px #e5e5e5;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${Device.mobileL} {
    font-size: 0.625rem;
  }
`;

const FeedXButton = styled.span`
  width: 19px;
  top: 17px;
  right: 11px;
  height: 10px;
  border-radius: 1.25rem;
  position: absolute;

  cursor: pointer;

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  &::before,
  &::after {
    height: 2px;
    width: 19px;
    position: absolute;
    content: ' ';
    border-radius: 1.25rem;
    background-color: #9b9b9b;
  }
`;

const Title = styled.span`
  margin-left: 1.5rem;

  @media ${Device} {
    margin-left: 0.75rem;
  }
`;

const Form = styled.form`
  width: 90%;
  height: 11rem;
  font-size: 0.875rem;
  font-family: inherit;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  @media ${Device.mobileL} {
    width: calc(100% - 1.5rem);

    font-size: 11px;
  }

  textarea {
    min-height: 73.07%;
    font-size: 0.875rem;
    font-family: inherit;
    width: 100%;
    outline: none;
    resize: none;
    border: none;
    padding: 0;
    border-bottom: solid 1px #e5e5e5;

    @media ${Device.mobileL} {
      min-height: 77.5%;

      font-size: 11px;
    }
  }

  button {
    width: 6.875rem;
    height: 2rem;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #4470ff;
    border-radius: 1rem;
    color: #e9ebee;
    font-size: 0.875rem;
    font-weight: bold;
    margin-bottom: 0.57rem;
    cursor: pointer;

    border: none;

    @media ${Device.mobileL} {
      width: 4.5rem;
      height: 1.25rem;
      font-size: 0.625rem;
    }
  }
`;

const BoardReportComponent: React.FC = () => {
  const dispatch: Dispatch<boardReducerActions> = useDispatch();

  const { accessToken } = useSelector<AppState, UserState>(state => state.user);
  const { optionData } = useSelector<AppState, BoardModel>(
    state => state.board,
  );
  const { reportStatus } = useSelector<AppState, BoardModel>(
    state => state.board,
  );
  const { message: errorMesage } = useSelector<AppState, ErrorModel>(
    state => state.error,
  );

  const [content, setContent] = useInput('');
  const prevState = usePrevious(reportStatus);

  const { type, board_pk, comment_pk } = optionData;

  useEffect(() => {
    if (prevState === 'pending') {
      if (reportStatus === 'success') {
        alert('신고되었습니다.');
        close();
      } else if (reportStatus === 'failure') {
        alert(errorMesage);
      }
    }
  }, [prevState, reportStatus]);

  const close = () => {
    dispatch(boardActions.activeReport(false));
    dispatch(
      boardActions.optionToggle({
        type: 'none',
        board_pk: 0,
        content: '',
        write: false,
      }),
    );
  };

  const submitReport = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (reportStatus !== 'pending' && content) {
      if (type === 'board') {
        dispatch(
          boardActions.report({
            accessToken,
            type,
            board_pk,
            content,
          }),
        );
      } else if (type === 'comment') {
        dispatch(
          boardActions.report({
            accessToken,
            type,
            board_pk,
            comment_pk,
            content,
          }),
        );
      }
    }
  };

  return (
    <ModalWrapper>
      <Head>
        <Title>작성자 신고하기</Title>
        <FeedXButton onClick={close} />
      </Head>
      <Form onSubmit={submitReport}>
        <textarea
          minLength={1}
          maxLength={300}
          autoFocus={true}
          placeholder="신고사유를 작성해주세요. (최대 300자)  ex)풍기문란, 욕설, 성희롱"
          onChange={setContent}
        />
        <button>신고하기</button>
      </Form>
    </ModalWrapper>
  );
};

export default BoardReportComponent;
