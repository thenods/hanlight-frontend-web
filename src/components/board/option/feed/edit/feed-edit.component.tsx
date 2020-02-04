import * as React from 'react';

import { useInput, usePrevious } from 'lib/hooks';
import { Device } from 'lib/styles';
import DefaultProfileImage from 'lib/svg/default-profile-image.svg';
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
import styled, { css } from 'styled-components';

const { useState, useEffect, useRef, useMemo } = React;

const EditWrapper = styled.div`
  width: 43.75rem;
  position: absolute;
  background-color: #ffffff;
  z-index: 3;
  font-family: 'Spoqa Han Sans';

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

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

const EditTitleWrapper = styled.div`
  width: 100%;
  height: 2.3rem;
  border-bottom: 1px solid #d1d1d1;

  display: flex;
  align-items: center;

  @media ${Device.mobileL} {
    height: 1.5rem;
  }
`;

const EditTitle = styled.span`
  font-size: 0.875rem;
  margin-left: 0.75rem;

  @media ${Device.mobileL} {
    font-size: 0.625rem;
  }
`;

const EditContentWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 2.25rem;

  @media ${Device.mobileL} {
    margin-top: 1.25rem;
    font-size: 11px;
  }
`;

const EditContentText = styled.textarea<{ height: number }>`
  width: 80%;
  height: ${props => props.height}px;
  min-height: 5rem;
  font-size: 0.875rem;
  font-family: inherit;
  line-height: 1.43;
  resize: none;
  box-sizing: border-box;
  color: #1d2129;
  border: 0;
  outline: none;

  @media ${Device.mobileL} {
    font-size: 11px;
  }
`;

const EditImgWrapper = styled.div`
  width: 5.75rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${Device.mobileL} {
    width: 3.75rem;
  }
`;

const EditFooter = styled.div`
  width: 95%;
  height: 4.5rem;
  border-top: solid 1px #e5e5e5;
  margin-top: 2.25rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media ${Device.mobileL} {
    margin-top: 1.25rem;
    height: 2.5rem;
  }
`;

const EditButton = styled.button`
  width: 6.875rem;
  height: 2rem;
  font-size: 0.875rem;
  font-weight: bold;
  color: #e9ebee;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #4470ff;
  border: 0;
  border-radius: 1rem;

  @media ${Device.mobileL} {
    width: 4.5rem;
    height: 1.25rem;
    font-size: 0.625rem;
  }
`;

const FeedXButton = styled.span`
  width: 19px;
  height: 10px;
  top: 17px;
  right: 11px;
  border-radius: 1.25rem;
  position: absolute;

  cursor: pointer;

  @media ${Device.mobileL} {
    top: 12px;
    right: 4px;
  }

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

const ProfileImg = styled.img<{ image: boolean; isAnonymous: boolean }>`
  width: 2.69rem;
  height: ${({ isAnonymous, image }) =>
    isAnonymous || !image ? '3.2rem' : '2.69rem'};

  ${({ image }) =>
    image &&
    css`
      margin-bottom: 0.56rem;
      border-radius: 100%;

      @media ${Device.tabletL} {
        height: 3.5rem;
        margin-bottom: 0.75rem;
      }

      @media ${Device.mobileL} {
        height: 2rem;
        margin-bottom: 0.43rem;
      }
    `};
`;

const FeedEditComponent: React.FC = () => {
  const dispatch: Dispatch<boardReducerActions> = useDispatch();

  const { optionData, patchBoardStatus, board } = useSelector<
    AppState,
    BoardModel
  >(state => state.board);
  const { message: errorMesage } = useSelector<AppState, ErrorModel>(
    state => state.error,
  );
  const { accessToken, image } = useSelector<AppState, UserState>(
    state => state.user,
  );

  const { board_pk, content } = optionData;

  const [editContent, setEditContent] = useInput(content);
  const [editHeight, setEditHeight] = useState<number>(80);
  const editRef = useRef(null);
  const prevStatus = usePrevious(patchBoardStatus);

  const { optionToggle, patchBoard, editBoardToggle } = boardActions;

  const isAnonymous = useMemo(() => {
    const selectedBoard = board.find(item => item.pk === board_pk);
    if (selectedBoard) {
      console.log(selectedBoard);
      return selectedBoard.user_name ? false : true;
    }
  }, []);

  const close = () => {
    dispatch(
      optionToggle({
        type: 'none',
        board_pk: 0,
        content: '',
        write: false,
      }),
    );

    dispatch(editBoardToggle(false));
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 600) {
      setEditContent(e.target.value);
      if (e.currentTarget.scrollHeight > editHeight) {
        setEditHeight(e.currentTarget.scrollHeight);
      }
    }
  };

  const submitEdit = () => {
    if (content !== editContent) {
      dispatch(patchBoard({ accessToken, content: editContent, board_pk }));
    } else {
      close();
    }
  };

  useEffect(() => {
    if (prevStatus === 'pending') {
      if (patchBoardStatus === 'success') {
        close();
      }
    } else if (patchBoardStatus === 'failure') {
      alert(errorMesage);
    }
  }, [prevStatus, patchBoardStatus]);

  return (
    <EditWrapper>
      <FeedXButton color={'#9B9B9B'} onClick={close} />
      <EditTitleWrapper>
        <EditTitle>글 수정하기</EditTitle>
      </EditTitleWrapper>
      <EditContentWrapper>
        <EditImgWrapper>
          <ProfileImg
            image={!!image}
            isAnonymous={!!isAnonymous}
            src={image && !isAnonymous ? image : DefaultProfileImage}
            alt=""
          />
        </EditImgWrapper>
        <EditContentText
          height={editHeight}
          value={editContent}
          ref={editRef}
          onChange={handleChange}
        />
      </EditContentWrapper>
      <EditFooter>
        <EditButton onClick={submitEdit}>수정</EditButton>
      </EditFooter>
    </EditWrapper>
  );
};

export default FeedEditComponent;
