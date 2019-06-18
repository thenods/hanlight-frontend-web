import * as React from 'react';
import styled from 'styled-components';

interface NoticeItemProps {
  title: string;
  date: string | number;
  read: boolean;
  onClick?: () => void;
}

const ItemBox = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3.4rem;
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
`;

const Flag = styled.div<{ read: boolean }>`
  display: inline-flex;
  width: 0.75rem;
  height: 100%;
  border-radius: 16px 0 0 16px;
  background-color: ${props => (props.read ? '#ff5677' : '#4470ff')};
`;

const TitleBox = styled.span`
  width: 75%;
  font-family: 'Spoqa Han Sans';
  font-size: 1rem;
`;

const Date = styled.span`
  display: flex;
  justify-content: flex-end;
  font-family: 'Spoqa Han Sans';
  font-size: 0.875rem;
  font-weight: 300;
  margin-right: 1rem;
  width: 8rem;
`;

const NoticeItem: React.FC<NoticeItemProps> = ({
  onClick,
  title,
  date,
  read,
}) => (
  <ItemBox onClick={onClick}>
    <Flag read={read} />
    <TitleBox>{title}</TitleBox>
    <Date>{date}</Date>
  </ItemBox>
);

export default NoticeItem;