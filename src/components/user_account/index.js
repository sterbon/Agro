import React from 'react';
import {Statistic, Row, Col, Button, Progress, Divider} from 'antd';
import {toEOSString} from '../../utils';

const LABEL_STYLE = {marginBottom: "50px"};
const UserAccount = ({userAccount}) => {
    return <Row>

        <Col span={8} style={LABEL_STYLE}>
            <Statistic title="Account name" value={userAccount.name}/>
        </Col>
        <Col span={8} style={LABEL_STYLE}>
            <Statistic title="Public Key" value={userAccount.publicKey} suffix={userAccount.keyType}/>
        </Col>
    </Row>
};

export default UserAccount;