import React from 'react';
import {Statistic, Row, Col, Button, Progress, Divider} from 'antd';
import {toEOSString} from '../../utils';

const LABEL_STYLE = {marginBottom: "50px"};
const UserWallet = ({wallet}) => {
    const
        resources = wallet.resource,
        ramUsage = parseInt(100 * resources.ram.available / resources.ram.total),
        netUsage = parseInt(100 * resources.net.available / resources.net.total),
        cpuUsage = parseInt(100 * resources.cpu.available / resources.cpu.total);

    return <>
        <Row>
            <Col span={8} style={LABEL_STYLE}>
                <Statistic title="Total worth" value={wallet.balance.totalWorth} suffix="EOS"/>
            </Col>
            <Col span={8} style={LABEL_STYLE}>
                <Statistic title="Liquid tokens" value={wallet.balance.liquidToken} suffix="EOS"/>
            </Col>
            <Col span={8} style={LABEL_STYLE}>
                <Statistic title="Net staked" value={wallet.balance.netStaked} suffix="EOS"/>
            </Col>
            <Col span={8} style={LABEL_STYLE}>
                <Statistic title="CPU staked" value={wallet.balance.cpuStaked} suffix="EOS"/>
            </Col>
        </Row>

        {/*<Row>*/}
            {/*<Progress percent={cpuUsage} format={value => `CPU ${value}%`}/>*/}
        {/*</Row>*/}

        {/*<Row>*/}
            {/*<Col span={8} style={LABEL_STYLE}>*/}
                {/*<Progress type="circle" percent={ramUsage} format={value => `RAM ${value}%`}/>*/}
            {/*</Col>*/}
            {/*<Col span={8} style={LABEL_STYLE}>*/}
                {/*<Progress type="circle" percent={cpuUsage} format={value => `CPU ${value}%`}/>*/}
            {/*</Col>*/}
            {/*<Col span={8} style={LABEL_STYLE}>*/}
                {/*<Progress type="circle" percent={netUsage} format={value => `NET ${value}%`}/>*/}
            {/*</Col>*/}
        {/*</Row>*/}
    </>
};

export default UserWallet;