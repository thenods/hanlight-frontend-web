import * as React from 'react';

import { AutoLoginMethod, AutoLoginProps } from 'container/auto/autoLogin';
import { RouteComponentProps } from 'react-router-dom';

class AutoLoginComponent extends React.Component<
  AutoLoginProps & AutoLoginMethod & RouteComponentProps
> {
  public componentDidMount() {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      this.props.getUser(accessToken);
    } else if (
      this.props.location.pathname !== '/error' &&
      !this.props.location.pathname.includes('/service')
    ) {
      this.props.history.push('/user/login');
    }
  }

  public componentDidUpdate(
    prevProps: AutoLoginProps & AutoLoginMethod & RouteComponentProps,
  ) {
    if (
      prevProps.getUserStatus === 'pending' &&
      this.props.getUserStatus === 'success' &&
      this.props.location.pathname.includes('/user')
    ) {
      this.props.history.push('/');
    }
  }

  public render() {
    return <></>;
  }
}

export default AutoLoginComponent;
