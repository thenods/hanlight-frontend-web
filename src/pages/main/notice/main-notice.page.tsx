import NoticeComponent from 'components/main/notice';
import * as React from 'react';
import styled from 'styled-components';

const NoticeTemplate = styled.div`
  width: 100%;
  /* height: 100%; */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 3rem;
`;

const Empty = styled.div`
  height: 5.125rem;
  width: 100%;
`;

const NoticePage: React.FC = () => {
  return (
    <React.Fragment>
      <Empty />
      <NoticeTemplate>
        <NoticeComponent />
      </NoticeTemplate>
    </React.Fragment>
  );
};

export default NoticePage;
